<?php

namespace App\Http\Controllers\Api;

use App\Cart;
use App\Http\Controllers\Controller;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function add_item_to_cart(Request $request, Product $product)
    {
        $product = Product::find($product);
        if(!$product){
            return response()->json(['message' => 'Product not found.']);
        }
        if($request->cart){
            $cart = $this->createCart();
        }

        $cart->products()->attach($product);
    }

    /**
     * @return mixed
     */
    private function createCart()
    {
        return Cart::create([
            'is_paid' => false,
            'key' => rand(),
            'user_id' => \auth()->user() ? \auth()->user()->id : null
        ]);
    }
}
