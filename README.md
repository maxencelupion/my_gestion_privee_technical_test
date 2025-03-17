# My Gestion Privée Technical Test
## Context
This is my project for the technical test of My Gestion Privée. The goal is to create a simple web application that allows 
the user to register/login, get his information and logout.

## Technologies
### Backend
- Php 8.4
- Symfony
- Composer as package manager
- Doctrine as ORM
- Lexik for JWT authentication

### Frontend
- Vue
- Axios for requests
- Pinia for state management
- Booststrap for styling


## Setup
### Environment variables
The project requires three .env files for configuration. You need to provide the following environment files, 
each matching the provided env.example files:

- ./.env (root environment variables)
- ./backend/.env (backend-specific environment variables)
- ./frontend/.env (frontend-specific environment variables)


### Start the project 
```bash
docker compose up --build
```
