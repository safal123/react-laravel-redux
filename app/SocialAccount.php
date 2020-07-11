<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
    protected $fillable = ['provider_id', 'provider',];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
