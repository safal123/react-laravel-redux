<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'description' => $faker->sentence(),
        'price' => $faker->randomNumber(2),
    ];
});
