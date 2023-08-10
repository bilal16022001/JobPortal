<?php

namespace App\Interface;

interface ApplicationInterface
{
    public function index();
    public function ShortListApplication($request);
    public function filterApplications();
    public function AppliedJobs();
    public function store($request);
    public function update($request, $id);
    public function destroy($id);
}
