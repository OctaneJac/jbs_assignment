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

```npm install
npm run dev```



Your frontend will be available at `localhost:3000` and the backend will be live at `localhost:8000`. 


## Frontend: explanation

Frontend is a basic nextjs project. The folder structure is easy to explain. 

app-
    - api/auth/[...all]: A baked in route from better-auth, called a catch-all route to catch all auth related requests
    - [projects]: A dynamic route where we pass the project id, that's retrieved from the params and used in the api to get a user's tasks
    - signin: Basic signin route, ui with shadcn and better-auth handles sign in through `wait authClient.signIn.email()`
    - signup: Basic signin route, ui with shadcn and better-auth handles sign in through `wait authClient.signUp.email()`
components-
    - auth: contains auth related components like login and signup form
    - ui: contains unstyled generic ui components like button, form, divider
    - other: contains the project card, task card and lists that make the core functionality of the app
lib-
    -types.ts: Defined an interface for both project and tasks for type-safety in types.ts
    -auth.ts and auth-client.ts: config files for auth

I've tried to keep code as modular as possible. I've defined cards for projects and tasks seperately and just pass data to them,
and have rename and delete functionalites. Rendering the entire list and sorting and filtering happens in the list page. The root page
remains simple. 

On each page, I also import session from my auth library and redirect the user to / if they're not logged in. The navbar and root page
also shows changes based on if the user is authenticated or not. 


## Backend: explanation


