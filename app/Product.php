<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'image', 'price'];

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
