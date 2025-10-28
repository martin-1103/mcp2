/**
 * Environment Update Handler
 * Handles environment variable update requests
 */
import { McpToolResponse } from '../../../types.js';
/**
 * Update environment variables handler
 */
export declare function handleUpdateEnvironmentVariables(args: any): Promise<McpToolResponse>;
/**
 * Set default environment handler
 */
export declare function handleSetDefaultEnvironment(args: any): Promise<McpToolResponse>;
/**
 * Duplicate environment handler
 */
export declare function handleDuplicateEnvironment(args: any): Promise<McpToolResponse>;
