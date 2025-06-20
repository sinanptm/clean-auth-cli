# Full Stack Clean Auth CLI

CLI tool for scaffolding full-stack authentication projects with clean architecture.

[![npm version](https://img.shields.io/npm/v/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)

### Documentation
https://full-stack-clean-auth-template.vercel.app/

### GitHub
https://github.com/sinanptm/fullstack-clean-auth-template

---

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
clean-auth auth-config [options]
```

Options:
- `-s, --skip` - Skip the prompts and use default values for environment configuration.

## Development

After project creation:

```bash
cd my-auth-project

# Configure environment variables with prompts
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


## License

MIT © [Sinan](https://github.com/sinanptm)