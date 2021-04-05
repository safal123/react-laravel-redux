<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\User::truncate();

        \App\User::create([
            'name' => 'Safal Pokharel',
            'email' => 'pokharelsafal66@gmail.com',
            'password' => bcrypt('sarthak123'),
            'is_admin' => true
        ]);
    }
}
