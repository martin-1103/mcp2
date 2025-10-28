/**
 * Testing Service
 * Handles endpoint testing operations using shared HTTP client
 */
import { EndpointTestRequest, EndpointTestResponse, BatchTestRequest, BatchTestResponse, CreateTestSuiteRequest, CreateTestSuiteResponse, ListTestSuitesRequest, ListTestSuitesResponse, TestExecutionResult } from '../types.js';
export declare class TestingService {
    private httpClient;
    private baseUrl;
    constructor(baseUrl: string, token: string);
    /**
     * Test a single endpoint
     */
    testEndpoint(request: EndpointTestRequest): Promise<EndpointTestResponse>;
    /**
     * Test multiple endpoints (batch testing)
     */
    testMultipleEndpoints(request: BatchTestRequest): Promise<BatchTestResponse>;
    /**
     * Create a test suite
     */
    createTestSuite(request: CreateTestSuiteRequest): Promise<CreateTestSuiteResponse>;
    /**
     * List test suites (placeholder implementation)
     */
    listTestSuites(request: ListTestSuitesRequest): Promise<ListTestSuitesResponse>;
    /**
     * Execute test suite
     */
    executeTestSuite(suiteId: string, variables?: Record<string, string>): Promise<TestExecutionResult>;
    /**
     * Execute a single endpoint test
     */
    private executeEndpointTest;
    /**
     * Execute batch tests
     */
    private executeBatchTests;
    /**
     * Get endpoint details from backend
     */
    private getEndpointDetails;
    /**
     * Get environment variables
     */
    private getEnvironmentVariables;
    /**
     * Validate endpoints exist
     */
    private validateEndpoints;
    /**
     * Validate create test suite request
     */
    private validateCreateSuiteRequest;
    /**
     * Parse headers string to object
     */
    private parseHeaders;
    /**
     * Parse body value
     */
    private parseBody;
}
