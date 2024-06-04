<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Events\MessageSent;
use App\Models\Conversation;
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

    public function startMessaging(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' =>'required|exists:users,id',
            'reciever_id' =>'required|exists:users,id',
            'content' => 'required|string',
        ]);

        // check if conversation is alredy exist 
        $conversation = Conversation::where('sender_id', $validatedData['user_id'])
            ->where('reciever_id', $validatedData['reciever_id'])
            ->orWhere('sender_id', $validatedData['reciever_id'])
            ->where('reciever_id', $validatedData['user_id'])
            ->first();

        if (!$conversation) {
            $conversation = new Conversation();
            $conversation->sender_id = $validatedData['user_id'];
            $conversation->reciever_id = $validatedData['reciever_id'];
            $conversation->save();
        }
        // then send the message 
        $message = new Message();
        $message->content = $validatedData['content'];
        $message->user_id = $validatedData['user_id'];
        $message->conversation_id = $conversation->id;
        $message->is_seen = false;
        $message->is_sent = true;

        $message->save();

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['conversation' => $conversation, 'message' => $message]);

    }
}
