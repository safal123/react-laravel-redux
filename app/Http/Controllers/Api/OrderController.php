<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('client.credentials')->only(['index']);
    }
    public function index()
    {
        $user = Auth::guard('api')->user();

        $orders = $user->orders()->latest()->get();

        return response()->json($orders, 200);
    }
}
