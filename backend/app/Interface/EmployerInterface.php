<?php

namespace App\Interface;

interface EmployerInterface
{

    public function index();

    // public function edit($id);

    // public function create();

    public function show($id);
    public function login_E($request);
    public function store($request);
    public function RegisterEmp($request);
    public function update($request, $id);
    public function logout($request);

    public function destroy($id);
}
