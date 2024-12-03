# Psychology Tests Web Application

This project is a web-based application for conducting psychology tests, with a backend to upload and manage CSV data to Google Drive using Firebase Functions. The app integrates Firebase Hosting for the frontend and Firebase Functions for backend logic.

---

## Features
- User-friendly interface for psychology tests.
- Google Drive integration for storing CSV data.
- Firebase Hosting for deploying the frontend.
- Firebase Functions for backend processing.

---

## Project Structure
```plaintext
RandomNumberAssessment/
├── public/                     # Frontend files for Firebase Hosting
│   ├── index.html              # Main HTML file
│   ├── styles.css              # Stylesheet for the application
│   ├── script.js               # JavaScript for interactivity
├── functions/                  # Firebase Functions backend
│   ├── index.js                # Main backend logic
│   ├── package.json            # Dependencies for backend
│   ├── currentKey.json         # Google Service Account Key (Do not share publicly)
├── .gitignore                  # Files and folders to exclude from Git
├── firebase.json               # Firebase project configuration
├── .firebaserc                 # Firebase project alias configuration
└── README.md                   # Project documentation
```

## Setup Instructions
### Prerequisites
1. Install Node.js (version 18 or higher recommended).
2. Install the Firebase CLI by running:
```
npm install -g firebase-tools
```
3. Set up a Firebase project on the Firebase Console.
4. Download your Firebase project credentials (service account key) and save it as functions/currentKey.json.

## Installation
1. Clone the repository:
```
git clone https://github.com/your-username/psychology-tests.git
cd RandomNumberAssessment
```
2. Install dependencies for the frontend and backend:
```
cd functions
npm install
cd ..
```
3. Initialize Firebase in the project directory:
```
firebase init
```
- Select "Hosting" and "Functions".
- Use the existing Firebase project you set up earlier.
  
4. Deploy initial configuration to Firebase:
```
firebase deploy
```

## Deployment Instructions
Update only frontend (hosting):
Run:
```
firebase deploy --only hosting
```

Update only backend (functions):
Run:
```
firebase deploy --only functions
```

Deploy both hosting and functions:
Run:
```
firebase deploy
```

## Testing the Application Locally
### Hosting
1. Run the local Firebase Hosting emulator:
```
firebase emulators:start --only hosting
```
2. Open http://localhost:5000 in your browser.

### Functions
1. Run the local Firebase Functions emulator:
```
firebase emulators:start --only functions
```
2. Send test requests using Postman or curl:
```
curl -X POST http://localhost:5001/YOUR_PROJECT_ID/us-central1/uploadCSVToDrive \
-H "Content-Type: application/json" \
-d '{"csvData": "Base64-encoded-CSV-content"}'
```

## Environment Variables
The project uses environment variables for sensitive information. Add the following variables to your .env file in the functions/ directory:
```
GOOGLE_APPLICATION_CREDENTIALS=./currentKey.json
FOLDER_ID=YourGoogleDriveFolderID
```

## License
- This project is licensed under the MIT License.




