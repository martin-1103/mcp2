/**
 * Environment Module Index
 * Main entry point for environment operations
 */
export { environmentTools, listEnvironmentsTool, getEnvironmentDetailsTool, createEnvironmentTool, updateEnvironmentVariablesTool, setDefaultEnvironmentTool, deleteEnvironmentTool } from './tools.js';
export { handleListEnvironments } from './handlers/listHandler.js';
export { handleGetEnvironmentDetails, handleCreateEnvironment, handleDeleteEnvironment } from './handlers/detailsHandler.js';
export { handleUpdateEnvironmentVariables, handleSetDefaultEnvironment } from './handlers/updateHandler.js';
export { EnvironmentService } from './services/EnvironmentService.js';
export * from './types.js';
