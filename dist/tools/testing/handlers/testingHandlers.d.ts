/**
 * Testing Handlers
 * Handles all testing-related requests
 */
import { McpToolResponse } from '../../../types.js';
/**
 * Test endpoint handler
 */
export declare function handleTestEndpoint(args: any): Promise<McpToolResponse>;
/**
 * Test multiple endpoints handler
 */
export declare function handleTestMultipleEndpoints(args: any): Promise<McpToolResponse>;
/**
 * Create test suite handler
 */
export declare function handleCreateTestSuite(args: any): Promise<McpToolResponse>;
/**
 * List test suites handler
 */
export declare function handleListTestSuites(args: any): Promise<McpToolResponse>;
