/**
 * Tool handlers implementation for endpoint management
 *
 * This file has been refactored into modular components.
 * All functionality is preserved while improving maintainability.
 */
import { EndpointToolHandler } from './types.js';
import { handleListEndpoints, handleGetEndpointDetails, handleCreateEndpoint, handleUpdateEndpoint } from './handlers/index.js';
export { handleListEndpoints, handleGetEndpointDetails, handleCreateEndpoint, handleUpdateEndpoint };
/**
 * Create all endpoint tool handlers
 */
export declare function createEndpointToolHandlers(): Record<string, EndpointToolHandler>;
