<?php

namespace App\Packages\CompanyPolicy\Application;

use App\Models\CompanyPolicy\Category;
use App\Models\CompanyPolicy\Post;
use App\Models\User;
use App\Packages\Common\Application\Interfaces\IAuthorisationService;
use App\Packages\Common\Application\Interfaces\IUserService;
use Illuminate\Support\Facades\DB;

class CPService
{
    public function __construct(protected IAuthorisationService $authService,
        protected IUserService $userService
    ) {
    }

    public function getUserCategoriesList(int $user_id, string $name = null): array
    {
        $list = Category::where('active', 1)
            ->when($name, function ($q) use ($name) {
                $q->where('name', 'like', '%'.$name.'%');
            })
            ->get();
        $list = $list->filter(fn ($item) => ($this->authService->authorizedFor($user_id, "CAT{$item->id}", 'read')));

        return $list->values()->toArray();
    }

    public function getUserArticlesList(int $user_id, string $name = null): array
    {
        $list = Post::query()
            ->where('active', 1)
            ->with('categories:id,name')
            ->when($name, function ($q) use ($name) {
                $q->where('name', 'like', '%'.$name.'%');
            })
            ->get(['id', 'name', 'sort', 'updated_at'])
            ->map(function ($post) use ($user_id) {
                $post->parent_id = $post->categories()->pluck('op_post_category.category_id as id');
                $post->acquainted = self::isPostAcquaintedByUser($post->id, $user_id);

                return $post;
            });
        $list = $list->filter(fn ($item) => ($this->authService->authorizedFor($user_id, "ARTICLE{$item->id}", 'read')));

        return $list->values()->toArray();
    }

    public function getPost(int $id): Post
    {
        $post = Post::findOrFail($id);
        $post->filesData = $post->filesData();
        $post->acquainted = $this->isPostAcquainted($id);

        return $post;
    }

    public function isPostAcquainted(int $post_id): bool
    {
        $user_id = $this->userService->currentUser()->id;

        return DB::table('op_confirms')
            ->select('id')
            ->where('post_id', $post_id)
            ->where('user_id', $user_id)
            ->exists();
    }

    public function isPostAcquaintedByUser(int $post_id, int $user_id): bool
    {
        return DB::table('op_confirms')
            ->select('id')
            ->where('post_id', $post_id)
            ->where('user_id', $user_id)
            ->exists();
    }

    public function setReadStatus(int $id, bool $status): void
    {
        $user_id = $this->userService->currentUser()->id;
        if ($status) {
            DB::table('op_confirms')
                ->insertOrIgnore([
                    'user_id' => $user_id,
                    'post_id' => $id,
                ]);
        } else {
            // TODO: user notifications
            DB::table('op_confirms')
                ->where('post_id', $id)
                ->where('user_id', $user_id)
                ->delete();
        }
    }

    public function checkAnswers(int $id, array $answers): int
    {
        $article = $this->getPost($id);
        if (! $article->questions_needed) {
            return -1;
        }  // no questions to check

        $errCount = 0;

        $answers = collect($answers);
        $questions = $article->questions;
        foreach ($questions as $q) {
            $qid = $q['id'];
            $userAnswersForQuestion = $answers[$qid] ?? [];
            foreach ($q['answers'] as $a) {
                if (($a['right'] ?? false) !== ($userAnswersForQuestion[$a['id']] ?? false)) {
                    $errCount += 1;
                    break;
                }
            }
        }

        return $errCount;
    }

    public function generateReport(array $params): array
    {
        $users = $params['users'];
        $cats = $params['categories'];
        $departmets = $params['departments'];
        $teams = $params['teams'];

        // TODO: filter users by permissions (U, D, T)

        if ($users->isEmpty()) {
            $users = User::where(['status' => 'active']);
        } else {
            $users = User::whereIn('id', $users);
        }

        $users = $users->get(['id', 'name', 'last_name'])
            ->makeHidden(['admin', 'type']);

        $res = collect();
        foreach ($users as $user) {
            $posts = collect($this->getUserArticlesList($user->id));
            // filter by categories
            if ($cats->isNotEmpty()) {
                $posts = $posts->filter(function ($e) use ($cats) {
                    $postCatsIds = collect($e['categories'])->pluck('id');
                    $res = $cats->intersect($postCatsIds);

                    return $res->count() > 0;
                });
            }
            $user['posts'] = $posts->toArray();
            $res->add($user);
        }

        return $res->sortBy('name')->values()->toArray();
    }

    public function getFullHierarchyCategoriesList()
    {
        $data = Category::get(['id', 'name', 'sort', 'active', 'parent_id'])->toArray();

        return $data;
        // $data = $this->buildTree($data, null);
        // return array_values($data);
    }

    // function buildTree(array &$elements, $parentId = 0, $depth = 0) {
    //     $branch = array();
    //     foreach ($elements as $element) {
    //         $element['depth'] = $depth;
    //         if ($element['parent_id'] == $parentId) {
    //             $children = $this->buildTree($elements, $element['id'], $depth + 1);
    //             if ($children) {
    //                 $element['subRows'] = $children;
    //             }
    //             $branch[] = $element;
    //         }
    //     }
    //     return $branch;
    // }
}
