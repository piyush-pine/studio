Here's an enhanced README file tailored for your hackathon project with the team name "Team VedX," incorporating a structured, professional, and inviting format, while also keeping your given content and screenshots:

***

# Dharma Treasury

**Hackathon Project by Team VedX**

A modern Next.js starter project built by pineapple that features a portal for temple donations and exploring Vedic knowledge, powered by generative AI.

***

## Table of Contents

- [About The Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Screenshots](#project-screenshots)
- [Team VedX Members](#team-vedx-members)
- [Contributing](#contributing)
- [License](#license)

***

## About The Project

Dharma Treasury aims to provide a seamless platform for temple donations along with a rich repository of Vedic knowledge. The application leverages generative AI for enhanced user experience and is designed to democratize spiritual engagement in a tech-savvy manner.

***

## Tech Stack

- Next.js (React Framework)
- Firebase (Authentication, Database, Storage)
- Genkit AI (Generative AI Flows)
- TypeScript

***

## Getting Started

Follow the instructions below to set up and run this project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)

### Installation

1. Clone the repository and enter the project directory.
2. Install dependencies by running:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory with your Firebase and Genkit API credentials:

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"

# Genkit
GEMINI_API_KEY="your-api-key"
```

### Running the Project

Start the frontend development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

In a separate terminal, run the Genkit AI flow watcher:

```bash
npm run genkit:watch
```

***

## Project Screenshots

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


 created with the passion and dedication of the following team members:

- [Piyush Pine](https://github.com/piyush-pine) – Project Lead & Developer (Blockchain Part)  
- [aadityathakre](https://github.com/aadityathakre) – Developer & Collaborator (Database + Backend)  
- [Sonichetan27](https://github.com/Sonichetan27) – Developer & Collaborator (Frontend Design Part)  
- [Ayush-Daharwal](https://github.com/Ayush-Daharwal) – Developer & Collaborator (Database + Backend)  

Thanks to all team members for their incredible efforts! 🚀

***

## Contributing

Contributions are welcome! If you would like to contribute, please fork this repository, make your changes, and submit a pull request. Feel free to open issues to report bugs or suggest features.

***

## License

Distributed under the MIT License. See `LICENSE` for more information.

***
