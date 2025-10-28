/**
 * Testing Handlers
 * Handles all testing-related requests
 */
import { ConfigManager } from '../../../config.js';
import { BackendClient } from '../../../client/BackendClient.js';
import { TestingService } from '../services/TestingService.js';
// Initialize services
let configManager = null;
let backendClient = null;
/**
 * Get singleton instances
 */
async function getInstances() {
    if (!configManager) {
        configManager = new ConfigManager();
        await configManager.detectProjectConfig();
    }
    if (!backendClient) {
        const mcpToken = configManager.getMcpToken();
        if (!mcpToken) {
            throw new Error('Configuration tidak lengkap: perlu mcpToken');
        }
        backendClient = new BackendClient(mcpToken);
    }
    return { configManager, backendClient };
}
/**
 * Test endpoint handler
 */
export async function handleTestEndpoint(args) {
    try {
        const { endpointId, environmentId, variables, timeout } = args;
        if (!endpointId) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: 'Endpoint ID is required'
                        }, null, 2)
                    }
                ]
            };
        }
        const instances = await getInstances();
        // Create testing service
        const testingService = new TestingService(instances.backendClient.getBaseUrl(), instances.backendClient.getToken());
        // Parse variables
        let parsedVariables = {};
        if (variables) {
            if (typeof variables === 'string') {
                try {
                    parsedVariables = JSON.parse(variables);
                }
                catch (e) {
                    // Try parsing as key=value pairs
                    variables.split(',').forEach((pair) => {
                        const [key, value] = pair.split('=').map(s => s.trim());
                        if (key) {
                            parsedVariables[key] = value || '';
                        }
                    });
                }
            }
            else if (typeof variables === 'object') {
                parsedVariables = variables;
            }
        }
        // Test endpoint
        const request = {
            endpointId,
            environmentId,
            variables: parsedVariables,
            timeout
        };
        const response = await testingService.testEndpoint(request);
        if (!response.success) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: response.error || 'Failed to test endpoint',
                            request: undefined,
                            response: undefined
                        }, null, 2)
                    }
                ]
            };
        }
        const result = response.data;
        // Format response
        let testText = `🧪 Endpoint Test Results\n\n`;
        testText += `📋 Endpoint: ${result?.endpointName || 'Unknown'} (${result?.endpointId || 'Unknown'})\n`;
        testText += `✅ Status: ${result?.success ? 'PASSED' : 'FAILED'}\n`;
        testText += `⏱️  Response Time: ${result?.executionTime || 0}ms\n`;
        if (result?.request) {
            testText += `\n📤 Request:\n`;
            testText += `   Method: ${result.request.method}\n`;
            testText += `   URL: ${result.request.url}\n`;
            if (Object.keys(result.request.headers).length > 0) {
                testText += `   Headers: ${JSON.stringify(result.request.headers, null, 2)}\n`;
            }
            if (result.request.body) {
                testText += `   Body: ${JSON.stringify(result.request.body, null, 2)}\n`;
            }
        }
        if (result?.response) {
            testText += `\n📥 Response:\n`;
            testText += `   Status: ${result.response.status} ${result.response.statusText}\n`;
            testText += `   Response Time: ${result.response.responseTime}ms\n`;
            if (result.response.error) {
                testText += `   Error: ${result.response.error}\n`;
            }
            if (result.response.data) {
                testText += `   Body: ${JSON.stringify(result.response.data, null, 2)}\n`;
            }
        }
        if (result?.error) {
            testText += `\n❌ Error: ${result.error}\n`;
        }
        return {
            content: [
                {
                    type: 'text',
                    text: testText
                }
            ]
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error.message || 'Unknown error occurred while testing endpoint'
                    }, null, 2)
                }
            ]
        };
    }
}
/**
 * Test multiple endpoints handler
 */
