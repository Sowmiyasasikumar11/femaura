# FemAura Backend

A lightweight Express backend for FemAura, ready for deployment.

## Install

```bash
cd backend
npm install
```

## Run locally

```bash
npm start
```

The server listens on `process.env.PORT` or `3000` by default.

## API Endpoints

- `GET /` → returns `FemAura backend running`
- `POST /mood` → accepts a JSON body and returns mood data
- `POST /cycle` → accepts cycle data and returns a calculated summary
- `POST /chatbot` → accepts `{ question }` and returns a sample chatbot answer

## Render Deployment

To deploy on Render:

1. Create a new Web Service and point its root directory to the `backend/` folder.
2. Set the build command to:

```bash
npm install
```

3. Set the start command to:

```bash
npm start
```

4. Render will automatically provide `PORT` in the environment.

The backend will then run using `process.env.PORT` for deployment compatibility.
