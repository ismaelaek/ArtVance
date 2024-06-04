<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function reportUser(Request $request)
    {
        $request->validate([
            'reported_user_id' => 'required|exists:users,id',
        ]);

        Report::create([
            'reported_user_id' => $request->reported_user_id,
            'reported_post_id' => null,
        ]);

        return response()->json(['message' => 'User reported successfully.'], 201);
    }

    public function reportPost(Request $request)
    {
        $request->validate([
            'reported_post_id' => 'required|exists:posts,id',
        ]);

        Report::create([
            'reported_user_id' => null,
            'reported_post_id' => $request->reported_post_id,
        ]);

        return response()->json(['message' => 'Post reported successfully.'], 201);
    }

    public function topReportedUsers()
    {
        $topUsers = Report::select('reported_user_id', DB::raw('count(*) as total_reports'))
        ->whereNotNull('reported_user_id')
        ->groupBy('reported_user_id')
        ->orderByDesc('total_reports')
        ->with('reportedUser')
        ->take(5)
            ->get();

        return response()->json($topUsers);
    }

    public function topReportedPosts()
    {
        $topPosts = Report::select('reported_post_id', DB::raw('count(*) as total_reports'))
            ->whereNotNull('reported_post_id')
            ->groupBy('reported_post_id')
            ->orderByDesc('total_reports')
            ->with([
                'reportedPost' => function ($query) {
                    $query->with(['user', 'media']);
                }
            ])
            ->take(5)
            ->get();

        return response()->json($topPosts);
    }

}
