# Dharma Treasury - A Firebase Studio Project

This is a Next.js starter project built in Firebase Studio. It features a modern portal for temple donations and exploring Vedic knowledge, powered by generative AI.

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

The project connects to Firebase services. You will need to provide your own Firebase project configuration.

1. Rename the `.env.local.example` file to `.env.local`.
2. Open the `.env.local` file and fill in the configuration values from your Firebase project's web app settings.

_Note: The `dev` script for Genkit also uses these variables._

### 3. Run the Development Server

Once the installation is complete, you can start the local development server:

```bash
npm run dev
```

This will start the Next.js application in development mode with Turbopack. Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

### 4. Run the Genkit AI Flows

The AI features of this application are powered by Genkit. To run the Genkit flows locally (which is necessary for the AI features to work), open a **separate terminal** and run:

```bash
npm run genkit:watch
```

This will start the Genkit development server, which will watch for changes in your flow files.