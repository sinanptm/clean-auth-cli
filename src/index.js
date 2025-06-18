import {program} from 'commander';
import initCommand from './init/index.js';
import authConfigCommand from './auth-config/index.js';

program
    .name('clean-auth')
    .description('Professional CLI for Fullstack Template Management')
    .version('1.0.0');

program.command('init <project-name>')
    .description('Create new project from template')
    .option('-i, --install', 'Install dependencies')
    .action(initCommand);

program.command('auth-config')
    .description('Configure environment files for server and client')
    .action(authConfigCommand);

program.parse(process.argv);