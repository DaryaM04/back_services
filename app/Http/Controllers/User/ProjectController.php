<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'project_name' => ['required', 'string'],
            'description' => ['string', 'max:250'],
            'project_type' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'payment_type' => ['required'],
            'photo' => ['image', 'max:10240', 'mimes:png,jpg,gif'],
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('img/project', 'public');
            $validatedData['photo'] = asset('storage/' . $path);
        }
        $validatedData['user_id'] = Auth::id();

        Project::query()->create($validatedData);

        return Redirect::route('user.dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $validatedData = $request->validate([
            'project_name' => ['required', 'string'],
            'description' => ['string', 'max:250'],
            'project_type' => ['required'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'payment_type' => ['required'],
            'photo' => ['image', 'max:10240', 'mimes:png,jpg,gif'],
        ]);

        if (Storage::disk('public')->exists($project->photo)) {
            Storage::disk('public')->delete($project->photo);
        }

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('img/project', 'public');
            $validatedData['photo'] = asset('storage/' . $path);
        }

        $project->update($validatedData);

        return Redirect::route('user.dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $project = Project::query()->find($id);

        if (Storage::disk('public')->exists($project->photo)) {
            Storage::disk('public')->delete($project->photo);
        }

        $project->delete();

        return Redirect::route('user.dashboard');
    }
}
