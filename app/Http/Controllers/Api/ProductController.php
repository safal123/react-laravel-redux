<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Product;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(['products' => Product::all()]);
    }

    public function get($id)
    {
        $product = Product::find($id);

        if(!$product){
            return response()->json(['message' => "Product not found."], 404);
        }

        return response()->json(['product' => $product], 200);
    }
}
