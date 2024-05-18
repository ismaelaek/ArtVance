<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'nickname' => $this->faker->name,
            'username' => $this->faker->unique()->userName,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'birthday' => $this->faker->date,
            'gender' => $this->faker->randomElement(['male', 'female']),
            'address' => $this->faker->address,
            'bio' => $this->faker->paragraph,
            'photo' => $this->faker->imageUrl,
            'isAdmin' => $this->faker->boolean,
            'cover' => $this->faker->imageUrl,
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // default password
            'remember_token' => Str::random(10),
        ];
    }
}
