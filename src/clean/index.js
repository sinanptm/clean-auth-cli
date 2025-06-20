import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import updateRootPackageJson from './update-package.js';
import updateWorkspaceConfig from './update-workpspace.js';
import {removeDirectory, removeOpenSourceFiles} from './remove.js';

const confirmAction = async (message) => {
    const {confirm} = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message,
            default: false
        }
    ]);

    return confirm;
};

const cleanCommand = async (options) => {
    // Check if no options provided
    const hasOptions = options.server || options.web || options.opensource;

    if (!hasOptions) {
        console.log(chalk.red.bold('❌ No clean option specified!\n'));
        console.log(chalk.yellow('Available options:'));
        console.log(chalk.cyan('  --s, -server      Remove entire server directory and update root configs'));
        console.log(chalk.cyan('  --w, -web         Remove entire web directory and update root configs'));
        console.log(chalk.cyan('  --o, -opensource  Remove open source files (LICENSE, CONTRIBUTING.md, README.md)'));
        return;
    }

    const operations = [];
    const removedDirs = [];

    try {

        // Remove server directory
        if (options.server) {
            const confirm = await confirmAction('Are you sure you want to remove the entire server directory? This action cannot be undone!');
            if (confirm) {
                operations.push({
                    type: 'server',
                    action: () => removeDirectory('server')
                });
                removedDirs.push('server');
            }
        }

        // Remove web directory
        if (options.web) {
            const confirm = await confirmAction('Are you sure you want to remove the entire web directory? This action cannot be undone!');
            if (confirm) {
                operations.push({
                    type: 'web',
                    action: () => removeDirectory('web')
                });
                removedDirs.push('web');
            }
        }

        // Remove open source files
        if (options.opensource) {
            const confirm = await confirmAction('Are you sure you want to remove open source files (LICENSE, CONTRIBUTING.md, README.md)?');
            if (confirm) {
                operations.push({
                    type: 'opensource',
                    action: () => removeOpenSourceFiles()
                });
            }
        }

        if (operations.length === 0) {
            console.log(chalk.yellow('\n❌ No operations confirmed. Exiting.'));
            return;
        }

        const spinner = ora('Performing clean operations...').start();

        const results = {};

        // Execute operations
        for (const operation of operations) {
            try {
                results[operation.type] = await operation.action();
            } catch (error) {
                results[operation.type] = `error: ${error.message}`;
            }
        }

        // Update root configuration files if directories were removed
        if (removedDirs.length > 0) {
            spinner.text = 'Updating root configuration files...';
            await updateRootPackageJson(removedDirs);
            await updateWorkspaceConfig(removedDirs);
        }

        spinner.succeed('Clean operations completed!');

        // Display results
        console.log(chalk.green.bold('\n✅ Clean operations completed!\n'));
        console.log(chalk.gray('——————————————————————————————————————————'));

        if (results.server !== undefined) {
            if (results.server) {
                console.log(chalk.green('✓ Server directory removed'));
            } else {
                console.log(chalk.yellow('⚠ Server directory not found'));
            }
        }

        if (results.web !== undefined) {
            if (results.web) {
                console.log(chalk.green('✓ Web directory removed'));
            } else {
                console.log(chalk.yellow('⚠ Web directory not found'));
            }
        }

        if (results.opensource !== undefined) {
            console.log(chalk.green('✓ Open source files processed:'));
            results.opensource.forEach(({file, status}) => {
                if (status === 'removed') {
                    console.log(chalk.green(`  ✓ ${file} removed`));
                } else if (status === 'not found') {
                    console.log(chalk.yellow(`  ⚠ ${file} not found`));
                } else {
                    console.log(chalk.red(`  ✗ ${file}: ${status}`));
                }
            });
        }

        if (removedDirs.length > 0) {
            console.log(chalk.green('✓ Root configuration files updated'));
        }

        console.log(chalk.gray('——————————————————————————————————————————'));
        console.log(chalk.green.bold('\n🎉 Clean process completed successfully!\n'));

    } catch (error) {
        console.error(chalk.red.bold('\n❌ Error during clean process:'), chalk.red(error.message));
        process.exit(1);
    }
};

export default cleanCommand;