<?php

namespace App\Http\Controllers\Api;
use App\Models\Users;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class UsersController extends Controller
{
/**
* Display a listing of the resource.
*
* @return \Illuminate\Http\Response
*/
public function index()
{
$Users = Users::all();
return response()->json([
"success" => true,
"message" => "User List",
"data" => $Users
]);
}
/**
* Store a newly created resource in storage.
*
* @param  \Illuminate\Http\Request  $request
* @return \Illuminate\Http\Response
*/
public function adduser(Request $request)
{
$input = $request->json()->all();
$validator = Validator::make($input, [
'name' => 'required',
'email' => 'required|email|unique:users',
'role' => 'required'
]);
if($validator->fails()){
    return response()->json([
        "success" => false,
        "message" => "User creation failed.",
        "data" => [],
        "error" => $validator->errors()
        ], 200);
}
$User = Users::create($input);
return response()->json([
"success" => true,
"message" => "User created successfully.",
"data" => $User
], 200);
} 
/**
* Display the specified resource.
*
* @param  int  $id
* @return \Illuminate\Http\Response
*/
public function show($id)
{
$User = Users::find($id);
if (is_null($User)) {
return $this->sendError('User not found.');
}
return response()->json([
"success" => true,
"message" => "User retrieved successfully.",
"data" => $User
]);
}
/**
* Update the specified resource in storage.
*
* @param  \Illuminate\Http\Request  $request
* @param  int  $id
* @return \Illuminate\Http\Response
*/
public function update(Request $request, User $User)
{
$input = $request->all();
$validator = Validator::make($input, [
    'name' => 'required',
    'email' => 'required|email|unique:users',
    'role' => 'required'
]);
if($validator->fails()){
return $this->sendError('Validation Error.', $validator->errors());       
}
$User->name = $input['name'];
$User->detail = $input['detail'];
$User->save();
return response()->json([
"success" => true,
"message" => "User updated successfully.",
"data" => $User
]);
}
/**
* Remove the specified resource from storage.
*
* @param  int  $id
* @return \Illuminate\Http\Response
*/
public function destroy(User $User)
{
$User->delete();
return response()->json([
"success" => true,
"message" => "User deleted successfully.",
"data" => $User
]);
}
}