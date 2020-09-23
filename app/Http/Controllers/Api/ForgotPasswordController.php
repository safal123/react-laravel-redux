<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    use SendsPasswordResetEmails;

//    protected function sendResetLinkResponse(Request $request, $response)
//    {
//        return response(['message' => trans($response)]);
//    }
//
//    protected function sendResetLinkFailedResponse(Request $request, $response)
//    {
//        return response(['error' => trans($response)], 422);
//    }
}
