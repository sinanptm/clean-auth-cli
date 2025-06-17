import chalk from 'chalk';

export const successMessage = (projectName, options) => {
    const isCurrentDir = projectName === '.';
    const projectDisplay = isCurrentDir ? 'current directory' : chalk.bold(projectName);
    const cdCommand = isCurrentDir ? '' : `\n${chalk.cyan('→')} Change directory: ${chalk.bold(`cd ${projectName}`)}`;
    const installCommand = options.install ? '' : `\n${chalk.cyan('→')} Install dependencies: ${chalk.bold('pnpm install')}`;
    const devCommand = `\n${chalk.cyan('→')} Start development: ${chalk.bold('pnpm dev')}`;
    const urls = `\n${chalk.cyan('→')} Application URLs:
     Frontend: ${chalk.underline('http://localhost:3000')}
     Backend:  ${chalk.underline('http://localhost:8000')}`;

    console.log(`
${chalk.green.bold('✔ Project successfully initialized!')}
${chalk.gray('——————————————————————————————————————————')}
${chalk.cyan('Project location:')} ${projectDisplay}
${cdCommand}
${installCommand}
${devCommand}
${urls}
${chalk.gray('——————————————————————————————————————————')}
${chalk.blue('Next steps:')}
${chalk.cyan('→')} Configure environment variables in ${chalk.bold('.env')} files
${chalk.cyan('→')} Customize the template to fit your needs

${chalk.yellow.bold('Happy coding! 🚀')}
`);
};