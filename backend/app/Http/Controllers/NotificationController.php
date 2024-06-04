<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function usersNotifications($id)
    {
        $user = User::findOrFail($id);

        $notifications = $user->getNotified()->with('user')->get();

        return response()->json($notifications);
    }
}
