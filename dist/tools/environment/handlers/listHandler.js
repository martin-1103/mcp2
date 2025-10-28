/**
 * Environment List Handler
 * Handles environment listing requests
 */
import { ConfigManager } from '../../../config.js';
import { BackendClient } from '../../../client/BackendClient.js';
import { EnvironmentService } from '../services/EnvironmentService.js';
// Initialize services
let configManager = null;
let backendClient = null;
/**
 * Get singleton instances
 */
async function getInstances() {
    if (!configManager) {
        configManager = new ConfigManager();
    }
    if (!backendClient) {
        const config = await configManager.detectProjectConfig();
        if (!config) {
            throw new Error('Could not detect project configuration');
        }
        const token = configManager.getMcpToken(config);
        if (!token) {
            throw new Error('Could not get authentication token');
        }
        backendClient = new BackendClient(token);
    }
    return { configManager, backendClient };
}
/**
 * Parse variables from JSON string
 */
function parseVariables(variablesStr) {
    if (!variablesStr || variablesStr === '{}') {
        return {};
    }
    try {
        const parsed = JSON.parse(variablesStr);
        return typeof parsed === 'object' ? parsed : {};
    }
    catch (e) {
        return {};
    }
}
/**
 * List environments handler
 */
export async function handleListEnvironments(args) {
    try {
        const { projectId, activeOnly } = args;
        const instances = await getInstances();
        // Get project ID if not provided
        let targetProjectId = projectId;
        if (!targetProjectId) {
            const config = await instances.configManager.detectProjectConfig();
            targetProjectId = config?.project?.id;
            if (!targetProjectId) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: false,
                                error: 'Project ID not found in config and not provided in arguments'
                            }, null, 2)
                        }
                    ]
                };
            }
        }
        // Create environment service
        const envService = new EnvironmentService(instances.backendClient.getBaseUrl(), instances.backendClient.getToken());
        // List environments
        const request = {
            projectId: targetProjectId,
            activeOnly: activeOnly !== false // default to true
        };
        const response = await envService.listEnvironments(request);
        if (!response.success) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: response.error || 'Failed to list environments'
                        }, null, 2)
                    }
                ]
            };
        }
        const environments = response.data || [];
        // Format response
        let envText = `🌍 Environments List (${environments.length}):\n\n`;
        if (environments.length === 0) {
            envText += 'No environments found for this project.\n';
            envText += 'Use create_environment tool to add your first environment.\n';
        }
        else {
            environments.forEach((env, index) => {
                const isDefault = env.is_default ? ' [Default]' : '';
                const variables = parseVariables(env.variables);
                const varCount = Object.keys(variables).length;
                envText += `${index + 1}. ${env.name} (${env.id})${isDefault}\n`;
                envText += `   - ${varCount} variables\n`;
                if (env.description) {
                    envText += `   - ${env.description}\n`;
                }
                envText += '\n';
            });
        }
        return {
            content: [
                {
                    type: 'text',
                    text: envText
                }
            ]
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error.message || 'Unknown error occurred while listing environments'
                    }, null, 2)
                }
            ]
        };
    }
}
//# sourceMappingURL=listHandler.js.map