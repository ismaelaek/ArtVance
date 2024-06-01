<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'conversation_id' => 'required|exists:conversations,id',
        ]);

        $message = new Message();
        $message->content = $validatedData['content'];
        $message->user_id = $validatedData['user_id'];
        $message->conversation_id = $validatedData['conversation_id'];
        $message->is_seen = false;
        $message->is_sent = true;

        $message->save();

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['status' => 'Message Sent!', 'message' => $message]);
    }
}
