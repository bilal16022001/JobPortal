<?php

namespace App\Interface;

interface JobCategoryInterface
{

    public function index();

    public function edit($id);

    public function create();

    public function show($id);

    public function store($request);

    public function update($request, $id);
}
