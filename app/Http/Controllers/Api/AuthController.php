<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\RegisterUserRequest;
use App\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public $successStatus = 200;

    public function login()
    {
        if(Auth::attempt(['email'=>\request('email'), 'password' =>\request('password')])){
            $user = Auth::user();
            $success = $this->createToken($user);
            return response()->json(['success' => $success], $this->successStatus);
        }
        return response()->json(['error' => 'Invalid email or password'], 401);
    }

    public function register(RegisterUserRequest $request)
    {
        $data = $request->all();
        $data['password']= bcrypt($data['password']);
        if($user = User::create($data)){
            $success = $this->createToken($user);
            return response()->json(['success' => $success], $this->successStatus);
        }
        return response()->json(['error' => 'Something went wrong'], 400);

    }

    public function logout()
    {
        if(!Auth::user()->token()->delete()){
            return response()->json(['message' => 'Something went wrong.']);
        }
        return response()->json(['message' => 'Successfully logged out.']);
    }


    protected function createToken(Authenticatable $user)
    {
        $success['token'] = $user->createToken('app')->accessToken;
        $success['user'] = $user;
        return $success;
    }
}
