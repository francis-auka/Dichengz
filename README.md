# Dichengz - African Fashion Reimagined

Dichengz is a modern, premium e-commerce platform dedicated to showcasing and selling high-end African fashion. Built with a focus on editorial aesthetics, performance, and a seamless user experience.

## 🚀 Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State Management**: React Context API
- **Image Optimization**: [Cloudinary](https://cloudinary.com/)

### Backend / CMS
- **Content Management**: [Sanity.io](https://www.sanity.io/)
- **Query Language**: GROQ

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/francis-auka/Dichengz.git
    cd Dichengz
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install Sanity Studio Dependencies**
    ```bash
    cd ../sanity
    npm install
    ```

## ⚙️ Configuration

### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
# Sanity Configuration
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Sanity Configuration
Ensure your `sanity/sanity.config.ts` and `sanity/sanity.cli.ts` are correctly configured with your Project ID and Dataset.

## 🏃‍♂️ Running the Project

You can run both the frontend and the CMS studio concurrently.

### 1. Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`.

### 2. Start Sanity Studio
```bash
cd sanity
npm run dev
```
The studio will be available at `http://localhost:3333`.

## 📂 Project Structure

```
Dichengz/
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (Cart, etc.)
│   │   ├── layouts/        # Page layouts (MainLayout)
│   │   ├── pages/          # Application pages (Home, Shop, Product)
│   │   ├── services/       # API services (Sanity, Cloudinary)
│   │   └── utils/          # Helper functions and animations
│   └── ...
├── sanity/                 # Sanity Studio
│   ├── schemas/            # Content schemas (Product, Category, Homepage)
│   └── ...
└── README.md               # Project Documentation
```

## 🌟 Key Features

- **Dynamic Homepage**: Hero carousel and "New Arrivals" sections are fully managed via Sanity CMS.
- **Dynamic Shop**: Categories and products are fetched dynamically from Sanity.
- **Cloudinary Integration**: Optimized image delivery using Cloudinary URLs stored in Sanity.
- **Editorial Design**: Custom animations and layout for a premium fashion feel.

## 🚀 Deployment

### Frontend
The frontend can be deployed to Vercel, Netlify, or any static hosting service.
Build command: `npm run build`
Output directory: `dist`

### Sanity Studio
Deploy the studio to Sanity's hosting:
```bash
cd sanity
npm run deploy
```

## 🤝 Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
