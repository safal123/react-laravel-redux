<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\SendOrderEmailJob;
use App\Mail\OrderPlaced;
use App\Order;
use Illuminate\Support\Facades\Mail;
use Stripe;
use Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function __construct(Request $request)
    {
        if ($request->header('Authorization')) {
            $this->middleware('client.credentials')->only(['checkout']);
        }
    }

    public function checkout(Request $request)
    {
        $user = Auth::guard('api')->user();
        $id = $request->id;
        $cart = $request->cart;
        $billing_details = $request->billing_details;
        $card = $request->card;
        $charge = Stripe::charges()->create([
            'amount' => $cart['totalPrice'],
            'currency' => 'AUD',
            'source' => $id,
            'description' => 'Order',
            'receipt_email' => $billing_details['email'],
        ]);
        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => $user ? $user->id : null,
                'billing_email' => $billing_details['email'],
                'billing_name' => $billing_details['name'],
                'billing_address' => $billing_details['address'],
                'billing_phone' => $billing_details['phone'],
                'billing_name_on_card' => $billing_details['name'],
                'billing_discount_code' => 'ABCD',
                'billing_discount' => 0,
                'billing_subtotal' => 0,
                'billing_tax' => 0,
                'billing_total' => $cart['totalPrice'],
                'payment_method' => 'Stripe',
                'shipped' => false,
                'error' => null,
            ]);
            foreach ($cart['items'] as $item) {
                $order->products()->attach($item['id'], [
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                ]);
            }
            DB::commit();
            SendOrderEmailJob::dispatch($order);
            return response()->json($charge['status'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json($e->getMessage(), 502);
        }
    }
}
