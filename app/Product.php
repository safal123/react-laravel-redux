<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'image', 'price'];

    public function carts()
    {
        return $this->belongsToMany(Cart::class, 'cart_products');
    }
}
