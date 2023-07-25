<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Symfony\Component\HttpFoundation\Response;

class Candidate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            if (auth()->user()->tokenCan('server:user')) {
                return $next($request);
            } else {
                return response()->json([
                    'message' => "Access dined your are not An user !"
                ], 403);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => "login first please!"
            ]);
        }
    }
}
