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
            'email' => 'admin@admin.com',
            'password' => bcrypt('password')
        ]);
    }
}
