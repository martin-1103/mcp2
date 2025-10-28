/**
 * Centralized API Endpoints Management for GASSAPI MCP v2
 * Replaces hardcoded paths with configurable endpoints
 */
/**
 * Default API endpoints configuration
 */
export const DEFAULT_API_ENDPOINTS = {
    // Environment endpoints
    projectEnvironments: '/?act=project_environments&id={id}',
    environmentDetails: '/?act=environment&id={id}',
    environmentUpdate: '/?act=environment&id={id}', // Use same endpoint as get
    environmentVariables: '/?act=environment&id={id}', // Use same endpoint as get
    // Folder endpoints
    projectFolders: '/?act=project_folders&id={id}',
    folderDetails: '/?act=folder&id={id}',
    folderCreate: '/?act=project_folders&id={id}', // Create via project endpoint
    folderUpdate: '/?act=folder&id={id}', // Use same endpoint as get
    folderDelete: '/?act=folder_delete&id={id}',
    // Endpoint endpoints
    endpointDetails: '/?act=endpoint&id={id}',
    endpointCreate: '/?act=endpoints&id={id}', // Create via list endpoint
    endpointUpdate: '/?act=endpoint&id={id}', // Use same endpoint as get
    endpointDelete: '/?act=endpoint_delete&id={id}',
    endpointTest: '/?act=endpoint_test',
    endpointList: '/?act=endpoints&id={id}',
    projectEndpointsList: '/?act=project_endpoints&id={project_id}',
    // Flow endpoints
    flowDetails: '/?act=flow&id={id}',
    flowCreate: '/?act=flows&id={project_id}', // Create via list endpoint
    flowUpdate: '/?act=flow&id={id}', // Use same endpoint as get
    flowDelete: '/?act=flow_delete&id={id}',
    flowExecute: '/?act=flow_execute',
    flowList: '/?act=flows&id={project_id}',
    flowTest: '/?act=flow_test',
    flowValidate: '/?act=flow_validate',
    // Testing endpoints
    endpointTestDirect: '/?act=endpoint&id={id}',
    environmentVariablesDirect: '/?act=environment_variables&id={id}',
    // Auth endpoints
    tokenValidate: '/?act=validate_token',
    projectContext: '/?act=project&id={id}'
};
/**
 * API Endpoints Manager
 */
export class ApiEndpointsManager {
    constructor(customEndpoints) {
        this.endpoints = { ...DEFAULT_API_ENDPOINTS, ...customEndpoints };
    }
    /**
     * Get endpoint with variable substitution
     */
    getEndpoint(key, variables) {
        let endpoint = this.endpoints[key];
        if (variables) {
            Object.entries(variables).forEach(([varName, value]) => {
                endpoint = endpoint.replace(new RegExp(`{${varName}}`, 'g'), encodeURIComponent(value));
            });
        }
        return endpoint;
    }
    /**
     * Update specific endpoint
     */
    updateEndpoint(key, value) {
        this.endpoints[key] = value;
    }
    /**
     * Get all endpoints
     */
    getAllEndpoints() {
        return { ...this.endpoints };
    }
    /**
     * Validate endpoint variables
     */
    validateEndpoint(key, variables) {
        const endpoint = this.endpoints[key];
        const missing = [];
        if (variables) {
            const matches = endpoint.match(/{([^}]+)}/g);
            if (matches) {
                matches.forEach(match => {
                    const varName = match.slice(1, -1); // Remove { }
                    if (!variables[varName]) {
                        missing.push(varName);
                    }
                });
            }
        }
        return {
            valid: missing.length === 0,
            missing
        };
    }
}
/**
 * Global API endpoints instance
 */
let globalApiEndpoints = null;
/**
 * Get global API endpoints instance
 */
export function getApiEndpoints() {
    if (!globalApiEndpoints) {
        globalApiEndpoints = new ApiEndpointsManager();
    }
    return globalApiEndpoints;
}
/**
 * Set global API endpoints configuration
 */
export function setApiEndpoints(customEndpoints) {
    globalApiEndpoints = new ApiEndpointsManager(customEndpoints);
}
//# sourceMappingURL=endpoints.js.map