<?php

use Illuminate\Database\Seeder;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Product::truncate();

        \App\Product::create([
            'name' => 'Iphone 11 Pro Max',
            'description' => 'Iphone 11 Pro Max is very cool and smart.',
//            'image' => 'https://picsum.photos/100/100',
            'price' => 2249.99
        ]);
        \App\Product::create([
            'name' => 'Iphone 7 Plus',
            'description' => 'Iphone 7 Plus is very cool and smart.',
//            'image' => 'https://picsum.photos/100/100',
            'price' => 1249.99
        ]);
        \App\Product::create([
            'name' => 'Iphone 7',
            'description' => 'Iphone 7 is very cool and smart.',
            'price' => 1049.99
        ]);
    }
}
