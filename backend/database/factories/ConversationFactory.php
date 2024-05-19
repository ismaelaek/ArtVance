<?php

namespace Database\Factories;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationFactory extends Factory
{
    protected $model = Conversation::class;

    public function definition()
    {
        return [
            'sender_id' => User::factory(),
            'reciever_id' => User::factory(),
        ];
    }
}
