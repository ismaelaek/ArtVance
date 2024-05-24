<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index(){
        $allLikes = Like::all();
        return response()->json($allLikes);
    }
}
