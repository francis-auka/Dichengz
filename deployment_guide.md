# Deployment Guide

This guide covers how to host the Dichengz application components:
1.  **Frontend**: Hosted on **Vercel**.
2.  **Backend API**: Hosted on **Render**.
3.  **Database**: **MongoDB Atlas**.
4.  **CMS**: **Sanity** (Managed).

---

## 1. MongoDB Atlas (Database)

1.  **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2.  **Create Cluster**: Create a new free cluster (M0 Sandbox).
3.  **Create User**: In "Database Access", create a database user (e.g., `admin`) and password. **Save this password.**
4.  **Network Access**: In "Network Access", add IP Address `0.0.0.0/0` (Allow Access from Anywhere) to allow Render to connect.
5.  **Get Connection String**:
    *   Click "Connect" > "Drivers".
    *   Copy the connection string (e.g., `mongodb+srv://admin:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    *   Replace `<password>` with your actual password.

---

## 2. Backend API (Render)

1.  **Create Account**: Go to [Render](https://render.com/) and sign up with GitHub.
2.  **New Web Service**: Click "New" > "Web Service".
3.  **Connect Repo**: Select your GitHub repository (`Dichengz`).
4.  **Configure Service**:
    *   **Name**: `dichengz-api` (or similar)
    *   **Root Directory**: `server`
    *   **Runtime**: Node
    *   **Build Command**: `npm install`
    *   **Start Command**: `npm start` (Ensure `tsx` is in dependencies or use `node` if compiled)
        *   *Note*: Since we are using `tsx` in `start` script, ensure `tsx` is installed. It is currently in `devDependencies`. You may need to move it to `dependencies` in `server/package.json` or set `NPM_CONFIG_PRODUCTION=false` in environment variables.
5.  **Environment Variables**:
    *   Add `MONGO_URI`: Paste your MongoDB connection string.
    *   Add `PORT`: `10000` (or leave default, Render sets this automatically).
6.  **Deploy**: Click "Create Web Service".

---

## 3. Frontend (Vercel)

1.  **Create Account**: Go to [Vercel](https://vercel.com/) and sign up with GitHub.
2.  **Add New Project**: Click "Add New..." > "Project".
3.  **Import Repo**: Import `Dichengz`.
4.  **Configure Project**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: `frontend` (Click "Edit" next to Root Directory and select `frontend`).
5.  **Environment Variables**:
    *   Copy all variables from your local `frontend/.env` file.
    *   `VITE_SANITY_PROJECT_ID`: Your Sanity Project ID.
    *   `VITE_SANITY_DATASET`: `production`
    *   `VITE_SANITY_API_VERSION`: `2023-05-03`
    *   `VITE_SANITY_TOKEN`: (Optional, usually not needed for public read).
    *   `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
    *   `VITE_API_URL`: `https://dichengz.onrender.com`
6.  **Deploy**: Click "Deploy".

---

## 4. Sanity CORS Configuration

1.  Go to [Sanity Manage](https://www.sanity.io/manage).
2.  Select your project.
3.  Go to **API** > **CORS Origins**.
4.  Add your Vercel frontend URL: `https://dichengz.vercel.app`
5.  Allow credentials if needed.

---

## 5. Pushing Changes

To push your latest code to GitHub (which triggers deployments):

```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```
