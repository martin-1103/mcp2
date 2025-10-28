/**
 * Simplified Configuration Manager for GASSAPI MCP v2
 * Migrated from original ConfigLoader but simplified
 */
import * as fs from 'fs/promises';
import * as path from 'path';
/**
 * Simple configuration manager
 * Detects and loads gassapi.json configuration
 */
export class ConfigManager {
    constructor(configPath) {
        this.config = null;
        this.configPath = null;
        if (configPath) {
            this.configPath = path.resolve(configPath);
        }
    }
    /**
     * Detect and load configuration from parent directories
     */
    async detectProjectConfig() {
        if (this.config) {
            return this.config;
        }
        const configPath = await this.findConfigFile();
        if (!configPath) {
            return null;
        }
        try {
            const configData = await fs.readFile(configPath, 'utf-8');
            this.config = JSON.parse(configData);
            this.configPath = configPath;
            return this.config;
        }
        catch (error) {
            console.error(`[CONFIG] Failed to load config from ${configPath}:`, error);
            return null;
        }
    }
    /**
     * Find gassapi.json file in parent directories
     */
    async findConfigFile() {
        const currentDir = process.cwd();
        let searchDir = currentDir;
        // Search up to 10 levels up to find the config
        for (let i = 0; i < 10; i++) {
            const configFiles = [
                path.join(searchDir, 'gassapi.json'),
                path.join(searchDir, 'gassapi-mcp.json'),
                path.join(searchDir, '.gassapi.json')
            ];
            for (const configFile of configFiles) {
                try {
                    await fs.access(configFile);
                    console.error(`[CONFIG] Found config file at: ${configFile}`);
                    return configFile;
                }
                catch {
                    // File doesn't exist, continue searching
                }
            }
            const parentDir = path.dirname(searchDir);
            if (parentDir === searchDir) {
                break; // Reached root
            }
            searchDir = parentDir;
        }
        console.error(`[CONFIG] No config file found starting from: ${currentDir}`);
        return null;
    }
    /**
     * Get MCP token from config
     */
    getMcpToken(config) {
        const cfg = config || this.config;
        // Try new format first
        if (cfg?.mcpClient?.token) {
            return cfg.mcpClient.token;
        }
        // Fallback to legacy format
        return cfg?.token || null;
    }
    /**
     * Get server URL - hardcoded to mapi.gass.web.id
     */
    getServerURL(config) {
        return "http://mapi.gass.web.id";
    }
    /**
     * Get project info
     */
    getProjectInfo(config) {
        const cfg = config || this.config;
        return cfg?.project || { id: 'unknown', name: 'Unknown Project' };
    }
    /**
     * Check if config file exists
     */
    hasConfigFile() {
        return this.configPath !== null;
    }
    /**
     * Get config file path
     */
    getConfigPath() {
        return this.configPath || 'Not found';
    }
    /**
     * Get auth token
     */
    getAuthToken() {
        return this.getMcpToken();
    }
    /**
     * Check if token is expired (simple check)
     */
    isTokenExpired() {
        // Simple implementation - in real app would check expiry date
        return !this.getAuthToken();
    }
    /**
     * Validate configuration
     */
    validate() {
        const errors = [];
        const warnings = [];
        if (!this.config) {
            errors.push('No configuration file found');
            return { isValid: false, errors, warnings };
        }
        // Validate required fields
        if (!this.config.project?.id) {
            errors.push('Project ID is required');
        }
        if (!this.config.project?.name) {
            errors.push('Project name is required');
        }
        const token = this.config.token || this.config.mcpClient?.token;
        if (!token) {
            errors.push('Token is required');
        }
        // Server URL is hardcoded, no validation needed
        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
    /**
     * Create sample configuration
     */
    createSampleConfig(projectName, projectId) {
        const sampleConfig = {
            project: {
                id: projectId || 'project-' + Math.random().toString(36).substr(2, 9),
                name: projectName || 'My GASSAPI Project',
                description: 'GASSAPI MCP Project Configuration'
            },
            token: 'your-gassapi-api-token-here'
        };
        const configPath = path.join(process.cwd(), 'gassapi.json');
        const configData = JSON.stringify(sampleConfig, null, 2);
        fs.writeFile(configPath, configData, 'utf-8')
            .then(() => {
            console.log(`[CONFIG] Created sample config at: ${configPath}`);
        })
            .catch((error) => {
            console.error(`[CONFIG] Failed to create config:`, error);
        });
    }
    /**
     * Clear cached configuration
     */
    clearCache() {
        this.config = null;
        this.configPath = null;
    }
}
//# sourceMappingURL=config.js.map