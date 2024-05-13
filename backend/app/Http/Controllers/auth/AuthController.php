<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\User;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => "Invalid credentials"
            ], 401);
        }

        return response()->json([
            'token' => $token,
            'user' => auth()->user(),
            'message' => 'Successfully logged in'
        ]);
    }

    public function register(RegistrationRequest $request)
    {
        $user = User::create($request->validated());
        if (!$user) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => "Invalid credentials"
            ], 401);
        } else {
            return response()->json([
                'token' => auth()->login($user),
                'user' => $user,
                'message' => 'Successfully logged in'
            ]);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
