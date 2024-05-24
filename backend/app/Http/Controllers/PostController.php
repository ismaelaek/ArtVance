<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Media;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'caption' => 'nullable|string',
            'isForSale' => 'required|boolean',
            'media' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4|max:10240',
        ]);

        if (!$request->has('caption') && !$request->hasFile('media')) {
            return response()->json([
                'message' => 'Either caption or media is required.',
            ], 400);
        }

        $post = new Post();
        $post->caption = $validatedData['caption'] ?? '';
        $post->user_id = $request->user_id;
        $post->isForSale = $validatedData['isForSale'];
        $post->save();

        if ($request->hasFile('media')) {
            $file = $request->file('media');
            $path = $file->store('media', 'public');
            $url = url('storage/' . $path);

            $media = new Media();
            $media->post_id = $post->id;
            $media->url = $url;
            $media->save();
        }

        return response()->json([
            'message' => 'Post created successfully!',
        ], 201);
    }


    
    public function getPostMedia($post_id)
    {
        $post = Post::find($post_id);
        $media = $post->media()->get();
        return response()->json([
            'media' => $media,
        ], 200);
    }
}
