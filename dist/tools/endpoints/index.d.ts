/**
 * Main entry point for endpoint management tools
 */
import { McpTool, McpToolResponse } from '../../types.js';
import { HttpMethod } from './types.js';
import { ENDPOINT_TOOLS } from './tools.js';
import { createEndpointToolHandlers } from './handlers.js';
export { ENDPOINT_TOOLS };
export declare const TOOLS: McpTool[];
export { createEndpointToolHandlers };
export { handleListEndpoints, handleGetEndpointDetails, handleCreateEndpoint, handleUpdateEndpoint, handleDeleteEndpoint } from './handlers.js';
export { listEndpointsTool, getEndpointDetailsTool, createEndpointTool, updateEndpointTool, deleteEndpointTool } from './tools.js';
export type { HttpMethod } from './types.js';
export type { EndpointListResponse, EndpointDetailsResponse, EndpointCreateResponse, EndpointUpdateResponse, EndpointMoveResponse, EndpointDeleteResponse, EndpointToolHandler } from './types.js';
export { formatHeaders, parseHeaders, formatBody, validateEndpointData, validateUpdateData, formatEndpointListText, formatEndpointDetailsText, formatEndpointCreateText, formatEndpointUpdateText, formatEndpointMoveText, formatEndpointDeleteText } from './utils.js';
export { getEndpointDependencies, resetDependencies } from './dependencies.js';
export declare class ToolHandlers {
    static handleListEndpoints(args?: {
        project_id?: string;
        folder_id?: string;
        method?: HttpMethod;
    }): Promise<McpToolResponse>;
    static handleGetEndpointDetails(args: {
        endpoint_id: string;
    }): Promise<McpToolResponse>;
    static handleCreateEndpoint(args: {
        name: string;
        method: HttpMethod;
        url: string;
        folder_id: string;
        description?: string;
        headers?: Record<string, string>;
        body?: string;
    }): Promise<McpToolResponse>;
    static handleUpdateEndpoint(args: {
        endpoint_id: string;
        name?: string;
        method?: HttpMethod;
        url?: string;
        description?: string;
        headers?: Record<string, string>;
        body?: string;
    }): Promise<McpToolResponse>;
    static handleMoveEndpoint(args: {
        endpoint_id: string;
        new_folder_id: string;
    }): Promise<McpToolResponse>;
    static handleDeleteEndpoint(args: {
        endpoint_id: string;
    }): Promise<McpToolResponse>;
}
export declare function createToolHandlers(config: any): Record<string, (args: any) => Promise<McpToolResponse>>;
