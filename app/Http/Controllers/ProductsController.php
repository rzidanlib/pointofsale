<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $products = Products::all();
    return Inertia::render('Products/Index', [
      'products' => $products,
      'app_url' => env('APP_URL'),
    ]);
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    if ($request->hasFile('gambar')) {
      $image = $request->file('gambar');
      $imageName = time() . '.' . $image->getClientOriginalExtension();
      $image->move(public_path('assets'), $imageName);

      $products = new Products();
      $products->menu = $request->menu;
      $products->harga = $request->harga;
      $products->gambar = $imageName;
      $products->save();
      // Products::create([
      //   'menu' => $request->menu,
      //   'harga' => $request->harga,
      //   'gambar' => $imageName,
      // ]);

      return redirect()->back()->with('message', 'Menu berhasil disimpan');
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(Products $products)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Products $products, Request $request)
  {
    return Inertia::render('Products/Edit', [
      'products' => $products->find($request->id)
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, Products $products)
  {
    $product = Products::find($request->id);
    if ($request->hasFile('gambar')) {
      $image = $request->file('gambar');
      $imageName = time() . '.' . $image->getClientOriginalExtension();
      $image->move(public_path('assets'), $imageName);
    } else {
      $imageName = $product->image;
    }

    Products::where('id', $request->id)->update([
      'menu' => $request->menu,
      'harga' => $request->harga,
      'gambar' => $imageName,
    ]);

    // return redirect()->back()->with('message', 'Product berhasil disimpan');
    return to_route('products')->with('message', 'Update data berhasil');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Request $request)
  {
    $products = Products::find($request->id);
    $products->delete();
    return redirect()->back()->with('message', 'Menu dihapus');
  }
}
