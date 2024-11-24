<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PassportFilesMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if(!$user)
            return \response([], 404);
        // permit all admins
        if($user->hasRole('admin'))
            return $next($request);

        // companies don't have passport files yet
        if($user->isCompany())
            return \response("companies don't have passport files yet", 404);

        $passport = $user->profile?->passport_data;
        if(!$passport)
            return \response([], 404);

        $url = '/' . $request->path();
        // permit only to own passport_data
        if($passport['image'] === $url || $passport['video'] === $url)
            return $next($request);

        return \response([], 404);
    }
}
