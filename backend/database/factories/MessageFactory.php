<?php

namespace Database\Factories;

use App\Models\Message;
use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    protected $model = Message::class;

    public function definition()
    {
        return [
            'conversation_id' => Conversation::factory(),
            'user_id' => User::factory(),
            'content' => $this->faker->sentence,
            'is_sent' => $this->faker->boolean,
            'is_seen' => $this->faker->boolean,
        ];
    }
}
