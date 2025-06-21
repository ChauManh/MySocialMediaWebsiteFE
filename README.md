# MT Social Media

A modern social media web application built with React and Vite.

## 🚀 Features

- User authentication (Sign up, Sign in)
- Responsive UI for desktop and mobile
- User profile with avatar and background customization
- Friend system (send/cancel/accept/deny friend requests, unfriend)
- Post creation with image/video upload
- Like, comment, and save posts
- Real-time chat with friends
- Notification system (friend requests, likes, comments)
- Search users and posts
- Saved posts management
- Recent search history

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, SCSS Modules, Bootstrap 5, Bootstrap Icons, classnames
- **State Management:** React Context API
- **Networking:** Axios
- **Real-time:** Socket.io (via backend)
- **Notifications:** react-hot-toast
- **Other:** Tippy.js (tooltips), normalize.css

## ⚙️ Setup & Development

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd mySocialMedia
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Environment variables:**
   - Copy `.env.example` to `.env` and update as needed (if provided).

4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Linting

```sh
npm run lint
```

## 🐳 Docker

To build and run with Docker:

```sh
docker build -t mysocialmedia .
docker run -p 80:80 mysocialmedia
```

## 📁 Project Structure

- `src/` - Main source code
  - `components/` - Reusable UI components
  - `pages/` - Page-level components
  - `layout/` - Layout components
  - `contexts/` - React context providers
  - `services/` - API service modules
  - `utils/` - Utility functions
  - `assets/` - Images and static assets

## 📄 License

This project is for educational/demo purposes.

---

Feel free to contribute or open issues!