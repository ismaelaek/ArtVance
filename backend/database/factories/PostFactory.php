<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'caption' => $this->faker->sentence,
            'user_id' => User::factory(),
            'isForSale' => $this->faker->boolean,
        ];
    }
}
