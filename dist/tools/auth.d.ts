/**
 * Auth Tools for GASSAPI MCP v2
 * Migrated from original auth tools but simplified
 */
import { McpTool, McpToolResponse } from '../types.js';
export declare const getProjectContextTool: McpTool;
/**
 * Auth tool handlers - Simplified to single get_project_context
 */
export declare function createAuthToolHandlers(): Record<string, (args: any) => Promise<McpToolResponse>>;
export declare const AUTH_TOOLS: McpTool[];
export declare const TOOLS: McpTool[];
export declare class ToolHandlers {
    static handleGetProjectContext(): Promise<McpToolResponse>;
}
export declare function createToolHandlers(config: any): Record<string, (args: any) => Promise<McpToolResponse>>;
