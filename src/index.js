import {program} from 'commander';
import initCommand from './commands/init.js';

program
    .name('clean-auth')
    .description('Professional CLI for Fullstack Template Management')
    .version('1.0.0');

program.command('init <project-name>')
    .description('Create new project from template')
    .option('-i, --install', 'Install dependencies')
    .action(initCommand);

program.parse(process.argv);