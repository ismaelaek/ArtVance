<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function update(Request $request, $id)
    {
        // TODO the request returns empty array

        // Validate request data
        // $validator = Validator::make($request->all(), [
        //     'username' => 'required',
        //     'nickname' => 'required',
        //     'email' => 'required|email',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['error' => $validator->errors()], 422);
        // }

        $user = User::findOrFail($id);

        $user->username = $request->input('username');
        $user->nickname = $request->input('nickname');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->birthday = $request->input('birthday');
        $user->gender = $request->input('gender');
        $user->address = $request->input('address');
        $user->bio = $request->input('bio');

        $user->save();

        return response()->json(['user' => $user, 'message' => 'Profile updated successfully'], 200);
    }

    public function user($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function getUnfollowedUsers($userId)
    {
        $user = User::findOrFail($userId);

        $unfollowedUsers = User::whereNotIn('id', $user->following()->pluck('followed_id'))
            ->where('id', '<>', $userId)
            ->get();

        return response()->json(['unfollowed_users' => $unfollowedUsers]);
    }

    // public function getUserPosts($userId)
    // {
    //     $user = User::findOrFail($userId);

    //     $posts = $user->posts()->orderBy('created_at', 'desc')->get();

    //     return response()->json($posts);
    // }

    public function getUserPosts($userId)
    {
        $user = User::findOrFail($userId);

        $posts = $user->posts()->orderBy('created_at', 'desc')->get();

        // Get the IDs of posts saved by the user
        $savedPostIds = $user->saves()->pluck('post_id')->toArray();

        // Add isSaved field to each post
        $posts = $posts->map(function ($post) use ($savedPostIds) {
            $post->isSaved = in_array($post->id, $savedPostIds);
            return $post;
        });

        return response()->json($posts);
    }

    public function getFollowersAndFollowing($userId)
    {
        $user = User::findOrFail($userId);

        $followers = $user->followers()->get();
        $following = $user->following()->get();

        return response()->json([
            'followers' => $followers,
            'following' => $following,
        ]);
    }

    public function getFeedPosts($userId)
    {
        $user = User::findOrFail($userId);
        $feedPosts = $user->getFeedPosts();
        $userPosts = $user->posts()->get();
        $feedPosts = $feedPosts->merge($userPosts);
        $feedPosts = $feedPosts->sortByDesc('created_at');

        return response()->json($feedPosts->values()->toArray());
    }



    public function likePost(Request $request, $postId)
    {
        $user = User::findOrFail($request->user_id);
        $postOwner = Post::findOrFail($postId)->user;

        if (!$user->likes()->where('post_id', $postId)->exists()) {
            $like = new Like();
            $like->user_id = $request->user_id;
            $like->post_id = $postId;
            $like->save();

            $notification = $postOwner->getNotified()->create([
                'content' => 'liked your post',
                'user_id' => $request->user_id,
                'post_id' => $postId,
                'notified_id' => $postOwner->id,
                'is_read' => false,
            ]);
            
            return response()->json(['message' => 'Post liked successfully.']);
        }

        return response()->json(['message' => 'You have already liked this post.'], 400);
    }

    public function unlikePost(Request $request, $postId)
    {
        $user = User::findOrFail($request->user_id);
        $post = Post::findOrFail($postId);

        $like = $user->likes()->where('post_id', $postId)->first();

        if ($like) {
            $like->delete();
            return response()->json(['message' => 'Post unliked successfully.']);
        }

        return response()->json(['message' => 'You have not liked this post.'], 400);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        foreach ($user->posts as $post) {
            $post->media()->delete();
            $post->delete();
        }

        $user->comments()->delete();

        $user->likes()->delete();

        $user->notify()->delete();
        $user->getNotified()->delete();

        $user->followers()->detach();
        $user->following()->detach();

        $user->userSaves()->delete();

        $user->reports()->delete();

        $user->sentConversations()->delete();
        $user->receivedConversations()->delete();

        $user->delete();

        return response()->json(['message' => 'User and all related data successfully deleted']);
    }



    public function updateProfilePic(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->hasFile('photo')) {
            if ($user->photo) {
                Storage::delete($user->photo);
            }

            $file = $request->file('photo');
            $path = $file->store('profile', 'public');
            $url = url('storage/' . $path);
            $user->photo = $url;
            $user->save();
        }

        return response()->json(['user' =>  $user, 'message' => 'Profile picture updated successfully']);
    }

    public function updateCoverPic(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if ($request->hasFile('photo')) {
            if ($user->cover) {
                Storage::delete($user->cover);
            }

            $file = $request->file('photo');
            $path = $file->store('cover', 'public');
            $url = url('storage/' . $path);
            $user->cover = $url;
            $user->save();
        }

        return response()->json(['user' =>  $user, 'message' => 'Cover picture updated successfully']);
    }

    public function getAllPostsData($userId)
    {
        $user = User::findOrFail($userId);

        // Assuming getFeedPosts() returns the posts for the user's feed
        $feedPosts = $user->getFeedPosts();
        $userPosts = $user->posts()->get();
        $feedPosts = $feedPosts->merge($userPosts)->sortByDesc('created_at');

        // Eager load related data
        $feedPosts->load(['user', 'likes']);

        $loggedInUserId = auth()->id();
        $savedPostIds = $user->saves()->pluck('post_id')->toArray();

        // Prepare posts data
        $posts = $feedPosts->map(function ($post) use ($savedPostIds, $loggedInUserId) {
            return [
                'id' => $post->id,
                'caption' => $post->caption,
                'user_id' => $post->user_id,
                'user' => $post->user,
                'isForSale' => $post->isForSale,
                'isSaved' => in_array($post->id, $savedPostIds),
                'likeCount' => $post->likes->count(),
                'userHasLiked' => $post->likes->contains('user_id', $loggedInUserId),
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];
        });

        return response()->json(['posts' => $posts]);
    }

    public function getTopUsers()
    {
        
        $users = User::withCount('posts')->with('posts')->orderByDesc('posts_count')->take(5)->get();
        if ($users->isEmpty()) {
            return response()->json(['message' => 'No users found.'], 404);
        }

        return response()->json($users);
    }

}
