<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Follow;

class FollowController extends Controller
{
    public function follow($follower_id, $followed_id)
    {
        $follower = User::find($follower_id);
        $followed = User::find($followed_id);

        if (!$follower || !$followed) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if ($follower_id == $followed_id) {
            return response()->json(['message' => 'You cannot follow yourself'], 400);
        }

        if ($follower->following()->where('followed_id', $followed_id)->exists()) {
            return response()->json(['message' => 'You are already following this user'], 400);
        }

        $follower->following()->attach($followed_id);

        return response()->json(['message' => 'Followed successfully'], 200);
    }

    public function unfollow($follower_id, $followed_id)
    {
        $follower = User::find($follower_id);
        $followed = User::find($followed_id);

        if (!$follower || !$followed) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the follow relationship exists
        if (!$follower->following()->where('followed_id', $followed_id)->exists()) {
            return response()->json(['message' => 'You are not following this user'], 400);
        }

        // Detach the follow relationship
        $follower->following()->detach($followed_id);

        return response()->json(['message' => 'Unfollowed successfully'], 200);
    }
}
