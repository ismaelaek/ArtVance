<?php

namespace Database\Factories;

use App\Models\Media;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class MediaFactory extends Factory
{
    protected $model = Media::class;

    public function definition()
    {
        return [
            'post_id' => Post::factory(),
            'url' => $this->faker->imageUrl,
        ];
    }
}
