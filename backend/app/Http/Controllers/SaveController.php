<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Save;
use App\Models\User;

class SaveController extends Controller
{
    public function savePost(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id'

        ]);

        $save = new Save();
        $save->user_id = $request->user_id;
        $save->post_id = $request->post_id;
        $save->save();

        return response()->json(['success' => true]);
    }

    public function unsavePost($id)
    {
        $save = Save::where('user_id', auth()->id())->where('post_id', $id)->first();

        if ($save) {
            $save->delete();
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false], 404);
    }

    public function getSavedPosts(Request $request)
    {
        // $user = auth()->user();
        // $savedPosts = $user->saves()->with('post')->get()->pluck('post');

        // return response()->json($savedPosts);

        $user = $request->user();
        if ($user) {
            $savedPosts = $user->saves()->with('post')->get()->pluck('post');
            return response()->json($savedPosts);
        }

        // If the user is not found, return an error response
        return response()->json(['error' => 'User not found'], 404);
    }
 }

