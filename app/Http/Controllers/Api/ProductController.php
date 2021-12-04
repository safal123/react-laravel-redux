<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    public function index()
    {
        return response()->json(['products' => new ProductResource(Product::orderBy('created_at', 'desc')->get())]);
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
         $this->validate($request, [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'image'
        ]);
        $product = new Product();

        if($request->hasFile('image')){
            $path = $request->file('image')->store('products-images', 's3');
            Storage::disk('s3')->setVisibility($path, 'public');
        }

        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->image = basename($path);
        $product->image_url = Storage::disk('s3')->url($path);
        $product->save();

        return response()->json(['product' => $product], 200);
    }

    public function delete($id)
    {
        $product = Product::find($id);
        if($product) {
            if($product->image){
                Storage::disk('s3')->delete('products-images/'. $product->image);
            }
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

    public function makeActive($id)
    {
        $product = Product::find($id);
        if($product) {
            $product->is_active ? $product->is_active = false : $product->is_active = true;
            $product->save();
            return response()->json([
                'message' => 'Product updated successfully.'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Product not found.'
            ], 404);
        }
    }
}
