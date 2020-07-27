<?php

namespace App\Http\Controllers\Api;

use App\Cart;
use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function add_item_to_cart(Product $product)
    {
        $product = Product::find($product);
//        dd(str_replace(".","",request()->ip()));
        if(!$product){
            return response()->json(['message' => 'Product not found.']);
        }
        $cart = Cart::create([
            'is_paid' => false,
            'key' => rand(),
            'user_id' => \auth()->user() ? \auth()->user()->id : rand()
        ]);

        $cart->products()->attach($product);
    }
}
