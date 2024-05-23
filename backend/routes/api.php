<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::get('/{id}/feed', [UserController::class, 'getFeedPosts']);


Route::prefix('/users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'user']);
    Route::get('/unfollowed/{id}', [UserController::class, 'getUnfollowedUsers']);
    Route::get('/{id}/follow-stats', [UserController::class, 'getFollowersAndFollowing']);
    Route::get('/{id}/posts', [UserController::class, 'getUserPosts']);
    Route::patch('/{id}/updateProfile', [UserController::class, 'update']);
});

Route::post('/follow/{follower_id}/{followed_id}', [FollowController::class, 'follow']);
Route::post('/unfollow/{follower_id}/{followed_id}', [FollowController::class, 'unfollow']);