<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->call('UsersTableSeeder');
		$this->call('ProjectsTableSeeder');
		$this->call('CompaniesTableSeeder');
		$this->call('PaymentsTableSeeder');
		$this->call('TimesTableSeeder');
	}

}