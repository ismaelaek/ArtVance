<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\User;
use App\Models\MediaType;
use Illuminate\Database\Eloquent\Factories\Factory;

class MediaFactory extends Factory
{
    protected $model = Media::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'media_type_id' => MediaType::factory(),
            'url' => $this->faker->imageUrl,
        ];
    }
}
