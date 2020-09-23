<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Api\AuthController@login');
Route::post('register', 'Api\AuthController@register');
Route::post('login/google', 'Api\SocialAuthController@auth');

Route::post('/password/email', 'Api\ForgotPasswordController@sendResetLinkEmail');
Route::post('/password/reset', 'Api\ResetPasswordController@reset');

Route::get('products', 'Api\ProductController@index');
Route::get('products/{id}', 'Api\ProductController@get');
Route::post('carts/add/{product}', 'Api\CartController@add_item_to_cart');
Route::post('/checkout', 'Api\CheckoutController@checkout');

Route::middleware(['auth:api'])->group( function (){
    Route::post('logout', 'Api\AuthController@logout');
    Route::get('user', function (Request $request){
        return $request->user();
    });
    Route::get('orders', 'Api\OrderController@index');
});

