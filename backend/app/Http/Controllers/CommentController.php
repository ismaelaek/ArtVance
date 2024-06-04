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
        
        $postOwner = Post::findOrFail($request->post_id)->user;

        $notification = $postOwner->getNotified()->create([
            'content' => 'commented on your post',
            'user_id' => $request->user_id, 
            'post_id' => $request->post_id,
            'notified_id' => $postOwner->id,
            'is_read' => false,
        ]);

        return response()->json([
            'comment' => $comment,
            'notification' => $notification,
            'message' => 'Comment posted and notification sent successfully'
        ]);
    }

}
