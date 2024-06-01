<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $users = User::all();
        $posts = Post::all();

        foreach ($users as $user) {
            $reportedUser = $users->random();
            $reportedPost = $posts->random();

            Report::create([
                'reported_user_id' => $reportedUser->id,
                'reported_post_id' => null, 
            ]);

            Report::create([
                'reported_user_id' => null,  
                'reported_post_id' => $reportedPost->id,
            ]);
        }
    }
}
