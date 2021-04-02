<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    public function index()
    {
        return response()->json(['products' => Product::orderBy('created_at', 'desc')->get()]);
    }

    public function get($id)
    {
        $product = Product::find($id);
        if(!$product){
            return response()->json(['message' => "Product not found."], 404);
        }
        return response()->json(['product' => $product], 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required'
        ]);
        Product::create($data);
        return response(200);
    }

    public function delete($id)
    {
        $product = Product::find($id);
        if($product) {
            $product->delete();
            return response()->json([
                'message' => 'Product deleted successfully.'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Product not found.'
            ], 404);
        }

    }
}
