import fs from 'fs-extra';
import chalk from 'chalk';

const updateWorkspaceConfig = async (removedDirs) => {
    const workspaceConfigPath = 'pnpm-workspace.yaml';

    try {
        if (await fs.pathExists(workspaceConfigPath)) {
            let content = await fs.readFile(workspaceConfigPath, 'utf8');

            // Parse the current packages
            const lines = content.split('\n');
            const filteredLines = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];

                // Check if this line is a package entry that should be removed
                let shouldRemove = false;
                for (const dir of removedDirs) {
                    if (line.trim() === `- ${dir}`) {
                        shouldRemove = true;
                        break;
                    }
                }

                if (!shouldRemove) {
                    filteredLines.push(line);
                }
            }

            // Reconstruct the content with proper formatting
            let newContent = filteredLines.join('\n');

            // Clean up any extra newlines at the end
            newContent = newContent.replace(/\n+$/, '\n');

            await fs.writeFile(workspaceConfigPath, newContent, 'utf8');
            return true;
        }
    } catch (error) {
        console.error(chalk.red(`Error updating pnpm-workspace.yaml: ${error.message}`));
        return false;
    }

    return false;
};


export default updateWorkspaceConfig;
