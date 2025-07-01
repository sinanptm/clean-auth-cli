# Clean Auth CLI

CLI tool for scaffolding full-stack authentication projects with clean architecture.

[![npm version](https://img.shields.io/npm/v/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/clean-auth.svg)](https://www.npmjs.com/package/clean-auth)

### Documentation
https://clean-auth-template.vercel.app

### GitHub
https://github.com/sinanptm/clean-auth-template

---

## Installation

```bash
npm install -g clean-auth
```

Or use with npx:
```bash
npx clean-auth init my-project
```

## Commands

### `init` - Initialize Project

Create a new full-stack authentication project with clean architecture.

```bash
clean-auth init <project-name> [options]
```

**Options:**
- `-i, --install` - Automatically install dependencies after project creation

**Examples:**
```bash
clean-auth init my-auth-project
clean-auth init my-auth-project --install
```

### `auth-config` - Configure Authentication

Set up environment variables and authentication configuration.

```bash
clean-auth auth-config [options]
```

**Options:**
- `-s, --skip` - Skip interactive prompts and use default values

**Examples:**
```bash
clean-auth auth-config
clean-auth auth-config --skip
```

### `clean` - Clean Project Structure

Remove unnecessary parts of your project structure to customize it for your needs.

```bash
clean-auth clean [options]
```

**Options:**
- `-s, --server` - Remove entire server directory and update root configurations
- `-w, --web` - Remove entire web directory and update root configurations  
- `-o, --opensource` - Remove open source files (LICENSE, CONTRIBUTING.md, README.md)

**Examples:**
```bash
clean-auth clean --server
clean-auth clean --web --opensource
```

### `help` - Show All Commands

Display a list of all available commands.

```bash
clean-auth help
```

**Examples:**
```bash
clean-auth --help
clean-auth init --help
```

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

MIT © [sinanptm](https://github.com/sinanptm)