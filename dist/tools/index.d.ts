/**
 * Tool Definitions for GASSAPI MCP v2
 * Integration with migrated server framework
 */
import { McpTool, McpToolResponse } from '../types.js';
export declare const healthCheckTool: McpTool;
export declare const CORE_TOOLS: McpTool[];
export declare const ALL_TOOLS: McpTool[];
export declare function createCoreToolHandlers(): Record<string, (args: any) => Promise<McpToolResponse>>;
export declare function createAllToolHandlers(): Record<string, (args: any) => Promise<McpToolResponse>>;
export declare const TOOLS: McpTool[];
export declare class ToolHandlers {
    static handleHealthCheck(): Promise<McpToolResponse>;
}
export declare function createToolHandlers(config: any): Record<string, (args: any) => Promise<McpToolResponse>>;
