<?php

namespace App\Http\Controllers;
use Illuminate\Http\Requests\ProductRequest;
use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    public function index() 
    {
        $products = Product::all();
        return response()->json([
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $product = Product::create($request->only('name', 'description', 'price'));

        return response()->json([
            'product' => $product
        ]);
    }

    public function show($id) 
    {
        $product = Product::find($id);
        return response()->json([
            "product" => $product
        ]);
    }
}
