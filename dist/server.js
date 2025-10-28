/**
 * GASSAPI MCP Server v2 - Migration Mode
 * Core server implementation migrated from original MCP
 */
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { InitializeRequestSchema, ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ALL_TOOLS, createAllToolHandlers } from './tools/index.js';
// Simple logger (migrated from original pattern)
class SimpleLogger {
    static getInstance() {
        if (!SimpleLogger.instance) {
            SimpleLogger.instance = new SimpleLogger();
        }
        return SimpleLogger.instance;
    }
    info(message, context, module) {
        const logData = {
            timestamp: new Date().toISOString(),
            message,
            ...context,
            module: module || 'McpServer'
        };
        console.error(`[GASSAPI-MCP] [INFO] ${message}`, context ? logData : '');
    }
    error(message, context, module) {
        const logData = {
            timestamp: new Date().toISOString(),
            message,
            ...context,
            module: module || 'McpServer'
        };
        console.error(`[GASSAPI-MCP] [ERROR] ${message}`, context ? logData : '');
    }
    warn(message, context, module) {
        const logData = {
            timestamp: new Date().toISOString(),
            message,
            ...context,
            module: module || 'McpServer'
        };
        console.error(`[GASSAPI-MCP] [WARN] ${message}`, context ? logData : '');
    }
}
const logger = SimpleLogger.getInstance();
/**
 * GASSAPI MCP Server Implementation
 * Migrated from original with simplified architecture
 */
