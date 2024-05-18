<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Category;
use App\Models\User;
use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition()
    {
        return [
            'caption' => $this->faker->sentence,
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'media_id' => Media::factory(),
            'isForSale' => $this->faker->boolean,
        ];
    }
}
