/**
 * Handler for delete endpoint tool
 */
import { getEndpointDependencies } from '../dependencies.js';
import { formatEndpointDeleteText } from '../utils.js';
import { getApiEndpoints } from '../../../lib/api/endpoints.js';
/**
 * Handle delete endpoint request
 */
export async function handleDeleteEndpoint(args) {
    try {
        console.error('[DELETE-HANDLER] Starting delete endpoint with args:', args);
        console.error('[DELETE-HANDLER] About to get dependencies...');
        const { configManager, backendClient } = await getEndpointDependencies();
        console.error('[DELETE-HANDLER] Dependencies loaded successfully');
        const endpointId = args.endpoint_id;
        // Validate endpoint ID
        if (!endpointId || endpointId.trim() === '') {
            throw new Error('Endpoint ID is required');
        }
        // Get the delete endpoint from API configuration
        const apiEndpoints = getApiEndpoints();
        const endpoint = apiEndpoints.getEndpoint('endpointDelete', { id: endpointId });
        const fullUrl = `${backendClient.getBaseUrl()}${endpoint}`;
        console.error(`[EndpointTools] Deleting endpoint at: ${fullUrl}`);
        // Delete endpoint using BackendClient
        const result = await backendClient.makeRequest(endpoint, {
            method: 'DELETE'
        });
        // Handle nested response structure
        if (result.success && result.data) {
            const responseData = result.data;
            const deleteData = responseData.data || responseData;
            const deleteText = formatEndpointDeleteText(endpointId, true, deleteData?.message || result.message);
            return {
                content: [
                    {
                        type: 'text',
                        text: deleteText
                    }
                ]
            };
        }
        else {
            const deleteText = formatEndpointDeleteText(endpointId, false, result.error || result.message || 'Unknown error');
            return {
                content: [
                    {
                        type: 'text',
                        text: deleteText
                    }
                ],
                isError: true
            };
        }
    }
    catch (error) {
        console.error('[DELETE-HANDLER] Error caught:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const deleteText = formatEndpointDeleteText(args.endpoint_id || 'unknown', false, errorMessage);
        return {
            content: [
                {
                    type: 'text',
                    text: deleteText
                }
            ],
            isError: true
        };
    }
}
//# sourceMappingURL=delete-handler.js.map