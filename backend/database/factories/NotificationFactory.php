<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationFactory extends Factory
{
    protected $model = Notification::class;

    public function definition()
    {
        return [
            'content' => $this->faker->sentence,
            'user_id' => User::factory(),
            'post_id' => Post::factory(),
            'is_read' => $this->faker->boolean,
        ];
    }
}
