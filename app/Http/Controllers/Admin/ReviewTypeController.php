<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Service\UpdateServiceRequest;
use App\Models\ReviewType;
use App\Models\ReviewTypeValue;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ReviewTypeController extends Controller
{
    public function index(Request $request): Response|LengthAwarePaginator
    {
        if ($request->has('page')) {
            $paginatedList = $this->getIndexList(ReviewType::class, $request, 0, 0, 0, [
                'sortBy' => 'created_at',
                'sortDir' => 'desc',
            ]);
            $paginatedList->getCollection()->transform(fn ($rt) => $rt->localized());

            return $paginatedList;
        }

        return Inertia::render('Admin/ReviewType/ReviewTypes');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/ReviewType/EditReviewType');
    }

    /**
     * @throws \Exception
     */
    public function store(Request $request): RedirectResponse
    {
        $request['title'] = $request['name'];
        $reviewTypeData = $request->validate([
            'name' => ['required', 'string'],
            'name_ru' => ['required', 'string'],
            'name_he' => ['required', 'string'],
            'name_ar' => ['required', 'string'],
            'active' => ['required', 'bool'],
            'profile_type' => ['required', 'array'],
            'type' => ['required', 'string'],
            'values' => ['required', 'array'],
        ]);

        DB::beginTransaction();
        try {
            $reviewType = ReviewType::query()->create($reviewTypeData);

            foreach ($reviewTypeData['values'] as $reviewTypeValue) {
                $reviewTypeValue['review_type_id'] = $reviewType->id;
                ReviewTypeValue::query()->create($reviewTypeValue);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw new \Exception($e->getMessage());
        }

        return Redirect::route('admin.review-type.index')->with([
            'message' => trans('reviewtype.created'),
        ]);;
    }

    public function edit(ReviewType $reviewType): Response
    {
        $reviewType->load('values');

        return Inertia::render('Admin/ReviewType/EditReviewType', compact('reviewType'));
    }

    public function update(Request $request, ReviewType $reviewType): RedirectResponse
    {
        $reviewTypeData = $request->validate([
            'name' => ['required', 'string'],
            'name_ru' => ['required', 'string'],
            'name_he' => ['required', 'string'],
            'name_ar' => ['required', 'string'],
            'active' => ['required', 'bool'],
            'profile_type' => ['required', 'array'],
            'type' => ['required', 'string'],
            'values' => ['required', 'array'],
        ]);

        DB::beginTransaction();
        try {
            $reviewType->update($reviewTypeData);

            foreach ($reviewTypeData['values'] as $reviewTypeValue) {
                $reviewTypeValue['review_type_id'] = $reviewType->id;
                // check value id, if it exists - update existing one
                if ($reviewTypeValue['id']) {
                    ReviewTypeValue::query()->find($reviewTypeValue['id'])?->update($reviewTypeValue);
                } else {
                    ReviewTypeValue::query()->create($reviewTypeValue);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            throw new \Exception($e->getMessage());
        }
        $reviewType->load('values');

        return Redirect::route('admin.review-type.index')->with([
            'message' => trans('reviewtype.updated'),
        ]);;
    }

    public function destroy(ReviewType $reviewType): RedirectResponse
    {
        $reviewType->delete();

        return Redirect::route('admin.review-type.index')->with([
            'message' => trans('reviewtype.deleted'),
        ]);

    }
}
