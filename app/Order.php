<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Order extends Model
{
    protected $table = 'orders';

    protected $primaryKey = 'id';

    protected $guarded = [];

    // Order belongs to User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Order has many products
    public function products()
    {
        return $this->belongsToMany(
            Product::class,
            'order_products',
            'order_id',
            'product_id')
            ->withPivot('quantity', 'price');
    }
}
