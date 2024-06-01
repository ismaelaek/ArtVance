<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index($userId)
    {
        $userConversations = Conversation::with(['sender', 'receiver'])
        ->where(function ($query) use ($userId) {
            $query->where('sender_id', $userId)
                ->orWhere('reciever_id', $userId);
        })
            ->with(['messages' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }])
            ->get()
            ->sortByDesc(function ($conversation) {
                return $conversation->messages->first()->created_at;
            })
            ->values()
            ->all();

        return response()->json($userConversations);
    }


    public function show($id)
    {
        $conversation = Conversation::with(['messages', 'sender', 'receiver'])->find($id);

        if (!$conversation) {
            return response()->json(['message' => 'Conversation not found'], 404);
        }

        return response()->json($conversation);
    }

    public function getConversationMessages($conversationId)
    {
        $conversation = Conversation::findOrFail($conversationId);

        $messages = $conversation->messages;

        return response()->json($messages);
    }
}