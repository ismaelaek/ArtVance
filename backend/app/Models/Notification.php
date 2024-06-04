<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'content', 'notified_id', 'is_reed', 'post_id'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function notifiedUser()
    {
        return $this->belongsTo(User::class, 'notified_id');
    }
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    
}
