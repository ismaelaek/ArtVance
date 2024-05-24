<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
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
        return response()->json($request);
        
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

        if ($request->hasFile('photo')) {
            if ($user->photo) {
                unlink(storage_path('app/public/media' . $user->photo));
            }

            // Store the new photo
            $photoPath = $request->file('photo')->store('public/media');
            $user->photo = basename($photoPath);
        }

        $user->username = $request->input('username');
        $user->nickname = $request->input('nickname');
        $user->email = $request->input('email');
        $user->phone = $request->input('phone');
        $user->birthday = $request->input('birthday');
        $user->gender = $request->input('gender');
        $user->address = $request->input('address');
        $user->bio = $request->input('bio');

        $user->save();

        return response()->json(['message' => 'User updated successfully'], 200);
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
        $feedPosts = $user->getFeedPosts()->orderBy('created_at', 'desc')->get();
        return response()->json($feedPosts);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
