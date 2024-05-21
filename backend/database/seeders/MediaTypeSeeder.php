<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MediaType;

class MediaTypeSeeder extends Seeder
{
    public function run()
    {
        MediaType::factory()->count(5)->create();
    }
}
