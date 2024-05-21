<?php

namespace Database\Factories;

use App\Models\NotificationType;
use Illuminate\Database\Eloquent\Factories\Factory;

class NotificationTypeFactory extends Factory
{
    protected $model = NotificationType::class;

    public function definition()
    {
        return [
            'label' => $this->faker->word,
        ];
    }
}
