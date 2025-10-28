/**
 * Folder Handlers
 * Handles all folder-related requests
 */
import { McpToolResponse } from '../../../types.js';
/**
 * List folders handler
 */
export declare function handleListFolders(args: any): Promise<McpToolResponse>;
/**
 * Create folder handler
 */
export declare function handleCreateFolder(args: any): Promise<McpToolResponse>;
/**
 * Update folder handler
 */
export declare function handleUpdateFolder(args: any): Promise<McpToolResponse>;
/**
 * Move folder handler
 */
export declare function handleMoveFolder(args: any): Promise<McpToolResponse>;
/**
 * Delete folder handler
 */
export declare function handleDeleteFolder(args: any): Promise<McpToolResponse>;
/**
 * Get folder details handler
 */
export declare function handleGetFolderDetails(args: any): Promise<McpToolResponse>;
