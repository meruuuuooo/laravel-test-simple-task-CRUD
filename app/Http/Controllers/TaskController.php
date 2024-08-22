<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    public function index()
    {
        $userId = Auth::id();

        $tasks = Task::where('user_id', $userId)->latest()->paginate(10);

        $alltasks = Task::where('user_id', $userId)->latest()->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'alltasks' => $alltasks,
        ]);
    }


    public function create()
    {
        return Inertia::render('Tasks/Partials/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'status' => 'required',
        ]);

        Task::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
        ]);
    }

    public function edit(Task $task): Response
    {
        return Inertia::render('Tasks/Partials/Edit', [
            'task' => $task,
        ]);
    }

    public function update(Request $request, Task $task): RedirectResponse
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'status' => 'required',
        ]);

        $task->update([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return Redirect::route('tasks.index');
    }

    public function destroy(Task $task): void
    {
        $task->delete();
    }
}
