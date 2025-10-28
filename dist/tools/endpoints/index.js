/**
 * Main entry point for endpoint management tools
 */
import { ENDPOINT_TOOLS } from './tools.js';
import { createEndpointToolHandlers } from './handlers.js';
// Export all tools
export { ENDPOINT_TOOLS };
// Legacy compatibility
export const TOOLS = ENDPOINT_TOOLS;
// Export tool creators
export { createEndpointToolHandlers };
// Export handlers
export { handleListEndpoints, handleGetEndpointDetails, handleCreateEndpoint, handleUpdateEndpoint } from './handlers.js';
// Export tools individually
export { listEndpointsTool, getEndpointDetailsTool, createEndpointTool, updateEndpointTool } from './tools.js';
// Export utils
export { formatHeaders, parseHeaders, formatBody, validateEndpointData, validateUpdateData, formatEndpointListText, formatEndpointDetailsText, formatEndpointCreateText, formatEndpointUpdateText, formatEndpointMoveText } from './utils.js';
// Export dependencies
export { getEndpointDependencies, resetDependencies } from './dependencies.js';
// Legacy ToolHandlers class for backward compatibility
export class ToolHandlers {
    static async handleListEndpoints(args) {
        const handlers = createEndpointToolHandlers();
        return handlers.list_endpoints(args || {});
    }
    static async handleGetEndpointDetails(args) {
        const handlers = createEndpointToolHandlers();
        return handlers.get_endpoint_details(args);
    }
    static async handleCreateEndpoint(args) {
        const handlers = createEndpointToolHandlers();
        return handlers.create_endpoint(args);
    }
    static async handleUpdateEndpoint(args) {
        const handlers = createEndpointToolHandlers();
        return handlers.update_endpoint(args);
    }
    static async handleMoveEndpoint(args) {
        const handlers = createEndpointToolHandlers();
        return handlers.move_endpoint(args);
    }
}
// Legacy function for backward compatibility
export function createToolHandlers(config) {
    return createEndpointToolHandlers();
}
//# sourceMappingURL=index.js.map