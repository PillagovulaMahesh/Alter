#!/bin/bash

# Project Setup for Social Media Feed

# 1. Clone the repository
echo "Cloning the repository..."
git clone https://github.com/your-username/social-media-feed.git
cd social-media-feed || exit

# 2. Install dependencies
echo "Installing dependencies..."
npm install

# 3. Set up Firebase
echo "Setting up Firebase..."
echo "Please make sure you have created a Firebase project and configured Firebase Authentication (including Google login) and Firestore."
echo "Copy your Firebase configuration from Firebase Console into 'src/firebase/config.js'."

# 4. Install and configure TailwindCSS
echo "Setting up TailwindCSS..."
npx tailwindcss init

echo "Configuring Tailwind and PostCSS..."

# 5. Set up Firebase Configuration
echo "Setting up Firebase config in src/firebase/config.js..."


# 6. Final Setup and Run
echo "Running the app..."

npm start

echo "Project setup is complete! Your app is running at http://localhost:3000"
echo "Don't forget to configure Firebase Authentication and Firestore with your credentials."
