<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    public function index()
    {
        $allProducts = Product::all();
        return response()->json($allProducts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:10240', 
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('images', 'public'); 
            $url = url('storage/' . $path);
        }

        $product = new Product();
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->user_id = $request->user_id;
        $product->image = $url;
        $product->save();

        return response()->json($product, 201);
    }

}
