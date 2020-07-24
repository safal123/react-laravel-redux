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
        $payload = $this->payload(request('token'));

        if($payload && $payload['email_verified']) {
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
            return response()->json(['error' => 'Invalid credentials.'], 401);
        }
    }

    /**
     * @param $token
     * @return array|false
     */
    public function payload($token)
    {
        $client = new \Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        return $client->verifyIdToken($token);
    }

    /**
     * @param Authenticatable $user
     * @return array
     */
    protected function createToken(Authenticatable $user)
    {
        return $success = [
            "token" => $user->createToken('app')->accessToken,
            "user" => $user
        ];
    }


    /**
     * @param $user
     * @return \Illuminate\Http\JsonResponse
     */
    protected function authLogin($user): \Illuminate\Http\JsonResponse
    {
        if ($user = Auth::loginUsingId($user->id)) {
            return response()->json(['success' => $this->createToken($user)], $this->successStatus);
        }
        return response()->json(['error' => 'Invalid email or password'], 401);
    }
}
