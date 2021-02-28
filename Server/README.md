Demo Server
===========

This server provides an API to interact with server data
stored in a Mongo database.

Model structure
---------------

The values are packed in "Machines". A machine represents
any device in the real world.

Machines have values. Those values have the fields `name`,
`value`, and `type`. There are two types available:
`m2c`, Machine-to-Client, which read-only information for
the client, and `c2m`, Client-to-Machine, which are
sent to the machine itself.

    {
        _id: string,
        name: string, // Display name of the machine
        type: string // sim | real
        values: [
            {
                name: string // Display name for the value
                value: any // The actual value
                type: string // m2c | c2m
            }
        ]
    }

REST API
--------

    GET /api/machines

Fetches all machine data.

    POST /api/values
    {
        machine: string, // Machine ID
        name: string, // The name of the value
        value: any // The actual value
    }

Setting a value for a machine.
This only works for values of the type c2m

Image Files
-----------

Image files are provided under `/api/assets`.
You can retrieve the image for the machine using
the URL `/api/assets/machines/IMAGE_NAME`  
