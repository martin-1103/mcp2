/**
 * Tool handlers implementation for endpoint management
 *
 * This file has been refactored into modular components.
 * All functionality is preserved while improving maintainability.
 */

import { EndpointToolHandler } from './types.js';
import {
  listEndpointsTool,
  getEndpointDetailsTool,
  createEndpointTool,
  updateEndpointTool,
  deleteEndpointTool
} from './tools.js';
import {
  handleListEndpoints,
  handleGetEndpointDetails,
  handleCreateEndpoint,
  handleUpdateEndpoint,
  handleDeleteEndpoint
} from './handlers/index.js';

// Re-export handlers from individual modules
export {
  handleListEndpoints,
  handleGetEndpointDetails,
  handleCreateEndpoint,
  handleUpdateEndpoint,
  handleDeleteEndpoint
};

/**
 * Create all endpoint tool handlers
 */
export function createEndpointToolHandlers(): Record<string, EndpointToolHandler> {
  return {
    [listEndpointsTool.name]: handleListEndpoints,
    [getEndpointDetailsTool.name]: handleGetEndpointDetails,
    [createEndpointTool.name]: handleCreateEndpoint,
    [updateEndpointTool.name]: handleUpdateEndpoint,
    [deleteEndpointTool.name]: handleDeleteEndpoint
  };
}