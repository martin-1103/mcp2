/**
 * Type definitions for endpoint management tools
 */
import { McpToolResponse } from '../../types.js';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
export interface EndpointListResponse {
    success: boolean;
    data?: Array<{
        id: string;
        folder_id: string;
        name: string;
        method: HttpMethod;
        url: string;
        description?: string;
        purpose?: string;
        headers?: string;
        body?: string;
        request_params?: string;
        response_schema?: string;
        header_docs?: string;
        created_at: string;
        updated_at: string;
    }>;
    message?: string;
}
export interface EndpointDetailsResponse {
    success: boolean;
    data?: {
        id: string;
        folder_id: string;
        name: string;
        method: HttpMethod;
        url: string;
        description?: string;
        purpose?: string;
        headers?: string;
        body?: string;
        request_params?: string;
        response_schema?: string;
        header_docs?: string;
        created_at: string;
        updated_at: string;
        folder?: {
            id: string;
            name: string;
            description?: string;
        };
    };
    message?: string;
}
export interface EndpointCreateResponse {
    success: boolean;
    data?: {
        id: string;
        name: string;
        method: HttpMethod;
        url: string;
        description?: string;
        purpose?: string;
        headers?: string;
        body?: string;
        request_params?: string;
        response_schema?: string;
        header_docs?: string;
        folder_id: string;
        created_at: string;
        updated_at: string;
    };
    message?: string;
}
export interface EndpointUpdateResponse {
    success: boolean;
    data?: {
        id: string;
        name: string;
        method: HttpMethod;
        url: string;
        description?: string;
        purpose?: string;
        headers?: string;
        body?: string;
        request_params?: string;
        response_schema?: string;
        header_docs?: string;
        folder_id: string;
        created_at: string;
        updated_at: string;
    };
    message?: string;
}
export interface EndpointMoveResponse {
    success: boolean;
    message?: string;
}
export interface EndpointDeleteResponse {
    success: boolean;
    data?: {
        id: string;
        deleted: boolean;
        message?: string;
    };
    message?: string;
}
export type EndpointToolHandler = (args: Record<string, any>) => Promise<McpToolResponse>;
