# Introduction

This is a basic project + tasks project built with: 

1. NextJs + typescript + tailwind for the frontend
2. FastAPI for the backend
3. better-auth as a third party authentication library
4. Quick UI built with components from shadcn/ui
5. PostgreSQL integrated quickly using neonDB

> For transparency's sake, most of the project I've finished myself. I've used AI to help me write ORM queries 
>for my backend because I felt like using an ORM would be preferable than writing raw SQL for routes.

# How to run 

Running the frontend

```cd frontend``
```npm install```
```npm run dev```

Running backend, first create a virtual environment to prevent version issues with python

First:
```cd backend```

For windows:
```python -m venv venv```
```.\venv\Scripts\activate.bat```

For mac:
```python3 -m venv venv```
```source venv/bin/activate```

then:
```pip install -r requirements.txt```
```uvicorn main:app --reload --port 8000```

Your frontend will be available at `http://localhost:3000` and the backend will be live at `http://localhost:8000`. 

## Frontend: explanation

Frontend is a basic nextjs project. The folder structure is easy to explain. 

app/
    - `api/auth/[...all]`: A baked in route from better-auth, called a catch-all route to catch all auth related requests
    - `[projects]`: A dynamic route where we pass the project id, that's retrieved from the params and used in the api to get a user's tasks. 
    - `signin`: Basic signin route, ui with shadcn and better-auth handles sign in through `wait authClient.signIn.email()`
    - s`ignup`: Basic signin route, ui with shadcn and better-auth handles sign in through `wait authClient.signUp.email()`
components/
    - `auth`: contains auth related components like login and signup form
    - `ui`: contains unstyled generic ui components like button, form, divider
    - other: contains the project card, task card and lists that make the core functionality of the app
lib
    -`types.ts`: Defined an interface for both project and tasks for type-safety in types.ts
    -`auth.ts` and `auth-client.ts`: config files for auth

I've tried to keep code as modular as possible. I've defined cards for projects and tasks seperately and just pass data to them,
and have rename and delete functionalites. Rendering the entire list and sorting and filtering happens in the list page. The root page
remains simple. 

On each page, I also import session from my auth library and redirect the user to / if they're not logged in. The navbar and root page
also shows changes based on if the user is authenticated or not. 

## Backend: explanation

Nextjs is pretty opinionated with it's folder structure. FastAPI is more flexible, so I used a recommended folder structure 
used in the industry. More information about it is present here: https://www.youtube.com/watch?v=Af6Zr0tNNdE&t=805s&pp=ygUUZmFzdHBhaSBweXRob24gc2NhbGU%3D

`main.py`

app/
    - `api`: Contains seperate files for all the routes we need
    - `core`: This is where I defined my config, which is pretty much just db url and the connection with the db
    - `models`: Models for SQL alchemy to work with the db

The backend is pretty simple and doesn't have much to explain. It has basic routes for rename, create, delete. 

>Project has docker files. I intended to dockerize the application but ran into some db ssl related issues when using neonDB. 
>Could not debug them in time so I left it. You can run the app in dev mode. 

## How this project could be improved with time

1. Dockerize it and fix all bugs.
2. Protect api routes so a user can only access their data. Right now, the apis are safe from unauthorized sources through CORS, but it needs another layer of protection through JWT tokens. Right now I'm also passing user_id's directly in api requests, which is unsafe. 
3. Dynamic route needs to be protected as well. Right now api is fed the project_id from params and retrieves the task. Anyone can
reference a project_id that doesn't belong to them and see their tasks. 
4. For ease, I've committed the env file directly so you can get the project running instantly. Ideally, .env files should never be committed. 

