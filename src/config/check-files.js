import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';


export const checkDirectories = async (directories) => {
    const missingDirs = [];
    for (const dir of directories) {
        try {
            const exists = await fs.pathExists(dir);
            if (!exists) missingDirs.push(dir);
        } catch (error) {
            console.error(chalk.red(`Error checking directory ${dir}: ${error.message}`));
            missingDirs.push(dir);
        }
    }
    return missingDirs;
}

export const checkExistingEnvFiles = async (envPaths) => {
    const existingFiles = [];
    for (const envPath of envPaths) {
        try {
            if (await fs.pathExists(envPath)) {
                existingFiles.push(envPath);
            }
        } catch (error) {
            console.error(chalk.yellow(`Warning: Could not check ${envPath}: ${error.message}`));
        }
    }

    if (existingFiles.length > 0) {
        console.log(chalk.yellow(`\nFound existing .env files: ${existingFiles.join(', ')}`));
        const {overwrite} = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: 'Do you want to overwrite the existing .env files?',
                default: false,
            },
        ]);
        return overwrite;
    }
    return true;
}