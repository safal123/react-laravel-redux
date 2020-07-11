<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;

/**
 * Class SocialAuthController
 * @package App\Http\Controllers\Api
 */
class SocialAuthController extends Controller
{

    /**
     * @var int
     */
    public $successStatus = 200;


    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function auth()
    {
        $client = new \Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken(request('token'));
        if($payload){
            if($payload['email_verified']){
                $user = User::where('email', $payload['email'])->first();
                if(!$user){
                    $socialUser = User::create([
                        'name' => $payload['given_name'] . $payload['family_name'],
                        'email' => $payload['email']
                    ]);
                    $socialUser->socialAccounts()->create([
                        'provider_id' => $payload['sub'],
                        'provider' => $payload['iss'],
                    ]);
                    return $this->authLogin($socialUser);
                }
                return $this->authLogin($user);
            } else{
                return response()->json(['error' => 'Invalid email address.'], 401);
            }
        } else{
            return response()->json(['error' => 'Invalid response data.'], 401);
        }
    }


    /**
     * @param Authenticatable $user
     * @return mixed
     */
    protected function createToken(Authenticatable $user)
    {
        $success['token'] = $user->createToken('app')->accessToken;
        $success['user'] = $user;
        return $success;
    }

    /**
     * @param $user
     * @return \Illuminate\Http\JsonResponse
     */
    protected function authLogin($user): \Illuminate\Http\JsonResponse
    {
        if (Auth::loginUsingId($user->id)) {
            $user = Auth::user();
            $success = $this->createToken($user);
            return response()->json(['success' => $success], $this->successStatus);
        }
        return response()->json(['error' => 'Invalid email or password'], 401);
    }
}
