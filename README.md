

# My React and Node.js Project

This project is a full-stack application built with React for the frontend and Node.js for the backend. It connects to a MongoDB Atlas database and is deployed on Render.

## Development

### Running the Backend

In the `backend` directory, start the Node.js server:
```bash
npm start
```

### Running the Frontend

In the `frontend/ui` directory, start the React development server:
```bash
npm start
```

This will start the React app on `http://localhost:3000` and the backend server on `http://localhost:9000`. The proxy in the `package.json` file will forward API requests from the frontend to the backend during development.

## Deployment

### Deploying on Render

   Build Command:
   ```bash
   npm run build
   ```

   Start Command:
   ```bash
   npm run start
   ```

3. **Environment Variables**:
   - In Render, set up environment variables for your MongoDB connection string (`MONGODB_URI`) and any other necessary environment-specific settings.

## Technologies Used

- **Frontend**: React, create-react-app
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Deployment**: Render
