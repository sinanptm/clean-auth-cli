import inquirer from 'inquirer';
import fs from 'fs-extra';
import crypto from 'crypto';
import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import {checkDirectories, checkExistingEnvFiles} from './check-files.js';
import {generateWebEnvContent, generateServerEnvContent} from "./generate-env.js";

export const ENV_CONFIG = {
    webDir: 'web',
    serverDir: 'server',
    defaultPort: 8000,
    defaultAdminEmail: 'admin@example.com',
    defaultAdminPassword: 'admin1234',
};

const promptUser = () => {
    console.log(chalk.blue('\n📝 Please provide the following configuration details:\n'));

    return inquirer.prompt([
        {
            type: 'input',
            name: 'port',
            message: 'Enter server port:',
            default: ENV_CONFIG.defaultPort,
            validate: (input) => {
                const port = parseInt(input);
                if (isNaN(port)) {
                    return 'Please enter a valid number';
                }
                if (port < 1024 || port > 65535) {
                    return 'Please enter a port number between 1024 and 65535';
                }
                return true;
            },
            filter: (input) => parseInt(input)
        },
        {
            type: 'input',
            name: 'adminEmail',
            message: 'Enter admin email:',
            default: ENV_CONFIG.defaultAdminEmail,
            validate: (input) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(input) ? true : 'Please enter a valid email address';
            },
        },
        {
            type: 'password',
            name: 'adminPassword',
            message: 'Enter admin password:',
            default: ENV_CONFIG.defaultAdminPassword,
            validate: (input) => {
                return input.length >= 4 ? true : 'Password must be at least 4 characters long';
            },
            mask: '*'
        },
    ]);
}

const createEnvFiles = async (answers) => {
    const webEnvPath = path.join(ENV_CONFIG.webDir, '.env');
    const serverEnvPath = path.join(ENV_CONFIG.serverDir, '.env');

    // Generate JWT secrets
    const accessTokenSecret = crypto.randomBytes(32).toString('hex');
    const refreshTokenSecret = crypto.randomBytes(32).toString('hex');

    const results = {
        web: null,
        server: null,
        webPath: webEnvPath,
        serverPath: serverEnvPath
    };

    // Create web .env file (only if web directory exists)
    try {
        const webDirExists = await fs.pathExists(ENV_CONFIG.webDir);
        if (webDirExists) {
            const webContent = generateWebEnvContent(answers.port);
            await fs.writeFile(webEnvPath, webContent, {encoding: 'utf8'});
            results.web = 'created';
        } else {
            results.web = 'skipped - web directory not found';
        }
    } catch (error) {
        results.web = `error: ${error.message}`;
    }

    // Create server .env file
    try {
        // Ensure server directory exists
        await fs.ensureDir(ENV_CONFIG.serverDir);
        const serverContent = generateServerEnvContent(answers, accessTokenSecret, refreshTokenSecret);
        await fs.writeFile(serverEnvPath, serverContent, {encoding: 'utf8'});
        results.server = 'created';
    } catch (error) {
        results.server = `error: ${error.message}`;
    }

    return results;
}

const authConfigCommand = async () => {
    console.log(chalk.blue.bold('\n🔐 Auth Configuration Setup\n'));

    try {
        // Check for required directories
        console.log(chalk.gray('Checking project structure...'));
        const missingDirs = await checkDirectories([ENV_CONFIG.webDir, ENV_CONFIG.serverDir]);

        if (missingDirs.length > 0) {
            console.log(chalk.yellow(`\nWarning: Missing directories: ${missingDirs.join(', ')}`));
            if (missingDirs.includes(ENV_CONFIG.serverDir)) {
                console.log(chalk.blue('Creating server directory...'));
                await fs.ensureDir(ENV_CONFIG.serverDir);
            }
        }

        // Check for existing .env files
        const webEnvPath = path.join(ENV_CONFIG.webDir, '.env');
        const serverEnvPath = path.join(ENV_CONFIG.serverDir, '.env');

        const proceed = await checkExistingEnvFiles([webEnvPath, serverEnvPath]);
        if (!proceed) {
            console.log(chalk.yellow('\n❌ Operation cancelled by user.'));
            return;
        }

        // Get user input
        const answers = await promptUser();

        // Create environment files
        const spinner = ora('Creating environment files...').start();

        try {
            const results = await createEnvFiles(answers);

            spinner.succeed('Environment files processed!');

            // Display results
            console.log(chalk.green.bold('\n✅ Configuration completed!\n'));
            console.log(chalk.gray('——————————————————————————————————————————'));

            if (results.web === 'created') {
                console.log(chalk.green(`✓ Web .env file: ${results.webPath}`));
            } else if (results.web && results.web.startsWith('error')) {
                console.log(chalk.red(`✗ Web .env file: ${results.web}`));
            } else {
                console.log(chalk.yellow(`⚠ Web .env file: ${results.web}`));
            }

            if (results.server === 'created') {
                console.log(chalk.green(`✓ Server .env file: ${results.serverPath}`));
            } else {
                console.log(chalk.red(`✗ Server .env file: ${results.server}`));
            }

            console.log(chalk.gray('——————————————————————————————————————————'));
            console.log(chalk.blue.bold('\n📋 Next steps:'));
            console.log(chalk.cyan('1. Update Firebase configuration in both .env files'));
            console.log(chalk.cyan('2. Configure MongoDB connection string in server/.env'));
            console.log(chalk.cyan('3. Set up email service credentials in server/.env'));
            console.log(chalk.cyan('4. Update Firebase Admin SDK details in server/.env'));
            console.log(chalk.green.bold('\n🚀 Configuration ready!\n'));

        } catch (error) {
            spinner.fail('Failed to create environment files');
            throw error;
        }

    } catch (error) {
        console.error(chalk.red.bold('\n❌ Error:'), chalk.red(error.message));
        console.log(chalk.gray('\nPlease check your project structure and try again.'));
        process.exit(1);
    }
}

export default authConfigCommand;