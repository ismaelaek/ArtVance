<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'image' => $this->faker->imageUrl,
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 10, 100),
            'isSold' => $this->faker->boolean,
        ];
    }
}
