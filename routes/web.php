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

use Illuminate\Http\Request;
use Moo\FlashCard\Entity\Card;

Route::get('/', function () {
    return view('index');
});

// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/save-card', 'HomeController@saveCard')->name('save-card');
Route::post('/save-category', 'HomeController@saveCategory')->name('save-category');

Route::get('/{slug}', function (string $slug, Request $request) {
    /** @var Card $card */
    // Find card by slug
    $card = Card::where('slug', $slug)->with('category')->firstOrFail();

    // Increment views
    $card->incrementViews($request->ip());

    // Render view
    return view('card', [
        'card' => $card,
    ]);
});
