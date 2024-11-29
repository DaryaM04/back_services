<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Packages\Common\Infrastructure\Services\MediaService;
use Illuminate\Support\Facades\Validator;

class PortfolioController extends Controller{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Нужно отдать фронту список ($portfolios) всех портфолио конкретного пользователя вместе с услугами из админки
        // (таблицы: users, user_services, users)

        $is_exceeded = false;

        if (Portfolio::query()
            ->where('user_id', '=', Auth::id())
            // ->with('service')
            ->count() > 9) 
        {
            $is_exceeded = true;
        } 

        $portfolios = Portfolio::query()->where('user_id', '=', Auth::id())->get();
        return Inertia::render('User/Portfolio/index', compact('portfolios', 'is_exceeded'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Нужно отдать фронту список услуг ($services) из админки
        // (таблица: services)
        $portfolios = Portfolio::all();
        $services = Service::all();
        return Inertia::render('User/Portfolio/EditPortfolio', compact('portfolios', 'services')); // в метод render передать данные ($services)
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
        {
            //dd($request->all());
            // Валидация
            $validatedData = $request->validate([
                'service_id' => ['required', 'numeric', 'exists:services,id'], // Проверяем существование услуги
                'service_name' => ['required', 'string'], // Обязательно передать name
                'photo' => ['required', 'image', 'max:1024', 'mimes:png,jpg,gif'],
                'description' => ['nullable', 'max:250'],
                'price' => ['numeric', 'min:0', 'nullable'],
            ]);

        

            // Добавляем user_id и сохраняем файл
            $validatedData['user_id'] = Auth::id();
            $photo = $request->file('photo');
            $photo->store('img/portfolio', 'public');
            $validatedData['photo'] = '/storage/img/portfolio/' . $photo->hashName();

            // Сохраняем запись
            Portfolio::create($validatedData);

            return Redirect::route('user.portfolio.index');
        }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // не трогать!
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, string $id)
    {
        $portfolio = Portfolio::query()->find($id);
        $user_id = Auth::id();
        $services = Service::all();

        return Inertia::render('User/Portfolio/EditPortfolio', compact('portfolio', 'services')); // в метод render передать данные ($services, $portfolio)
    }

    public function update(Request $request, string $id)
    {
    // Валидация нужных полей
    $validateData = $request->validate([
        'service_name' => ['required', 'string'],
        'description' => ['nullable', 'max:250'],
        'price' => ['numeric', 'min:0', 'nullable'],
        'service_id' => ['nullable', 'numeric'],
    ]);

    // Поиск записи
    $portfolio = Portfolio::query()->find($id);

    // Проверяем, загружено ли новое фото
    if ($request->hasFile('photo') && $request->file('photo')->isValid()) {
        
        //Валидация нового фото
        $request->validate([
            'photo' => ['required', 'image']
        ]);

        // Удаляем старое фото, если оно существует
        if (Storage::disk('public')->exists($portfolio->photo)) {
            Storage::disk('public')->delete($portfolio->photo);
        }

        // Сохраняем новое фото
        $photo = $request->file('photo');
        //dd($request);
        $photo->store('img/portfolio', 'public');
        $validateData['photo'] = '/storage/img/portfolio/' . $photo->hashName();
    } else {
        // Если фото не загружено, оставляем старое
        $validateData['photo'] = $portfolio->photo;
    }

    // Обновляем запись в базе данных
    $portfolio->update($validateData);

    return Redirect::route('user.portfolio.index');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Удаляем запись в бд
        $portfolio = Portfolio::query()->find($id);
        $photo = $portfolio->photo;
        if(Storage::disk('public')->exists($photo)){
            Storage::disk('public')->delete($photo);
        }

        Portfolio::destroy($id);
        return Redirect::route('user.portfolio.index');
    }

    //AJAX запрос
    public function validatePhoto(Request $request){
        //проверить наличие файла 
        if($request->hasFile('photo')){
            $validator = $request->validate([
                'photo' => 'required|image|max:1024|mimes:png,jpg,gif',
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Файл успешно загружен!',
            ]);
        };

        return response()->json([
            'success' => false,
            'message' => 'Файл не загружен((('
        ], 422);
    }


    public function validateTitle(Request $request)
    {
        // Проверяем, передан ли service_id
        if ($request->has('service_id')) {
            $validator = $request->validate([
                'service_id' => 'required|nullable|numeric|exists:services,id', // Проверка на существование услуги
            ]);

            // Если валидация прошла
            return response()->json([
                'success' => true,
                'message' => 'Услуга успешно выбрана!',
            ]);
        }
        // Если service_id не передан
        return response()->json([
            'success' => false,
            'message' => 'Услуга не выбрана.',  // Сообщение, если услуга не выбрана
        ], 422);
    }
}
