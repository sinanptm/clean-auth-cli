<div align="center">

# Clean Auth CLI

**Professional CLI tool for managing Full-Stack Authentication Template projects**

[![npm version](https://img.shields.io/npm/v/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Downloads](https://img.shields.io/npm/dm/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)

*Streamline your development workflow with automated project setup and configuration*

</div>

---

## 📖 Overview

Clean Auth CLI is a powerful command-line tool that helps developers quickly scaffold and configure production-ready authentication systems based on the [Full-Stack Clean Auth Template](https://github.com/sinanptm/fullstack-clean-auth-template). Built with clean architecture principles, it provides an effortless way to create scalable web applications with robust authentication flows.

### 📚 Complete Documentation & Resources

For detailed information about the template architecture, features, and implementation:

- **📖 Full Documentation**: [https://full-stack-clean-auth-template.vercel.app/](https://full-stack-clean-auth-template.vercel.app/)
- **🔗 GitHub Repository**: [https://github.com/sinanptm/fullstack-clean-auth-template](https://github.com/sinanptm/fullstack-clean-auth-template)
- **🐛 Issues & Support**: [GitHub Issues](https://github.com/sinanptm/fullstack-clean-auth-template/issues)

## 🚀 Quick Start

### Installation

```bash
# Install globally
npm install -g clean-auth

# Or use with npx (recommended)
npx clean-auth init my-auth-app
```

### Create Your First Project

```bash
# Create a new project
clean-auth init my-awesome-app

# Create with automatic dependency installation
clean-auth init my-awesome-app --install

# Navigate to your project
cd my-awesome-app

# Configure environment variables
clean-auth auth-config
```

---

## 📋 Commands

### `init <project-name>`

Creates a new project from the Full-Stack Clean Auth Template.

```bash
clean-auth init <project-name> [options]
```

**Options:**
- `-i, --install` - Automatically install dependencies after project creation

**Example:**
```bash
# Basic project creation
clean-auth init my-auth-project

# Create and install dependencies
clean-auth init my-auth-project --install
```

**What it does:**
- 📁 Creates project directory structure
- 📦 Copies all template files
- 🔧 Sets up development environment
- 📚 Provides setup instructions
- ⚡ Optionally installs all dependencies

---

### `auth-config`

Interactive configuration wizard for setting up environment variables.

```bash
clean-auth auth-config
```

**What it configures:**
- 🔐 **Authentication Settings** - JWT secrets, token expiration
- 📧 **Email Configuration** - SMTP settings for OTP delivery
- 🔥 **Firebase Setup** - OAuth provider configuration
- 🗄️ **Database Connection** - MongoDB connection strings
- 👑 **Admin Credentials** - Admin panel access configuration
- 🌐 **Environment Variables** - Development and production settings

**Interactive prompts include:**
- Database connection URLs
- Email service credentials
- Firebase project configuration
- Admin login credentials
- JWT secret generation
- CORS and security settings



---

## 🛠️ Prerequisites

Before using Clean Auth CLI, ensure you have:

- **Node.js** v18.0.0 or higher
- **pnpm** v10.8.1 or higher (recommended) or npm/yarn
- **MongoDB** (local installation or MongoDB Atlas)
- **Firebase Project** with Authentication enabled

---

## ⚡ Development Workflow

After project creation, follow these steps:

### 1. Environment Setup
```bash
# Configure environment variables
clean-auth auth-config

# Or manually create .env files in server/ and web/ directories
```

### 2. Start Development
```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm --prefix server dev    # Backend: http://localhost:8000
pnpm --prefix web dev       # Frontend: http://localhost:3000
```

### 3. Available Scripts
```bash
pnpm dev          # Start development servers
pnpm build        # Build for production
pnpm test         # Run test suites
pnpm lint         # Lint codebase
pnpm format       # Format code
```

---

## 🔧 Configuration

### Environment Variables

The CLI helps you configure these essential environment variables:

#### Server Configuration
- `MONGODB_URI` - Database connection string
- `JWT_ACCESS_SECRET` - JWT access token secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `NODEMAILER_EMAIL` - Email service credentials
- `FIREBASE_PROJECT_ID` - Firebase project settings
- `ADMIN_EMAIL` - Admin panel access

#### Client Configuration
- `NEXT_PUBLIC_SERVER_URL` - Backend API URL
- `NEXT_PUBLIC_FIREBASE_CONFIG` - Firebase client configuration



---

## 🔄 Updates & Maintenance

Keep your CLI tool updated:

```bash
# Check current version
clean-auth --version

# Update to latest version
npm update -g clean-auth
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Add** tests if applicable
5. **Submit** a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sinanptm/fullstack-clean-auth-template/blob/main/LICENSE) file for details.

---

## 🆘 Support & Community

- **🐛 Bug Reports**: [GitHub Issues](https://github.com/sinanptm/fullstack-clean-auth-template/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/sinanptm/fullstack-clean-auth-template/discussions)
- **📧 Email Support**: Contact through GitHub

---

<div align="center">

### ⭐ Star the project if it helped you!

[![GitHub stars](https://img.shields.io/github/stars/sinanptm/fullstack-clean-auth-template?style=social)](https://github.com/sinanptm/fullstack-clean-auth-template)

**Made with ❤️ for developers who value clean architecture and security**

---

*Ready to build your next authentication system? Start with `npx clean-auth init my-project`*

</div>