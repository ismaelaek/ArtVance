<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function getCommentsByPost($postId)
    {
        $post = Post::findOrFail($postId);

        $comments = $post->comments()->with('user')->get();

        return response()->json($comments);
    }
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id',
            'user_id' => 'required|exists:users,id', 
        ]);

        $user = User::findOrFail($request->user_id);
        $comment = $user->comments()->create([
            'content' => $request->input('content'),
            'post_id' => $request->input('post_id'),
        ]);

        return response()->json(['comment' => $comment, 'message' => 'Comment posted successfully']);
    }

}
