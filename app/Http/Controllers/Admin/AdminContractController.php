<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;

class AdminContractController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response|LengthAwarePaginator
    {
        if ($request->has('page')) {
            $paginatedList = $this->getIndexList(Contract::class, $request, 0, 0, 0, [
                'sortBy' => 'created_at',
                'sortDir' => 'desc',
            ]);

            return $paginatedList;
        }

        return Inertia::render('Admin/Job/Jobs');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Job $job)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        //
    }
}
