/**
 * Simplified Configuration Manager for GASSAPI MCP v2
 * Migrated from original ConfigLoader but simplified
 */
export interface GassapiConfig {
    project: {
        id: string;
        name: string;
        description?: string;
    };
    mcpClient?: {
        token: string;
    };
    server?: {
        url: string;
        timeout?: number;
    };
    token?: string;
    environments?: Record<string, {
        id: string;
        name: string;
        description?: string;
        variables?: Record<string, string>;
    }>;
}
/**
 * Simple configuration manager
 * Detects and loads gassapi.json configuration
 */
export declare class ConfigManager {
    private config;
    private configPath;
    constructor(configPath?: string);
    /**
     * Detect and load configuration from parent directories
     */
    detectProjectConfig(): Promise<GassapiConfig | null>;
    /**
     * Find gassapi.json file in parent directories
     */
    private findConfigFile;
    /**
     * Get MCP token from config
     */
    getMcpToken(config?: GassapiConfig): string | null;
    /**
     * Get server URL - hardcoded to mapi.gass.web.id
     */
    getServerURL(config?: GassapiConfig): string;
    /**
     * Get project info
     */
    getProjectInfo(config?: GassapiConfig): {
        id: string;
        name: string;
        description?: string;
    };
    /**
     * Check if config file exists
     */
    hasConfigFile(): boolean;
    /**
     * Get config file path
     */
    getConfigPath(): string;
    /**
     * Get auth token
     */
    getAuthToken(): string | null;
    /**
     * Check if token is expired (simple check)
     */
    isTokenExpired(): boolean;
    /**
     * Validate configuration
     */
    validate(): {
        isValid: boolean;
        errors: string[];
        warnings: string[];
    };
    /**
     * Create sample configuration
     */
    createSampleConfig(projectName?: string, projectId?: string): void;
    /**
     * Clear cached configuration
     */
    clearCache(): void;
}
