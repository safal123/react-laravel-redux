// Gives all the records of users from database.
$users = DB::table('users')->get();

// Displaying all user information
foreach($users as $user){
    echo $user->name;
}

// To get a single row from a database:
$user = DB::table("user")->where("name", "Safal Pokharel")->first();

// To get a single row using id of the database column:
$user = DB::table('user')->find(1);

// To geet list of columns from a database column:
$user = DB::table('user')->pluck("name", "email");
