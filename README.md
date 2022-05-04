### Setting up project

1. Clone the repository
2. Create .env file in root directory of the project
3. Copy values from .env.example and replace with your own. Pay attention to set "NODE_ENV" to "production".
4. Run "docker-compose up".

Api is available from "localhost". The port is defined with NODE_LOCAL_PORT env variable.
All task routes are under "localhost:{port}/weather".

### API usage

#### [GET] /weather

**Parameters:**

- unit - temperature units (Optional. Allowed values: "C", "F". Default: "C").

**Description**

Retrieves all existing weather records. Accepts optional query parameter "unit" which can be "C" or "F". Default value is "C".

**Example URL:**

``curl http://localhost:3000/weather?unit=f``

**Example response:**

``
[
    {
        "city": "Helsinki",
        "lat": 60.1676,
        "lon": 24.9421,
        "temp": 44.6,
        "humidity": 40.5,
        "unit": "F"
    }
]
``

#### [GET] /weather/search

**Parameters:**

- lat - latitude of desired location (Required)
- lon - longitude of desired location (Required)
- radius - radius within which records should be returned (Optional. Default: 50m).
- unit - temperature units (Optional. Allowed values: "C", "F". Default: "C").

Retrieves weather records within requested raidus. Radius query parameter is optional. If not provided, default value of 50m will be used.
Accepts optional query parameter "unit" which can be "C" or "F". Default value is "C".

**Usage example:**

``curl http://localhost:3000/weather/search?lat=60.1676&lon=24.9421&radius=100``

**Example response:**

``
[
    {
        "city": "Helsinki",
        "lat": 60.1676,
        "lon": 24.9421,
        "temp": 44.6,
        "humidity": 40.5,
        "unit": "F"
    }
]
``

#### [POST] /weather

**Parameters:**

- weather - Has to be prvided as "form-data" body field. Needs to be a JSON file (Required).

**Description**

Parses JSON file containing weather records in following format and saves them to DB:
``
[
  {
    "city": "Helsinki",
    "lat": "60.1676",
    "lon": "24.9421",
    "temp": "7.0",
    "humidity": "40.5"
    },
]
``

**Usage example:**

``curl -F weather=@relative/path/to/your/file/weather.json http://localhost:3000/weather``

**Example response:**

``
{
    "message": "File data saved to DB.",
    "data": {
        "name": "weather.json",
        "mimetype": "application/json",
        "size": 492
    }
}
``

### Note

It is recommended to use some software like "Postman" for better app testing experience but the "curl" commands above will do the job as well.