export class McpServer {
    constructor() {
        this.tools = new Map();
        this.availableTools = [];
        this.toolsLoaded = false;
        this.startTime = Date.now();
        // Initialize MCP server (similar to original)
        this.server = new Server({
            name: 'GASSAPI MCP Client',
            version: '1.0.0'
        }, {
            capabilities: {
                tools: {
                    listChanged: true
                }
            }
        });
        // Register handlers and tools
        this.toolHandlers = createAllToolHandlers();
        // Initialize tools immediately for consistency
        ALL_TOOLS.forEach(tool => {
            this.tools.set(tool.name, tool);
        });
        this.availableTools = ALL_TOOLS;
        this.toolsLoaded = true;
        logger.info('GASSAPI MCP Server initialized', {
            toolsCount: this.tools.size,
            availableTools: this.availableTools.length,
            module: 'McpServer'
        });
    }
    /**
     * Register all available tools with consistency
     * Simplified version using static imports for reliability
     */
    async registerAllTools() {
        try {
            // Clear existing tools
            this.tools.clear();
            // Use statically imported ALL_TOOLS for consistency
            ALL_TOOLS.forEach(tool => {
                this.tools.set(tool.name, tool);
            });
            this.toolsLoaded = true;
            logger.info(`Successfully registered ${this.tools.size} tools`, {
                toolsCount: this.tools.size,
                tools: Array.from(this.tools.keys()),
                module: 'McpServer'
            });
        }
        catch (error) {
            logger.error('Failed to register tools', {
                error: error instanceof Error ? error.message : String(error),
                module: 'McpServer'
            });
            // Fallback: register only health_check
            const healthCheckTool = {
                name: 'health_check',
                description: 'Check if the MCP server is running properly',
                inputSchema: {
                    type: 'object',
                    properties: {}
                }
            };
            this.tools.clear();
            this.tools.set(healthCheckTool.name, healthCheckTool);
            this.availableTools = [healthCheckTool];
            this.toolsLoaded = true;
            logger.warn('Using fallback tool registration', {
                toolsCount: this.tools.size,
                tools: Array.from(this.tools.keys()),
                module: 'McpServer'
            });
        }
    }
    /**
     * Ensure tools are loaded before proceeding
     */
    async ensureToolsLoaded() {
        if (!this.toolsLoaded) {
            await this.registerAllTools();
        }
    }
    /**
     * Start MCP server with stdio transport
     * Migrated from original implementation
     */
    async start() {
        try {
            // Register tools first
            await this.registerAllTools();
            // Register MCP request handlers (original pattern)
            this.server.setRequestHandler(InitializeRequestSchema, this.handleInitialize.bind(this));
            this.server.setRequestHandler(ListToolsRequestSchema, this.handleListTools.bind(this));
            this.server.setRequestHandler(CallToolRequestSchema, this.handleToolCall.bind(this));
            // Create stdio transport
            const transport = new StdioServerTransport();
            logger.info('GASSAPI MCP Server starting...', { module: 'McpServer' });
            logger.info('Server capability: tools available', { module: 'McpServer' });
            logger.info(`${this.tools.size} tools registered`, {
                toolsCount: this.tools.size,
                module: 'McpServer'
            });
            await this.server.connect(transport);
            logger.info('GASSAPI MCP Server connected and ready', { module: 'McpServer' });
        }
        catch (error) {
            logger.error('Failed to start MCP server', {
                error: error instanceof Error ? error.message : String(error),
                module: 'McpServer'
            });
            throw error;
        }
    }
    /**
     * Handle MCP initialize request
     * Migrated from original implementation
     */
    async handleInitialize(request) {
        try {
            logger.info(`MCP client initialized: ${request.params.clientInfo.name}`, {
                clientName: request.params.clientInfo.name,
                module: 'McpServer'
            });
            // Validate protocol version
            if (!this.isProtocolVersionSupported(request.params.protocolVersion)) {
                throw new Error(`Unsupported protocol version: ${request.params.protocolVersion}`);
            }
            const result = {
                protocolVersion: '2024-11-05',
                capabilities: {
                    tools: {
                        listChanged: true
                    }
                },
                serverInfo: {
                    name: 'GASSAPI MCP Client',
                    version: '1.0.0'
                }
            };
            logger.info('MCP initialization successful', { module: 'McpServer' });
            return result;
        }
        catch (error) {
            logger.error('MCP initialization failed', {
                error: error instanceof Error ? error.message : String(error),
                module: 'McpServer'
            });
            throw error;
        }
    }
    /**
     * Handle tools/list request
     * Fixed to ensure consistency with tool registration
     */
    async handleListTools() {
        try {
            // Ensure tools are loaded
            await this.ensureToolsLoaded();
            // Use the same tools that are registered for execution
            const toolList = Array.from(this.tools.values());
            logger.info(`Tools list requested: ${toolList.length} tools available`, {
                toolsCount: toolList.length,
                availableTools: this.availableTools.length,
                module: 'McpServer'
            });
            return {
                tools: toolList.map(tool => ({
                    name: tool.name,
                    description: tool.description,
                    inputSchema: tool.inputSchema
                }))
            };
        }
        catch (error) {
            logger.error('Failed to list tools', {
                error: error instanceof Error ? error.message : String(error),
                module: 'McpServer'
            });
            throw error;
        }
    }
    /**
     * Handle tools/call request
     * Fixed to ensure consistency with tool registration
     */
    async handleToolCall(request) {
        try {
            // Ensure tools are loaded
            await this.ensureToolsLoaded();
            const { name, arguments: args } = request.params;
            logger.info(`Tool call: ${name}`, {
                toolName: name,
                arguments: args,
                module: 'McpServer'
            });
            // Check if tool exists in registered tools (not just availableTools)
            if (!this.tools.has(name)) {
                throw new Error(`Unknown tool: ${name}`);
            }
            // Route to appropriate tool handler using pre-imported handlers
            try {
                if (this.toolHandlers[name]) {
                    return await this.toolHandlers[name](args || {});
                }
                else {
                    throw new Error(`Tool handler not found: ${name}`);
                }
            }
            catch (handlerError) {
                throw new Error(`Failed to execute tool ${name}: ${handlerError instanceof Error ? handlerError.message : 'Unknown error'}`);
            }
        }
        catch (error) {
            logger.error(`Tool ${request.params.name} failed`, {
                error: error instanceof Error ? error.message : String(error),
                toolName: request.params.name,
                module: 'McpServer'
            });
            return {
                content: [
                    {
                        type: 'text',
                        text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }
                ],
                isError: true
            };
        }
    }
    /**
     * Handle health_check tool
     * Fixed to use registered tools
     */
    async handleHealthCheck(args) {
        try {
            const uptime = (Date.now() - this.startTime) / 1000;
            const memory = process.memoryUsage();
            // Ensure tools are loaded
            await this.ensureToolsLoaded();
            const status = {
                server: 'GASSAPI MCP Client',
                version: '1.0.0',
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: uptime,
                memory: memory,
                tools: Array.from(this.tools.keys()),
                migration_status: 'Step 1 - Core Framework Migrated'
            };
            return {
                content: [
                    {
                        type: 'text',
                        text: `✅ GASSAPI MCP Server Status\n\n${JSON.stringify(status, null, 2)}`
                    }
                ]
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `❌ Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }
                ],
                isError: true
            };
        }
    }
    /**
     * Check if protocol version is supported
     */
    isProtocolVersionSupported(version) {
        const supportedVersions = ['2024-11-05', '2025-03-26', '2025-06-18'];
        return supportedVersions.includes(version);
    }
    /**
     * Stop MCP server
     */
    async shutdown() {
        try {
            await this.server.close();
            logger.info('MCP Server shutdown complete', { module: 'McpServer' });
        }
        catch (error) {
            logger.error('Error during shutdown', {
                error: error instanceof Error ? error.message : String(error),
                module: 'McpServer'
            });
            throw error;
        }
    }
    /**
     * Get server status
     */
    getStatus() {
        try {
            const uptime = (Date.now() - this.startTime) / 1000;
            return {
                status: 'ok',
                details: {
                    version: '1.0.0',
                    uptime: uptime,
                    toolsCount: this.tools.size,
                    tools: Array.from(this.tools.keys()),
                    toolsLoaded: this.toolsLoaded,
                    migrationStatus: 'Step 1 - Core Framework Migrated'
                },
                timestamp: Date.now()
            };
        }
        catch (error) {
            return {
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: Date.now()
            };
        }
    }
    /**
     * Add tool dynamically (for migration)
     */
    addTool(tool) {
        this.tools.set(tool.name, tool);
        // Also add to available tools to maintain consistency
        this.availableTools.push(tool);
        logger.info(`Tool added: ${tool.name}`, {
            toolName: tool.name,
            totalTools: this.tools.size,
            module: 'McpServer'
        });
    }
    /**
     * Get all registered tools
     */
    getTools() {
        return Array.from(this.tools.values());
    }
}
//# sourceMappingURL=server.js.map