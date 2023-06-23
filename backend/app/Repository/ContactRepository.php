<?php

namespace App\Repository;

use App\Interface\ContactInterface;
use App\Models\Contact;

class ContactRepository implements ContactInterface
{
    public function index()
    {
        return Contact::all()->first();
    }

    public function store($request)
    {

        $contact = Contact::count();
        if ($contact == 0) {
            Contact::create([
                'Address' => $request->Address,
                'Phone' => $request->Phone,
                'Email' => $request->Email,
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'data added successfully!'
            ]);
        } else {
            $UpdateContact = Contact::all()->first();
            $UpdateContact->Address = $request->Address;
            $UpdateContact->Phone = $request->Phone;
            $UpdateContact->Email = $request->Email;

            $UpdateContact->save();
            return response()->json([
                'status' => 201,
                'message' => 'data updated successfully!'
            ]);
        }
    }
}
