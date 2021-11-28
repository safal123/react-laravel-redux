<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\Exceptions\InvalidAuthTokenException;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            'user' => request()->user()
        ]);
    }
}
