<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Item as ItemResource;
use App\Item;

class ItemController extends Controller
{
    public function index()
    {
        if (request()->ajax())
            return new ItemResource(Item::select('id', 'name', 'price', 'description')->paginate(10));

        return view('item.index');
    }
    public function create()
    {
        return view('item.create');
    }

    public function processCreate()
    {
        $data = $this->validate(request(), [
            'name' => 'required|string|unique:items',
            'price' => 'required|numeric|min:1',
            'description' => 'required|string'
        ]);

        $item = Item::create($data);

        return [
            'status' => 'success',
            'data' => $item
        ];
    }
}
