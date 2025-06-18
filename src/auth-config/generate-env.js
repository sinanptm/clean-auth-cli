export const generateWebEnvContent = (port) => {
    return `# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:${port}

# Firebase Configuration (Please update with your Firebase project details)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
`;
}

export const generateServerEnvContent = ({port, adminEmail, adminPassword}, accessTokenSecret, refreshTokenSecret) => {
    return `# Database (Please update with your MongoDB connection string)
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>

# Server Configuration
PORT=${port}
NODE_ENV=development

# JWT Secrets
ACCESS_TOKEN_SECRET=${accessTokenSecret}
REFRESH_TOKEN_SECRET=${refreshTokenSecret}

# Email Configuration (Please update with your email service credentials)
SENDER_EMAIL=your-email@example.com
NODEMAILER_PASSKEY=your-email-app-password

# Admin Credentials
ADMIN_MAIL=${adminEmail}
ADMIN_PASSWORD=${adminPassword}

# Firebase (Server-side, please update with your Firebase Admin SDK details)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@example.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your-private-key>\n-----END PRIVATE KEY-----\n"
`;
}
