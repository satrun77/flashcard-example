<?php

namespace Moo\Http\Controllers;

use Illuminate\Http\Request;
use Moo\FlashCard\Entity\Card;
use Moo\FlashCard\Entity\Category;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    /**
     * Save card details
     *
     * @param Card $card
     * @param Request $request
     * @return bool
     */
    public function saveCard(Card $card, Request $request)
    {
        $card->updateOrCreate(['id' => (int) $request->input('id')], $request->all());

        return $card;
    }

    /**
     * Save category details
     *
     * @param Category $category
     * @param Request $request
     * @return bool
     */
    public function saveCategory(Category $category, Request $request)
    {
        $category->updateOrCreate(['id' => (int) $request->input('id')], $request->all());

        return $category;
    }
}
