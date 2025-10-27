/**
 * Dependency management for endpoint tools
 */

import { ConfigManager } from '../../config.js';
import { BackendClient } from '../../client/BackendClient.js';

// Singleton instances for endpoint tools
let configManager: ConfigManager | null = null;
let backendClient: BackendClient | null = null;

/**
 * Initialize endpoint dependencies
 */
export async function getEndpointDependencies() {
  if (!configManager) {
    configManager = new ConfigManager();
  }
  if (!backendClient) {
    const config = await configManager.detectProjectConfig();
    if (!config) {
      throw new Error('No configuration found');
    }
    const token = configManager.getMcpToken(config);
    if (!token) {
      throw new Error('Missing token in configuration');
    }
    backendClient = new BackendClient(token);
  }
  return { configManager, backendClient };
}

/**
 * Reset dependencies (useful for testing)
 */
export function resetDependencies() {
  configManager = null;
  backendClient = null;
}