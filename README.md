# Project API to solve the exercise
RESTApi for the project

``` json
Authentication
  POST /auth/login 
  Body:
  {
    "email": "<user_email>",
    "password": "<user_password>"
  }

  POST /auth/sign-up
  Body:
  {
    "email": "<new_user_email>",
    "password": "<new_user_password>",
    "phoneNumber": "<new_user_phone_number>",
    "name": "<new_user_name>",
    "familyName": "<new_user_family_name>"
  }

  POST /auth/verify-user
  Body:
  {
    "email": "<user_email>",
    "code": "<user_verification_code>"
  }

Projects API is restricted by the Bearer token, do not forget to use it when authorizing and when sending requests. (idToken of /auth/login call)
Projects
  GET /projects/get
  Response:
  [
    {
      "id": string,
      "owner": string,
      "title": string,
      "description": string,
      "size_used": string,
      "shared": boolean,
      "shared_password": string|null,
      "created_at": string,
      "updated_at": string,
      "sharedUsers": Profile[],
      "licenses": License[]
    }
  ]

  POST /projects/create
  Body:
  {
    "title": string,
    "description": string
  }
  Response:
  {
    "id": string,
    "owner": string,
    "title": string,
    "description": string,
    "size_used": string,
    "shared": boolean,
    "shared_password": string|null,
    "created_at": string,
    "updated_at": string,
    "sharedUsers": Profile[],
    "licenses": License[]
  }
```

# App parts
The application should consist of several parts:
1. Login page
2. Registration page 
3. Possibility to submit email code after user was registered
4. Projects page with the list of currently created projects
5. Modal to create a new project 
