<?php

use App\Http\Controllers\Admin\ReviewTypeController;
use App\Http\Controllers\Admin\AdminContractController;
use App\Http\Controllers\Admin\AdminJobController;
use App\Http\Controllers\Admin\AdminOfferController;
use App\Http\Controllers\Admin\AdminResponseController;
use App\Http\Controllers\Admin\CityController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\PassportController;
use App\Http\Controllers\Admin\QualityController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\User\PortfolioController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\User\UserServiceController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Middleware\PassportFilesMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// dynamic translation namespace upload to frontend
Route::get('/lang/Weblate/testNS/en.json', function () {
    return [
        'name' => 'ENGLISH NAME',
        'value' => 'ENGLISH VALUE'
    ];
});
Route::get('/lang/Weblate/testNS/ru.json', function () {
    return [
        'name' => 'Русское имя',
        'value' => 'Русское значение'
    ];
});

Route::get('/', function () {
    return Inertia::render('Landing/index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// protected route for passport files
Route::middleware(PassportFilesMiddleware::class)->group(function () {
    Route::get('/passport/files/{path}', function (\Illuminate\Http\Request $request) {
        return Storage::download($request->getRequestUri());
    });
});

// ****************************
// private routes
// ****************************

Route::middleware(['auth', 'verified'])->name('user.')->prefix('user')->group(function () {
    // общий список сервисов
    Route::get('/services', [UserServiceController::class, 'index'])->name('services.index');

    // Сохранение
    Route::post('/service', [UserServiceController::class, 'store'])->name('service.store');

    // Страница редактирования сервиса
    Route::get('/service/{id}/edit', [UserServiceController::class, 'edit'])->name('service.edit');

    // Обновление сервиса
    Route::put('/service/{id}', [UserServiceController::class, 'update'])->name('service.update');

    // Удаление сервиса
    Route::delete('/service/{id}', [UserServiceController::class, 'destroy'])->name('service.destroy');
});

Route::middleware(['auth', 'verify_phone', 'after_verify'])->group(function () {

    // user's part
    Route::name('user.')->prefix('user')->group(function () {

        Route::get('/profile', [UserController::class, 'profile'])
            ->name('profile');

        Route::post('/profile/update', [UserController::class, 'update'])
            ->name('profile.update');

        Route::get('/dashboard', function () {
            return Inertia::render('User/Dashboard');
        })->name('dashboard');

        Route::get('/worksheet', function () {
            return Inertia::render('User/Worksheet/EditWorksheet');
        })->name('worksheet');

        Route::get('/projectsearch', function () {
            return Inertia::render('User/ProjectSearch');
        })->name('projectsearch');

        Route::resource('portfolio', PortfolioController::class);

        Route::get('/profile', [ProfileController::class, 'index'])
            ->name('profile');
        Route::get('/profile/passport', [ProfileController::class, 'passport'])
            ->name('passport');
        Route::post('/profile/passport', [ProfileController::class, 'storePassport']);
            // ->name('passport');

         // Добавляем маршрут для отображения списка сервисов
        Route::get('/services', [UserServiceController::class, 'index'])->name('services.index');

        // Созлание
        Route::get('/services/create', [UserServiceController::class, 'create'])->name('services.create');

        // Страница редактирования сервиса
        Route::get('/services/{service}/edit', [UserServiceController::class, 'edit'])->name('services.edit');

        //сохранение
        Route::post('/services', [UserServiceController::class, 'store'])->name('user.services.store');

        // Обновление сервиса
        Route::patch('/services/{service}', [UserServiceController::class, 'update'])->name('services.update');

        // Удаление сервиса
        Route::delete('/services/{service}', [UserServiceController::class, 'destroy'])->name('services.destroy');


        //Маршруты для отображения списка портфолио
        Route::get('/portfolio/index', [PortfolioController::class, 'index'])->name('portfolio');

        // Создание портфолио
        Route::get('/portfolio/create', [PortfolioController::class, 'create'])->name('portfolio.create');
        
        // AJAX для фото
        Route::post('portfolio/validate-photo', [PortfolioController::class, 'validatePhoto'])->name('portfolio.validate-photo');

        // AJAX для title
        Route::post('portfolio/validate-service_id', [PortfolioController::class, 'validateTitle'])->name('portfolio.validate-service_id');


    });

    // admin's part
    Route::name('admin.')->middleware('admin')->prefix('admin')->group(function () {
        Route::redirect('/', '/admin/services')->name('dashboard');
        Route::resource('services', ServiceController::class)->except('show');
        Route::resource('cities', CityController::class)->except('show');

        Route::resource('users', AdminUserController::class)->except('show');

        Route::name('passport.')->prefix('passport')->group(function () {
            Route::get('/', [PassportController::class, 'index'])
                ->name('index');
            Route::get('{id}/show', [PassportController::class, 'show'])
                ->name('show');
            Route::get('{id}/approve', [PassportController::class, 'approve'])
                ->name('approve');

        });

//        Route::resource('passport', PassportController::class)->except('edit');

//        Route::get('passport/create-user', [PassportController::class, 'createUser'])
//            ->name('passport.create-user');
//        Route::get('passport/create-company', [PassportController::class, 'createCompany'])
//            ->name('passport.create-company');
//        Route::get('passport/edit-user', [PassportController::class, 'editUser'])
//            ->name('passport.edit-user');
//        Route::get('passport/edit-company', [PassportController::class, 'editCompany'])
//            ->name('passport.edit-company');
//        Route::get('passport/approve-user', [PassportController::class, 'approveUser'])
//            ->name('passport.approve-user');
//        Route::get('passport/approve-company', [PassportController::class, 'approveCompany'])
//            ->name('passport.approve-company');


        Route::resource('quality', QualityController::class)->except('show');
        Route::resource('dashboard', DashboardController::class)->except('show');
        Route::resource('review', ReviewController::class)->except('show');
        Route::resource('review-type', ReviewTypeController::class)->except('show');

        Route::resource('job', AdminJobController::class);
        Route::resource('contract', AdminContractController::class);
        Route::resource('offer', AdminOfferController::class);
        Route::resource('response', AdminResponseController::class);
    });

});

require __DIR__ . '/auth.php';
