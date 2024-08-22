<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $title = [
            'Learn Laravel',
            'Learn Vue.js',
            'Build a project',
            'Learn Tailwind CSS',
            'Learn Alpine.js',
            'Learn Livewire',
            'Learn Inertia.js',
            'Learn Jetstream',
            'Learn Fortify',
            'Learn Laravel Breeze',
            'Learn Laravel Nova',
            'Learn Laravel Horizon',
            'Learn Laravel Echo',
            'Learn Laravel Dusk',
            'Learn Laravel Telescope',
            'Learn Laravel Envoy',
            'Learn Laravel Passport',
            'Learn Laravel Sanctum',
            'Learn Laravel Socialite',
            'Learn Laravel Cashier',
            'Learn Laravel Spark',
            'Learn Laravel Vapor',
            'Learn Laravel Forge',
            'Learn Laravel Envoyer',
            'Learn Laravel Mix',
            'Learn Laravel Elixir',
            'Learn Laravel Valet',
            'Learn Laravel Homestead',
            'Learn Laravel Lumen',
            'Learn Laravel Zero',
            'Learn Laravel Octane',
            'Learn Laravel Sail',
            'Learn Laravel Artisan',
            'Learn Laravel Tinker',
            'Learn Laravel Migrations',
            'Learn Laravel Seeding',
            'Learn Laravel Factories',
            'Learn Laravel Testing',
            'Learn Laravel Databases',
            'Learn Laravel Eloquent',
            'Learn Laravel Query Builder',
            'Learn Laravel Pagination',
            'Learn Laravel Collections',
            'Learn Laravel Requests',
            'Learn Laravel Responses',
            'Learn Laravel Middleware',
            'Learn Laravel Events',
            'Learn Laravel Listeners',
            'Learn Laravel Notifications',
            'Learn Laravel Jobs',
            'Learn Laravel Commands',
            'Learn Laravel Scheduling',
            'Learn Laravel Task Scheduling',
            'Learn Laravel Cache',
            'Learn Laravel Redis',
            'Learn Laravel Session',
            'Learn Laravel Validation',
            'Learn Laravel Localization',
            'Learn Laravel Frontend',
            'Learn Laravel Backend',
            'Learn Laravel Fullstack',
            'Learn Laravel API',
            'Learn Laravel RESTful',
            'Learn Laravel GraphQL',
            'Learn Laravel Websockets',
            'Learn Laravel Broadcasting',
            'Learn Laravel Events',
            'Learn Laravel Notifications',
            'Learn Laravel Queues',
            'Learn Laravel Mail',
            'Learn Laravel Notifications',
            'Learn Laravel Pusher',
            'Learn Laravel SMS',
            'Learn Laravel Twilio',
            'Learn Laravel Nexmo',
            'Learn Laravel AWS',
            'Learn Laravel S3',
        ];

        $status = ['pending', 'progress', 'completed'];

        return [
            'user_id' => rand(1, 2),
            'title' => $this->faker->randomElement($title),
            'description' => $this->faker->sentence,
            'status' => $this->faker->randomElement($status),
        ];
    }
}
