/**
 * Utility functions for endpoint management tools
 */
import { HttpMethod } from './types.js';
/**
 * Format headers object to string
 */
export declare function formatHeaders(headers: Record<string, string>): string;
/**
 * Parse headers string to object
 */
export declare function parseHeaders(headersStr?: string): Record<string, string>;
/**
 * Format body value
 */
export declare function formatBody(body?: any): string;
/**
 * Validate endpoint data
 */
export declare function validateEndpointData(data: {
    name?: string;
    method?: HttpMethod;
    url?: string;
    folder_id?: string;
}): string[];
/**
 * Validate update endpoint data
 */
export declare function validateUpdateData(data: {
    endpoint_id?: string;
    updateData?: Record<string, any>;
}): string[];
/**
 * Format endpoint list text
 */
export declare function formatEndpointListText(endpoints: any[], folderId?: string, method?: string): string;
/**
 * Format endpoint details text
 */
export declare function formatEndpointDetailsText(endpoint: any): string;
/**
 * Format endpoint creation text
 */
export declare function formatEndpointCreateText(endpoint: any): string;
/**
 * Format endpoint update text
 */
export declare function formatEndpointUpdateText(endpoint: any): string;
/**
 * Format endpoint move text
 */
export declare function formatEndpointMoveText(endpoint: any): string;
/**
 * Format endpoint delete text
 */
export declare function formatEndpointDeleteText(endpointId: string, success: boolean, message?: string): string;
