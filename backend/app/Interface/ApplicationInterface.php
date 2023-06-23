<?php

namespace App\Interface;

interface ApplicationInterface
{
    public function index();
    public function store($request);
    public function update($request, $id);
    public function destroy($id);
}
