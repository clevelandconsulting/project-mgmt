<?php

class UsersTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('user')->truncate();

		$user = array(
			'username'=>'test',
			'password'=>Hash::make('pass'),
			'email'=>'test@test.com'
		);

		// Uncomment the below to run the seeder
		DB::table('users')->insert($user);
	}

}
