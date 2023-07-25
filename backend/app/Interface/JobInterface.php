<?php

namespace App\Interface;

interface JobInterface
{
    public function index();
    public function filterJobs();
    public function show($id);
    public function store($request);
    public function update($request, $id);
    public function destroy($id);
}
