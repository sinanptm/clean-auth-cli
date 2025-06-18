import {execa} from 'execa';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import successMessage from './successMessage.js';

const initCommand = async (projectName, options) => {
    const spinner = ora('Initializing project...').start();
    let targetDir = projectName;
    let isCurrentDir = false;

    try {
        if (projectName === '.') {
            targetDir = process.cwd();
            isCurrentDir = true;

            const existingFiles = await fs.readdir(targetDir);
            const nonHiddenFiles = existingFiles.filter(file => !file.startsWith('.'));

            if (nonHiddenFiles.length > 0) {
                throw new Error('Current directory is not empty. Please use an empty directory or specify a new project name.');
            }
        } else if (!projectName) {
            throw new Error('No project name provided. Usage: fullstack-cli init <project-name>');
        }

        if (!isCurrentDir) {
            await execa('git', [
                'clone',
                'https://github.com/sinanptm/fullstack-clean-auth-template.git',
                targetDir
            ]);
            process.chdir(targetDir);
        } else {
            await execa('git', [
                'clone',
                'https://github.com/sinanptm/fullstack-clean-auth-template.git',
                '.'
            ]);
        }

        await fs.remove('.git');
        if (options.install === true) {
            spinner.text = 'Installing dependencies...';
            await execa('pnpm', ['install']);
            spinner.succeed('Dependencies installed');
        }

        successMessage(isCurrentDir ? '.' : projectName, options);

    } catch (error) {
        spinner.fail('Project initialization failed');
        console.error(chalk.red(error.message));
        process.exit(1);
    }

    spinner.stop();
};


export default initCommand;
