<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Database\Seeders\UserSeeder;
use Database\Seeders\ConversationSeeder;
use Database\Seeders\MediaSeeder;
use Database\Seeders\MessageSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\PostSeeder;
use Database\Seeders\NotificationSeeder;
use Database\Seeders\LikeSeeder;
use Database\Seeders\CommentSeeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            ConversationSeeder::class,
            MediaSeeder::class,
            MessageSeeder::class,
            ProductSeeder::class,
            PostSeeder::class,
            NotificationSeeder::class,
            LikeSeeder::class,
            CommentSeeder::class,
            FollowSeeder::class,
            ReportsTableSeeder::class,
        ]);
    }
}
