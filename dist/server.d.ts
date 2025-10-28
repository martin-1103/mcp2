/**
 * GASSAPI MCP Server v2 - Migration Mode
 * Core server implementation migrated from original MCP
 */
/**
 * GASSAPI MCP Server Implementation
 * Migrated from original with simplified architecture
 */
export declare class McpServer {
    private server;
    private tools;
    private startTime;
    private toolHandlers;
    private availableTools;
    private toolsLoaded;
    constructor();
    /**
     * Register all available tools with consistency
     * Simplified version using static imports for reliability
     */
    private registerAllTools;
    /**
     * Ensure tools are loaded before proceeding
     */
    private ensureToolsLoaded;
    /**
     * Start MCP server with stdio transport
     * Migrated from original implementation
     */
    start(): Promise<void>;
    /**
     * Handle MCP initialize request
     * Migrated from original implementation
     */
    private handleInitialize;
    /**
     * Handle tools/list request
     * Fixed to ensure consistency with tool registration
     */
    private handleListTools;
    /**
     * Handle tools/call request
     * Fixed to ensure consistency with tool registration
     */
    private handleToolCall;
    /**
     * Handle health_check tool
     * Fixed to use registered tools
     */
    private handleHealthCheck;
    /**
     * Check if protocol version is supported
     */
    private isProtocolVersionSupported;
    /**
     * Stop MCP server
     */
    shutdown(): Promise<void>;
    /**
     * Get server status
     */
    getStatus(): any;
    /**
     * Add tool dynamically (for migration)
     */
    addTool(tool: any): void;
    /**
     * Get all registered tools
     */
    getTools(): any[];
}
