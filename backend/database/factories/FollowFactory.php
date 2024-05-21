<?php
namespace Database\Factories;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowFactory extends Factory
{
    protected $model = Follow::class;

    public function definition()
    {
        $follower = User::factory()->create();
        $followed = User::factory()->create();

        return [
            'follower_id' => $follower->id,
            'followed_id' => $followed->id,
        ];
    }
}
