import {program} from 'commander';
import initCommand from './init/index.js';
import authConfigCommand from './auth-config/index.js';
import cleanCommand from './clean/index.js';
import helpCommand from './help/help.js';

program
    .name('clean-auth')
    .description('Professional CLI for Fullstack Template Management')
    .version('1.0.7');

program.command("help")
    .description('Show help for all commands')
    .action(helpCommand);

program.command('init <project-name>')
    .alias('i')
    .description('Create new project from template')
    .option('-i, --install', 'Install dependencies')
    .action(initCommand);

program.command('auth-config')
    .description('Configure environment files for server and client')
    .option('-s, --skip', 'Skip the prompts and use default values')
    .action(authConfigCommand);

program.command('clean')
    .description('Clean project files and directories')
    .option('-s, --server', 'Remove entire server directory and update root configs')
    .option('-w, --web', 'Remove entire web directory and update root configs')
    .option('-o, --opensource', 'Remove open source files (LICENSE, CONTRIBUTING.md, README.md)')
    .action(cleanCommand);

program.parse(process.argv);