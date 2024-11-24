<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (is_null($request->user()) || $request->user()->roles()->where('name', 'admin')->count() === 0) {
            return back();
        }

        return $next($request);
    }
}
