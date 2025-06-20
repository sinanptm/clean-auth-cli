# Clean Auth CLI

CLI tool for scaffolding full-stack authentication projects with clean architecture.

[![npm version](https://img.shields.io/npm/v/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)

## Installation

```bash
npm install -g clean-auth
```

Or use with npx:
```bash
npx clean-auth init my-project
```

## Usage

### Create a new project

```bash
clean-auth init <project-name> [options]
```

Options:
- `-i, --install` - Automatically install dependencies

```bash
# Basic project creation
clean-auth init my-auth-project

# Create and install dependencies
clean-auth init my-auth-project --install
```

### Configure environment variables

```bash
clean-auth auth-config
```

Interactive setup for:
- Database connection (MongoDB)
- JWT secrets and token configuration
- Email service (SMTP) for OTP delivery
- Firebase OAuth configuration
- Admin credentials
- CORS and security settings

## What's Included

The generated project includes:
- Clean architecture implementation
- JWT-based authentication
- Email OTP verification
- Firebase OAuth integration
- Admin panel
- MongoDB integration
- Next.js frontend
- Express.js backend

## Development

After project creation:

```bash
cd my-auth-project

# Configure environment
clean-auth auth-config

# Start development servers
pnpm dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Firebase project with Authentication enabled

## Documentation

- [Full Documentation](https://full-stack-clean-auth-template.vercel.app/)
- [GitHub Repository](https://github.com/sinanptm/fullstack-clean-auth-template)

## License

MIT © [Sinan PTM](https://github.com/sinanptm)