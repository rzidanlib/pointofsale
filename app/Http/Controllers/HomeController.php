<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $products = Products::all();
        return Inertia::render('Home/Index', [
            'products' => $products
        ]);
    }
}
