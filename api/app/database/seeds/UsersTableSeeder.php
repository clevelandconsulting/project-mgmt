<?php

class UsersTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('user')->truncate();

		$user = array(
			array(
				'basecamp_id'=>8034,
				'username'=>'test',
				'password'=>Hash::make('pass'),
				'email'=>'test@test.com',
				'created_at'=>new DateTime(),
				'updated_at'=>new DateTime()
			),
			array(
				'basecamp_id'=>8035,
				'username'=>'test1',
				'password'=>Hash::make('pass'),
				'email'=>'test1@test.com',
				'created_at'=>new DateTime(),
				'updated_at'=>new DateTime()
			),
			array(
				'basecamp_id'=>8036,
				'username'=>'test2',
				'password'=>Hash::make('pass'),
				'email'=>'test2@test.com',
				'created_at'=>new DateTime(),
				'updated_at'=>new DateTime()
			),
			array(
				'basecamp_id'=>8037,
				'username'=>'test3',
				'password'=>Hash::make('pass'),
				'email'=>'test3@test.com',
				'created_at'=>new DateTime(),
				'updated_at'=>new DateTime()
			),
			array(
				'basecamp_id'=>8038,
				'username'=>'test4',
				'password'=>Hash::make('pass'),
				'email'=>'test4@test.com',
				'created_at'=>new DateTime(),
				'updated_at'=>new DateTime()
			),
			
		);

		// Uncomment the below to run the seeder
		DB::table('users')->insert($user);
	}

}
