/**
 * Centralized API Endpoints Management for GASSAPI MCP v2
 * Replaces hardcoded paths with configurable endpoints
 */
export interface ApiEndpoints {
    projectEnvironments: string;
    environmentDetails: string;
    environmentUpdate: string;
    environmentVariables: string;
    projectFolders: string;
    folderDetails: string;
    folderCreate: string;
    folderUpdate: string;
    folderDelete: string;
    endpointDetails: string;
    endpointCreate: string;
    endpointUpdate: string;
    endpointDelete: string;
    endpointTest: string;
    endpointList: string;
    projectEndpointsList: string;
    flowDetails: string;
    flowCreate: string;
    flowUpdate: string;
    flowDelete: string;
    flowExecute: string;
    flowList: string;
    flowTest: string;
    flowValidate: string;
    endpointTestDirect: string;
    environmentVariablesDirect: string;
    tokenValidate: string;
    projectContext: string;
}
/**
 * Default API endpoints configuration
 */
export declare const DEFAULT_API_ENDPOINTS: ApiEndpoints;
/**
 * API Endpoints Manager
 */
export declare class ApiEndpointsManager {
    private endpoints;
    constructor(customEndpoints?: Partial<ApiEndpoints>);
    /**
     * Get endpoint with variable substitution
     */
    getEndpoint(key: keyof ApiEndpoints, variables?: Record<string, string>): string;
    /**
     * Update specific endpoint
     */
    updateEndpoint(key: keyof ApiEndpoints, value: string): void;
    /**
     * Get all endpoints
     */
    getAllEndpoints(): ApiEndpoints;
    /**
     * Validate endpoint variables
     */
    validateEndpoint(key: keyof ApiEndpoints, variables?: Record<string, string>): {
        valid: boolean;
        missing: string[];
    };
}
/**
 * Get global API endpoints instance
 */
export declare function getApiEndpoints(): ApiEndpointsManager;
/**
 * Set global API endpoints configuration
 */
export declare function setApiEndpoints(customEndpoints: Partial<ApiEndpoints>): void;
