
const successMessage = (projectName, options) => {
    const installCommand = options.install ? '' : `\n${chalk.cyan('→')} Install dependencies: ${chalk.bold('pnpm install')}`;
    const devCommand = `\n${chalk.cyan('→')} Start development: ${chalk.bold('pnpm dev')}`;
    const configCommand = `\n${chalk.cyan('→')} Configure environment: ${chalk.bold('pnpm auth-config')}`;
    const helpCommand = `\n${chalk.cyan('→')} View all commands: ${chalk.bold('pnpm auth-help')}`;
    const urls = `\n${chalk.cyan('→')} Application URLs:
     Frontend: ${chalk.underline('http://localhost:3000')}
     Backend:  ${chalk.underline('http://localhost:8000')}`;

    console.log(`
${chalk.green.bold('✔ Project successfully initialized!')}
${chalk.gray('——————————————————————————————————————————')}
${installCommand}
${devCommand}
${configCommand}
${helpCommand}
${urls}
${chalk.gray('——————————————————————————————————————————')}
${chalk.blue('Next steps:')}
${chalk.cyan('→')} Configure environment variables in ${chalk.bold('.env')} files
${chalk.cyan('→')} Customize the template to fit your needs

${chalk.yellow.bold('Happy coding! 🚀')}
`);
}

export default successMessage