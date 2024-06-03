<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\auth\PasswordController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
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
Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::post('/change-password', [PasswordController::class, 'changeUserPassword'])->middleware('auth:api');

Route::get('/{id}/feed', [UserController::class, 'getFeedPosts']);


Route::prefix('/users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'user']);
    Route::get('/unfollowed/{id}', [UserController::class, 'getUnfollowedUsers']);
    Route::get('/{id}/follow-stats', [UserController::class, 'getFollowersAndFollowing']);
    Route::get('/{id}/posts', [UserController::class, 'getUserPosts']);
    Route::put('/{id}/updateProfile', [UserController::class, 'update']);
    Route::post('/{id}/update-profile-pic', [UserController::class, 'updateProfilePic']);
    Route::post('/{id}/update-cover-pic', [UserController::class, 'updateCoverPic']);
});

Route::post('/follow/{follower_id}/{followed_id}', [FollowController::class, 'follow']);
Route::post('/unfollow/{follower_id}/{followed_id}', [FollowController::class, 'unfollow']);


Route::prefix('/posts')->group(function () {
    Route::get('/', [PostController::class, 'index']);
    Route::post('/new', [PostController::class, 'store']);
    Route::get('/{id}/media', [PostController::class, 'getPostMedia']);
    Route::post('/{postId}/like', [UserController::class, 'likePost']);
    Route::delete('/{postId}/unlike', [UserController::class, 'unlikePost']);
    Route::get('/{postId}/likes-count', [PostController::class, 'getLikesCount']);
    Route::get('/{postId}/has-liked/{userId}', [PostController::class, 'hasUserLikedPost']);
    Route::delete('/{id}', [PostController::class, 'destroy']);
    Route::get('/{postId}/comments', [CommentController::class, 'getCommentsByPost']);
    Route::post('/new-comment', [CommentController::class, 'store']);
});

Route::prefix('/save')->group(function () {
    Route::post('/save-post', [SaveController::class, 'savePost']);
    Route::delete('/unsave-post/{id}', [SaveController::class, 'unsavePost']);
    Route::get('/saved-posts/{id}', [SaveController::class, 'getSavedPosts']);
});

Route::prefix('/products')->group(function () {
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/all', [ProductController::class, 'index']);
});


Route::prefix('/messages')->group(function () {
    Route::post('/send-message', [MessageController::class, 'sendMessage']);
    Route::post('/start-messaging', [MessageController::class, 'startMessaging']);
});

Route::prefix('/conversations')->group(function () {
    Route::get('/user/{userId}', [ConversationController::class, 'index']);
    Route::get('/{id}', [ConversationController::class, 'show']);
    Route::get('/{id}/messages', [ConversationController::class, 'getConversationMessages']);
    Route::post('/start-conversation', [ConversationController::class, 'startConversation']);
    Route::delete('/{id}', [ConversationController::class, 'deleteConversation']);
    Route::delete('/delete-empty-conv', [ConversationController::class, 'deleteConversationsWithNoMessages']);
});


Route::prefix('report')->group(function () {
    Route::post('/user', [ReportController::class, 'reportUser']);
    Route::post('/post', [ReportController::class, 'reportPost']);
    Route::get('/top-users', [ReportController::class, 'topReportedUsers']);
    Route::get('/top-posts', [ReportController::class, 'topReportedPosts']);
});

Route::prefix('/notifications')->group(function () {
    Route::get('/{id}', [NotificationController::class, 'usersNotifications']);
});