export async function handleTestMultipleEndpoints(args) {
    try {
        const { endpointIds, environmentId, variables, config } = args;
        if (!endpointIds || !Array.isArray(endpointIds) || endpointIds.length === 0) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: 'Endpoint IDs array is required'
                        }, null, 2)
                    }
                ]
            };
        }
        const instances = await getInstances();
        // Create testing service
        const testingService = new TestingService(instances.backendClient.getBaseUrl(), instances.backendClient.getToken());
        // Parse variables
        let parsedVariables = {};
        if (variables) {
            if (typeof variables === 'string') {
                try {
                    parsedVariables = JSON.parse(variables);
                }
                catch (e) {
                    variables.split(',').forEach((pair) => {
                        const [key, value] = pair.split('=').map(s => s.trim());
                        if (key) {
                            parsedVariables[key] = value || '';
                        }
                    });
                }
            }
            else if (typeof variables === 'object') {
                parsedVariables = variables;
            }
        }
        // Test endpoints
        const request = {
            endpointIds,
            environmentId,
            variables: parsedVariables,
            config
        };
        const response = await testingService.testMultipleEndpoints(request);
        if (!response.success) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: response.error || 'Failed to test endpoints'
                        }, null, 2)
                    }
                ]
            };
        }
        const result = response.data;
        if (!result) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: 'No test results returned'
                        }, null, 2)
                    }
                ]
            };
        }
        // Format response
        let batchText = `🧪 Batch Test Results\n\n`;
        batchText += `📊 Summary:\n`;
        batchText += `   Total Tests: ${result.data?.totalTests}\n`;
        batchText += `   ✅ Passed: ${result.data?.passedTests}\n`;
        batchText += `   ❌ Failed: ${result.data?.failedTests}\n`;
        batchText += `   ⏱️  Total Time: ${result.data?.executionTime}ms\n`;
        batchText += `   📈 Success Rate: ${((result.data?.passedTests || 0) / (result.data?.totalTests || 1)) * 100}%\n\n`;
        if (result.data?.results && result.data.results.length > 0) {
            batchText += `📋 Individual Results:\n`;
            result.data.results.forEach((testResult, index) => {
                batchText += `${index + 1}. ${testResult.endpointName}\n`;
                batchText += `   Status: ${testResult.success ? '✅ PASSED' : '❌ FAILED'}\n`;
                batchText += `   Time: ${testResult.executionTime}ms\n`;
                if (testResult.response) {
                    batchText += `   HTTP: ${testResult.response.status} ${testResult.response.statusText}\n`;
                }
                if (testResult.error) {
                    batchText += `   Error: ${testResult.error}\n`;
                }
                batchText += '\n';
            });
        }
        return {
            content: [
                {
                    type: 'text',
                    text: batchText
                }
            ]
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error.message || 'Unknown error occurred while testing endpoints'
                    }, null, 2)
                }
            ]
        };
    }
}
/**
 * Create test suite handler
 */
export async function handleCreateTestSuite(args) {
    try {
        const { name, description, endpointIds, environmentId, config } = args;
        if (!name) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: 'Test suite name is required'
                        }, null, 2)
                    }
                ]
            };
        }
        if (!endpointIds || !Array.isArray(endpointIds) || endpointIds.length === 0) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: 'Endpoint IDs array is required'
                        }, null, 2)
                    }
                ]
            };
        }
        const instances = await getInstances();
        // Create testing service
        const testingService = new TestingService(instances.backendClient.getBaseUrl(), instances.backendClient.getToken());
        // Create test suite
        const request = {
            name: name.trim(),
            description: description?.trim(),
            endpointIds,
            environmentId,
            config
        };
        const response = await testingService.createTestSuite(request);
        if (!response.success) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: response.error || 'Failed to create test suite'
                        }, null, 2)
                    }
                ]
            };
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: true,
                        data: response.data,
                        message: 'Test suite created successfully'
                    }, null, 2)
                }
            ]
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error.message || 'Unknown error occurred while creating test suite'
                    }, null, 2)
                }
            ]
        };
    }
}
/**
 * List test suites handler
 */
export async function handleListTestSuites(args) {
    try {
        const { projectId, activeOnly } = args;
        const instances = await getInstances();
        // Create testing service
        const testingService = new TestingService(instances.backendClient.getBaseUrl(), instances.backendClient.getToken());
        // List test suites
        const request = {
            projectId,
            activeOnly
        };
        const response = await testingService.listTestSuites(request);
        if (!response.success) {
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            success: false,
                            error: response.error || 'Failed to list test suites'
                        }, null, 2)
                    }
                ]
            };
        }
        const suites = response.data || [];
        // Format response
        let suiteText = `🧪 Test Suites (${suites.length}):\n\n`;
        if (suites.length === 0) {
            suiteText += 'No test suites found.\n';
            suiteText += 'Use create_test_suite tool to create your first test suite.\n';
        }
        else {
            suites.forEach((suite, index) => {
                suiteText += `${index + 1}. ${suite.name}\n`;
                if (suite.description) {
                    suiteText += `   - ${suite.description}\n`;
                }
                suiteText += `   - ${suite.endpoints.length} endpoint(s)\n`;
                suiteText += `   - Created: ${suite.createdAt}\n`;
                suiteText += '\n';
            });
        }
        return {
            content: [
                {
                    type: 'text',
                    text: suiteText
                }
            ]
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        success: false,
                        error: error.message || 'Unknown error occurred while listing test suites'
                    }, null, 2)
                }
            ]
        };
    }
}
//# sourceMappingURL=testingHandlers.js.map