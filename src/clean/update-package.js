import fs from 'fs-extra';
import chalk from 'chalk';

const updateRootPackageJson = async (removedDirs) => {
    const packageJsonPath = 'package.json';

    try {
        if (await fs.pathExists(packageJsonPath)) {
            const packageJson = await fs.readJson(packageJsonPath);

            // Update directories
            if (packageJson.directories) {
                removedDirs.forEach(dir => {
                    delete packageJson.directories[dir];
                });

                // Remove directories field if empty
                if (Object.keys(packageJson.directories).length === 0) {
                    delete packageJson.directories;
                }
            }

            // Update scripts that reference removed directories
            if (packageJson.scripts) {
                if (removedDirs.includes('server')) {
                    delete packageJson.scripts.test;
                    if (packageJson.scripts.dev) {
                        packageJson.scripts.dev = packageJson.scripts.dev.replace(
                            /\"pnpm --prefix server dev\"\s*\"?/g, ''
                        ).replace(/concurrently\s+/, '').replace(/\s+\"pnpm --prefix web dev\"/, 'pnpm --prefix web dev');

                        if (packageJson.scripts.dev.includes('concurrently')) {
                            packageJson.scripts.dev = packageJson.scripts.dev.replace(/concurrently\s+\"/, '');
                            packageJson.scripts.dev = packageJson.scripts.dev.replace(/\"$/, '');
                        }
                    }
                }

                if (removedDirs.includes('web')) {
                    if (packageJson.scripts.dev) {
                        packageJson.scripts.dev = packageJson.scripts.dev.replace(
                            /\"pnpm --prefix web dev\"\s*\"?/g, ''
                        ).replace(/concurrently\s+/, '').replace(/\s+\"pnpm --prefix server dev\"/, 'pnpm --prefix server dev');

                        if (packageJson.scripts.dev.includes('concurrently')) {
                            packageJson.scripts.dev = packageJson.scripts.dev.replace(/concurrently\s+\"/, '');
                            packageJson.scripts.dev = packageJson.scripts.dev.replace(/\"$/, '');
                        }
                    }
                }

                // Clean up empty or invalid dev script
                if (packageJson.scripts.dev &&
                    (packageJson.scripts.dev.trim() === '' ||
                        packageJson.scripts.dev.trim() === 'concurrently' ||
                        packageJson.scripts.dev.includes('concurrently ""'))) {
                    delete packageJson.scripts.dev;
                }
            }

            await fs.writeJson(packageJsonPath, packageJson, {spaces: 2});
            return true;
        }
    } catch (error) {
        console.error(chalk.red(`Error updating package.json: ${error.message}`));
        return false;
    }

    return false;
};


export default updateRootPackageJson;
