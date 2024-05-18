<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Media;

class MediaSeeder extends Seeder
{
    public function run()
    {
        Media::factory()->count(10)->create();
    }
}

