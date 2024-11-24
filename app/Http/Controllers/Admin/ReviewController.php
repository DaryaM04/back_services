<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(Request $request): Response | LengthAwarePaginator
    {
        if ($request->has('page')) {
            $paginatedList = $this->getIndexList(Review::class, $request,0,0,0, [
                'sortBy' => 'created_at',
                'sortDir' => 'desc'
            ]);
            return $paginatedList;
        }

        return Inertia::render('Admin/Review/Reviews');
    }

    public function store(Request $request): RedirectResponse
    {
        return Redirect::route('admin.review.index');
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Review/EditReview');
    }

    public function edit(): Response
    {
        return Inertia::render('Admin/Review/EditReview');
    }

    public function update(Request $request): RedirectResponse
    {
        return Redirect::route('admin.review.index');
    }

    public function destroy(): RedirectResponse
    {
        return Redirect::route('admin.review.index');
    }
}
