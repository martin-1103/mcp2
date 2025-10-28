/**
 * Dependency management for endpoint tools
 */
import { ConfigManager } from '../../config.js';
import { BackendClient } from '../../client/BackendClient.js';
/**
 * Initialize endpoint dependencies
 */
export declare function getEndpointDependencies(): Promise<{
    configManager: ConfigManager;
    backendClient: BackendClient;
}>;
/**
 * Reset dependencies (useful for testing)
 */
export declare function resetDependencies(): void;
