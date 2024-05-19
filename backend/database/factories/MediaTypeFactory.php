<?php

namespace Database\Factories;

use App\Models\MediaType;
use Illuminate\Database\Eloquent\Factories\Factory;

class MediaTypeFactory extends Factory
{
    protected $model = MediaType::class;

    public function definition()
    {
        return [
            'label' => $this->faker->word,
        ];
    }
}
