<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NotificationType;

class NotificationTypeSeeder extends Seeder
{
    public function run()
    {
        NotificationType::factory()->count(5)->create();
    }
}
