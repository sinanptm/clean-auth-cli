import chalk from 'chalk';

const helpCommand = () => {
    console.log(chalk.cyan.bold('\n🚀 Full Stack Clean Auth CLI\n'));

    console.log(chalk.yellow.bold('Documentation: ') + chalk.white('https://full-stack-clean-auth-template.vercel.app/'));
    console.log(chalk.yellow.bold('GitHub: ') + chalk.white('https://github.com/sinanptm/fullstack-clean-auth-template\n'));

    console.log(chalk.yellow.bold('USAGE:'));
    console.log(chalk.white('  clean-auth <command> [options]\n'));

    console.log(chalk.yellow.bold('COMMANDS:'));
    console.log(chalk.gray('——————————————————————————————————————————————————————————————————————————————'));

    // Init command
    console.log(chalk.green.bold('  init') + chalk.white(' <project-name>'));
    console.log(chalk.gray('    Create a new full-stack authentication project'));
    console.log(chalk.cyan('    Options:'));
    console.log(chalk.cyan('      -i, --install    Automatically install dependencies'));

    // Auth-config command
    console.log(chalk.green.bold('  auth-config'));
    console.log(chalk.gray('    Configure environment variables and authentication settings'));
    console.log(chalk.cyan('    Options:'));
    console.log(chalk.cyan('      -s, --skip       Skip prompts and use default values'));

    // Clean command
    console.log(chalk.green.bold('  clean'));
    console.log(chalk.gray('    Remove unnecessary parts of your project structure'));
    console.log(chalk.cyan('    Options:'));
    console.log(chalk.cyan('      -s, --server     Remove entire server directory'));
    console.log(chalk.cyan('      -w, --web        Remove entire web directory'));
    console.log(chalk.cyan('      -o, --opensource Remove open source files'));

    // Help command
    console.log(chalk.green.bold('  help'));
    console.log(chalk.gray('    Show this help message'));

    console.log(chalk.gray('——————————————————————————————————————————————————————————————————————————————'));

    console.log(chalk.yellow.bold('GLOBAL OPTIONS:'));
    console.log(chalk.cyan('  -h, --help       Show help information'));
    console.log('');

    console.log(chalk.yellow.bold('EXAMPLES:'));
    console.log(chalk.white('  clean-auth init my-project --install'));
    console.log(chalk.white('  clean-auth auth-config'));
    console.log(chalk.white('  clean-auth clean --server --opensource'));
    console.log(chalk.white('  clean-auth help'));
    console.log('');
};

export default helpCommand;