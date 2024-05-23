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
            'caption' => 'required|string',
            'isForSale' => 'required|boolean',
            'media.*' => 'required|file|mimes:jpg,jpeg,png,gif,mp4|max:10240',
        ]);

        $post = new Post();
        $post->caption = $validatedData['caption'];
        $post->user_id = Auth::id();
        $post->isForSale = $validatedData['isForSale'];
        $post->save();

        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $path = $file->store('media', 'public');
                $url = url('storage/' . $path); 

                $media = new Media();
                $media->post_id = $post->id;
                $media->url = $url;
                $media->save();
            }
        }

        return response()->json([
            'message' => 'Post created successfully!',
        ], 201);
    }

}
