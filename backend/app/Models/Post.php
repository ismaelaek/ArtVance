<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function media()
    {
        return $this->hasMany(Media::class);
    }
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}