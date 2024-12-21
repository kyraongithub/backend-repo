Okay, here's the README.md draft in English:

Markdown

# Backend Repo

## Getting Started

1. **Install dependencies:**
Markdown

# Backend Repo

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install


2. **Add Firebase Service Account:**
- Go to your Firebase console and select your project.
- Navigate to Project settings.
- In the Service accounts tab, click Generate new private key.
- Download the JSON file.
- Place the file in the project root (same level as package.json).
- IMPORTANT: Rename the file to firebase.key.json. This file contains the configuration needed to initialize the Firebase Admin SDK.


3. **Running the Application:**
Development mode:

Bash

npm run dev
This command will run the backend application in development mode with nodemon, which will automatically restart the server when code changes are made.

Firebase Emulator:

Bash

npm run firebase
This command will run the Firebase Emulator Suite. Make sure the emulator is running before running the backend application in development mode.

Additional Documentation
Firebase Admin SDK Documentation
Firebase Emulator Suite Documentation


Contributors
Kyra
