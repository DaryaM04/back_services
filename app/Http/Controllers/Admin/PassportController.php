<?php

namespace App\Http\Controllers\Admin;

use App\Enums\VerificationType;
use App\Http\Controllers\Admin\AdminUserController as Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PassportController extends Controller
{
    public function index(Request $request): Response|LengthAwarePaginator
    {
        if ($request->has('page')) {
            $filters = $request->filters ?? [];
            $filters['is_verified'] = VerificationType::New->value;
            $request['filters'] = $filters;
            $paginatedList = $this->getIndexList(User::class, $request, 0, 0, ['roles', 'profile'], [
                'sortBy' => 'created_at',
                'sortDir' => 'desc',
            ]);
            return $paginatedList;
        }

        return Inertia::render('Admin/Passport/index', [
            ...Role::name_domain(),
            ...User::profile_type_domain(),
            ...User::status_domain()
        ]);
    }

    public function show(int $id): Response
    {
        $user = User::findOrFail($id);
        $user->load('profile');
        if ($user->isUser())
            return Inertia::render('Admin/Passport/Edit/EditPersonPassport', compact("user"));

        if ($user->isCompany())
            return Inertia::render('Admin/Passport/Edit/EditCompanyPassport', compact("user"));
    }

    public function approve(int $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $p = $user->profile()->update(['is_verified' => VerificationType::Verified->value]);

        return Redirect::back()->with([
            'message' => trans('user.verified'),
        ]);

    }

    public function decline(int $id): RedirectResponse
    {
        $user = User::findOrFail($id);
        $p = $user->profile()->update(['is_verified' => VerificationType::Declined->value]);

        return Redirect::back()->with([
            'message' => __('messages.The user has been verified unsuccessfully'),
        ]);

    }

//    public function editUser(): Response
//    {
//        return Inertia::render('Admin/Passport/Edit/EditPersonPassport');
//    }
//
//    public function editCompany() : Response
//    {
//        return Inertia::render('Admin/Passport/Edit/EditCompanyPassport');
//    }

//    public function update(Request $request): RedirectResponse
//    {
//        return Redirect::route('admin.passport.index');
//    }
//
//    public function destroy(): RedirectResponse
//    {
//        return Redirect::route('admin.passport.index');
//    }
//
//    public function approveUser(): Response
//    {
//        return Inertia::render('Admin/Passport/Approve/ApprovePersonPassport');
//    }
//    public function approveCompany(): Response
//    {
//        return Inertia::render('Admin/Passport/Approve/ApproveCompanyPassport');
//    }
}
