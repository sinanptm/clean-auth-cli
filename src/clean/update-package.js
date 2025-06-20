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
            if (packageJson.scripts && packageJson.scripts.dev) {
                let devScript = packageJson.scripts.dev;

            // Handle server removal
                if (removedDirs.includes('server')) {
                    delete packageJson.scripts.test;
                    devScript = devScript.replace(/\"pnpm --prefix server dev\"/g, '');
                }

                // Handle web removal
                if (removedDirs.includes('web')) {
                    devScript = devScript.replace(/\"pnpm --prefix web dev\"/g, '');
                }

                // Clean up the script
                devScript = devScript.replace(/concurrently\s+/g, '');
                devScript = devScript.replace(/\s+/g, ' ');
                devScript = devScript.replace(/^\s+|\s+$/g, '');
                devScript = devScript.replace(/^\"/, '').replace(/\"$/, ''); // remove outer quotes

                if (!devScript.includes('" "')) {
                    devScript = devScript.replace(/^concurrently\s*\"?/, '').replace(/\"?$/, '');
                }

                if (devScript && devScript.trim() !== '' && devScript !== 'concurrently') {
                    packageJson.scripts.dev = devScript;
                } else {
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
