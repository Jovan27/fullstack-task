# Full-Stack Task

## Running the project

All scripts can be executed from the repository root.

### Install dependencies

`yarn`

### Database

Option 1: If you have docker and docker-compose installed on you machine

`yarn start:db` Will run docker compose with database service

Option 2: If you don't have docker

Connect to existing database by changing env variables `backend/.env.stage.dev`

### Backend

`yarn start:backend` Will start the NestJS backend app.

### Frontend

`yarn start:frontend` Will start the React frontend app.

### E2E

`yarn e2e` Will run headless playwright tests
`yarn e2e:headed` Will run headed playwright tests

If you don't have necessary browser dependencies, run `npx playwright install` to install supported browsers.

### Unit

`yarn test`

## Note

The task is done in roughly 12 hours.