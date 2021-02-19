<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Forum;
use App\Post;
use App\Thread;
use App\User;

class ForumTest extends TestCase
{


    public function testCategoriesStatus()
    {
        $response = $this->get('/categories');
        $response->assertStatus(200);
    }

    public function testGetForumById()
    {
        $response = $this->get('/forum/1');
        $forum = Forum::find(1);
        if (!isset($forum->id)) {
            return response()->json(['error' => 401], 200);
        }

        $forum->views++;
        $forum->save();


        $threads = Thread::where('forum_id', $forum->id)->latest()->paginate(10);
        $forum['threads'] = $threads;


        for ($i = 0; $i < count($forum['threads']); $i++) {
            $thread = $forum['threads'][$i];
            $thread['latestPost'] = Post::with('user', 'thread.user')
                ->where('thread_id', '=', $thread['id'])
                ->latest()
                ->first();
            $thread['postCount'] = Post::where('thread_id', '=', $thread['id'])->count();

            $user = User::find($thread->user_id);
            $thread['user'] = $user;
        }


        $response
            ->assertStatus(200)
            ->assertJson([
                'id' => $forum->id,
            ]);
    }


    public function getThreadById()
    {
        $id = 1;
        $response = $this->get('/thread/1');
        $thread = Thread::with('user', 'forum')->where('id', $id)->first();

        $posts = Post::with('user')->where('thread_id', $thread->id)->paginate(10);

        $thread['posts'] = $posts;
        $response
            ->assertStatus(200)
            ->assertJson([
                'id' => $thread->id,
            ]);
    }
}
