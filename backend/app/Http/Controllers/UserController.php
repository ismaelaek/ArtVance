<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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

    public function getUserPosts($userId)
    {
        $user = User::findOrFail($userId);

        $posts = $user->posts;

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
    public function update(Request $request, string $id)
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
