# Dharma Treasury 

This is a Next.js starter project built by pineapple. It features a modern portal for temple donations and exploring Vedic knowledge, powered by generative AI.

## Getting Started

To run this project on your local machine, please follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 1. Installation

First, install the necessary dependencies. Navigate to the project's root directory in your terminal and run:

```bash
npm install
```
This command reads the `package.json` file and installs all the required libraries for the project.

### 2. Set Up Environment Variables

The project connects to Firebase services and Genkit AI. You will need to provide your own configuration keys.

1.  Create a new file in the root of your project directory and name it `.env`.
2.  Open the `.env` file and add the following content, replacing the placeholder values with the credentials you copied from your Firebase project settings.

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Genkit - using the same key as Firebase for simplicity
# In a production app, you might use a more restrictive key for Genkit.
GEMINI_API_KEY="your-api-key"
```

### 3. Run the Development Server

Once the installation and environment variables are set up, you can start the local development server:

```bash
npm run dev
```

This will start the Next.js application. Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### 4. Run the Genkit AI Flows

The AI features of this application are powered by Genkit. For the AI features to work, you must run the Genkit flows locally. Open a **new, separate terminal** (keep the other one running) and run:

```bash


npm run genkit:watch
```
## Project Screenshots

### Donation Form
![Donation Form](https://raw.githubusercontent.com/piyush-pine/studio/main/Projects%20Screenshot/DonationForm.png)

### Donation Report
![Donation Report](https://raw.githubusercontent.com/piyush-pine/studio/main/Projects%20Screenshot/DonationReport.png)

### Donation Successful
![Donation Successful](https://raw.githubusercontent.com/piyush-pine/studio/main/Projects%20Screenshot/DonationSuccessful.png)

### Superadmin Dashboard
![Superadmin Dashboard](https://raw.githubusercontent.com/piyush-pine/studio/main/Projects%20Screenshot/SuperadminDashboad.png)

### User Profile Dashboard
![User Profile Dashboard](https://raw.githubusercontent.com/piyush-pine/studio/main/Projects%20Screenshot/UsereprofileDashboad.png)

### Vedic Library
![Vedic Library](https://raw.githubusercontent.com/piyush-pine/studio/main/Projects%20Screenshot/VedicLibrary.png)

### Wall of Devotion
![Wall of Devotion](https://raw.githubusercontent.com/piyush-pine/studio/main/Projects%20Screenshot/WallofDevotion.png)


This will start the Genkit development server, which will watch for changes in your flow files and make them available to your Next.js application.

### Special Thanks To

- [aadityathakre](https://github.com/aadityathakre)
- [Sonichetan27](https://github.com/Sonichetan27)
- [Ayush-Daharwal](https://github.com/Ayush-Daharwal)

