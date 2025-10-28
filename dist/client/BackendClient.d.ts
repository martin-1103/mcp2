/**
 * Simplified Backend Client for GASSAPI MCP v2
 * Migrated from original BackendClient but simplified
 */
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    status?: number;
}
export interface TokenValidationResponse {
    success: boolean;
    data?: {
        valid: boolean;
        project?: {
            id: string;
            name: string;
        };
        environment?: {
            id: string;
            name: string;
        };
        lastValidatedAt?: string;
    };
    error?: string;
    message?: string;
}
export interface ProjectContextResponse {
    project: {
        id: string;
        name: string;
        description?: string;
        created_at?: string;
        updated_at?: string;
    };
    environments: Array<{
        id: string;
        name: string;
        description?: string;
        is_default?: boolean;
        variables?: Record<string, any>;
        created_at?: string;
        updated_at?: string;
    }>;
    folders: Array<{
        id: string;
        name: string;
        description?: string;
        endpoint_count?: number;
        created_at?: string;
        updated_at?: string;
    }>;
    user: {
        id: string;
        token_type: 'jwt' | 'mcp';
        authenticated: boolean;
    };
}
export interface UnifiedEnvironment {
    id: string;
    name: string;
    description?: string;
    is_default?: boolean;
    project_id?: string;
    variable_count?: number;
    created_at: string;
    updated_at?: string;
}
/**
 * Simple backend client for GASSAPI API
 * Simplified from original BackendClient
 */
export declare class BackendClient {
    private baseUrl;
    private mcpToken;
    private defaultHeaders;
    constructor(mcpToken: string);
    /**
     * Make HTTP request with proper error handling
     */
    makeRequest<T>(endpoint: string, options: {
        method?: string;
        headers?: Record<string, string>;
        body?: string;
        timeout?: number;
    }): Promise<ApiResponse<T>>;
    /**
     * Validate MCP token
     */
    validateToken(): Promise<ApiResponse<TokenValidationResponse>>;
    /**
     * Get project context using new dual-token endpoint
     */
    getProjectContext(projectId: string): Promise<ApiResponse<ProjectContextResponse>>;
    /**
     * Get current project
     */
    getCurrentProject(): Promise<ApiResponse<any>>;
    /**
     * Flow operations
     */
    createFlow(flowData: any): Promise<ApiResponse<any>>;
    getFlowDetails(flowId: string): Promise<ApiResponse<any>>;
    getFlows(filters?: any): Promise<ApiResponse<any[]>>;
    deleteFlow(flowId: string): Promise<ApiResponse<any>>;
    getEndpoints(filters?: any): Promise<ApiResponse<any[]>>;
    /**
     * Update endpoint
     */
    updateEndpoint(endpointId: string, updateData: any): Promise<ApiResponse<any>>;
    /**
     * Get status
     */
    getStatus(): {
        connected: boolean;
        server_url: string;
        token_configured: boolean;
        token_expired: boolean;
    };
    /**
     * Get base URL
     */
    getBaseUrl(): string;
    /**
     * Get MCP token
     */
    getMcpToken(): string;
    /**
     * Get current active token
     */
    getToken(): string;
}
