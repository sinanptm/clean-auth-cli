import fs from 'fs-extra';
import chalk from 'chalk';

const OPEN_SOURCE_FILES = [
    'LICENSE',
    'CONTRIBUTING.md',
    'README.md'
];


export const removeDirectory = async (dirName) => {
    try {
        if (await fs.pathExists(dirName)) {
            await fs.remove(dirName);
            return true;
        }
        return false;
    } catch (error) {
        console.error(chalk.red(`Error removing ${dirName}: ${error.message}`));
        return false;
    }
};

export const removeOpenSourceFiles = async () => {
    const results = [];

    for (const file of OPEN_SOURCE_FILES) {
        try {
            if (await fs.pathExists(file)) {
                await fs.remove(file);
                results.push({file, status: 'removed'});
            } else {
                results.push({file, status: 'not found'});
            }
        } catch (error) {
            results.push({file, status: `error: ${error.message}`});
        }
    }

    return results;
};