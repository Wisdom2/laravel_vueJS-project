<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'api','prefix' => 'auth'], function ($router) {
            Route::post('login', 'AuthController@login');
            Route::post('logout', 'AuthController@logout');
            Route::post('refresh', 'AuthController@refresh');
            Route::post('me', 'AuthController@me');
});

Route::group(['middleware' => 'jwt.auth'], function($router) {
    Route::get('products', 'ProductController@index');
    Route::get('product/{id}', 'ProductController@show');
    Route::post('new_product', 'ProductController@store');
});
    

