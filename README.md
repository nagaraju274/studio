# pet-guide: AI-Powered Pet Analysis

**pet-guide** is a modern web application built with Next.js that uses the power of Google's Generative AI to provide insightful analysis about your pets. Simply upload a photo or video, and our AI will help you understand your pet's breed, estimate their age, analyze their behavior, and offer personalized care advice through an interactive chatbot.

![Pet Guide Dashboard](https://placehold.co/800x450.png)

## ✨ Features

-   **Breed & Age Detection**: Upload a photo of your pet, and the AI will identify the most likely breed and provide an estimated age range, along with typical life span and common health issues.
-   **Behavior Analysis**: Upload a short video to get an AI-powered analysis of your pet's behavior, helping you understand their actions and needs better.
-   **Personalized Behavioral Insights**: Receive detailed information on how the identified breed typically interacts with children, adults, the elderly, family members, and strangers.
-   **PetGuide AI Chat**: Engage with an intelligent chatbot that has context about your pet's analysis. Ask questions and get tailored pet care advice.
-   **Secure Authentication**: Easy and secure sign-in with Google, powered by Firebase Authentication.
-   **Analysis History**: Keep track of all your past analyses to review at any time.
-   **Responsive Design**: A clean, modern, and fully responsive user interface built with ShadCN UI and Tailwind CSS.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
-   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Deployment**: [Firebase App Hosting](https://firebase.google.com/docs/app-hosting), [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/)

## 🔧 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   [Node.js](https://nodejs.org/en) (v20 or later)
-   [npm](https://www.npmjs.com/) (or a compatible package manager like yarn or pnpm)
-   A [Firebase Project](https://console.firebase.google.com/) with Authentication enabled.
-   A [Google AI API Key](https://ai.google.dev/gemini-api/docs/api-key).

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pet-guide
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project by copying the `.env` file:

```bash
cp .env .env.local
```

Now, open `.env.local` and add your Firebase project configuration and Google AI API key. You can find your Firebase config in your Firebase project settings under "Your apps".

```env
# Google AI API Key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Firebase App Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_FIREBASE_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_FIREBASE_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_FIREBASE_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_FIREBASE_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_FIREBASE_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_FIREBASE_APP_ID"
```

### 4. Authorize Domains in Firebase

**This is a critical step for authentication to work.**

1.  Go to the [Firebase Console](https://console.firebase.google.com/) and navigate to your project.
2.  Go to **Authentication** > **Settings** > **Authorized domains**.
3.  Click **Add domain** and add `localhost` for local development.

### 5. Run the Development Server

You can now start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

### 6. Start the Genkit Development Server

For the AI features to work, you need to run the Genkit server in a separate terminal:

```bash
npm run genkit:watch
```

This will start the Genkit development UI, which you can use to inspect and debug your AI flows.

## 🚀 Deployment

This application can be deployed to any platform that supports Next.js, such as Firebase App Hosting, Netlify, or Vercel.

### Deploying with Netlify

1.  **Push to a Git repository** (GitHub, GitLab, Bitbucket).
2.  Go to your [Netlify dashboard](https://app.netlify.com/) and click "Add new site" -> "Import an existing project".
3.  Connect to your Git provider and select your repository.
4.  Netlify should automatically detect that this is a Next.js project and set the build command to `next build` and the publish directory to `.next`.
5.  Before deploying, you must set your environment variables. Go to **Site settings** > **Build & deploy** > **Environment**. Add the following variables:
    -   `GEMINI_API_KEY`
    -   `NEXT_PUBLIC_FIREBASE_API_KEY`
    -   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    -   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    -   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    -   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    -   `NEXT_PUBLIC_FIREBASE_APP_ID`
6.  Click **Deploy site**.
7.  **Authorize Production Domain**: After your first successful deployment, Netlify will give you a production URL (e.g., `your-app-name.netlify.app`). You **must** add this URL to the "Authorized domains" list in your Firebase Authentication settings, as described in Step 4.


### Deploying with Firebase App Hosting

1.  **Set Environment Secrets**: Before deploying, you must set your environment variables as secrets in App Hosting. This is more secure than committing them in your `.env` files.
    ```bash
    firebase apphosting:secrets:set GEMINI_API_KEY
    firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_API_KEY
    firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_PROJECT_ID
    firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_APP_ID
    ```
    When prompted, paste the corresponding value for each secret.

2.  **Authorize Production Domain**: After your first successful deployment, App Hosting will give you a production URL (e.g., `your-app-name.apphosting.dev`). You **must** add this URL to the "Authorized domains" list in your Firebase Authentication settings, as described in Step 4.


## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
