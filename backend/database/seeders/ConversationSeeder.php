<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Conversation;

class ConversationSeeder extends Seeder
{
    public function run()
    {
        Conversation::factory()->count(10)->create();
    }
}
