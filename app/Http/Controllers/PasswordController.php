<?php

namespace App\Http\Controllers;

use App\Password;
use Illuminate\Http\Request;
use App\Http\Requests\PasswordRequest;

class PasswordController extends Controller
{
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PasswordRequest $request)
    {
        $password = new Password;
        $password->password = $request->password;
        $password->save();

        return ($password) ? redirect()->back()->with('success', 'Password Saved!') : 
                            redirect()->back()->with('error', 'Invalid Password');
    }

    /**
     * Check if the password is existing
     */
    public function check(Request $request)
    {
        $password = Password::where('password', $request->password)->first();
        if($password) {
            return response()->json(['result' => 1], 200);
        }
        return response()->json(['result' => 0], 200);
    }
}
