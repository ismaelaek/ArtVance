<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Follow;

class FollowSeeder extends Seeder
{
    public function run()
    {
        $users = User::factory(5)->create();

        foreach ($users as $user) {
            $following = $users->where('id', '!=', $user->id)->random(rand(1, 3));

            foreach ($following as $followedUser) {
                Follow::factory()->create([
                    'follower_id' => $user->id,
                    'followed_id' => $followedUser->id,
                ]);
            }
        }
    }
}
