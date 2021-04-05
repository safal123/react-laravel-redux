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

Route::post('login', 'Api\AuthController@login')->name('login');
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
    Route::get('user', 'Api\UserController@index');
    Route::get('orders', 'Api\OrderController@index');
    Route::post('products', 'Api\ProductController@store')->middleware('admin:api');
    Route::delete('products/{id}', 'Api\ProductController@delete')->middleware('admin:api');
    Route::put('products/{id}/make-active', 'Api\ProductController@makeActive')->middleware('admin:api');
});

