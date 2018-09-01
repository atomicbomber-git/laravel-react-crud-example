<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('/item')->group(function() {
    Route::get('/index', 'ItemController@index')->name('item.index');
    Route::get('/create', 'ItemController@create')->name('item.create');
    Route::post('/create', 'ItemController@processCreate')->name('item.create');
});