/**
 * Utility functions for endpoint management tools
 */
/**
 * Format headers object to string
 */
export function formatHeaders(headers) {
    if (!headers || Object.keys(headers).length === 0) {
        return '{}';
    }
    return JSON.stringify(headers); // Remove formatting for backend compatibility
}
/**
 * Parse headers string to object
 */
export function parseHeaders(headersStr) {
    if (!headersStr || headersStr === '{}') {
        return {};
    }
    try {
        const parsed = JSON.parse(headersStr);
        return typeof parsed === 'object' ? parsed : {};
    }
    catch (e) {
        return {};
    }
}
/**
 * Format body value
 */
export function formatBody(body) {
    if (!body) {
        return '{}';
    }
    if (typeof body === 'string') {
        return body;
    }
    return JSON.stringify(body, null, 2);
}
/**
 * Validate endpoint data
 */
export function validateEndpointData(data) {
    const errors = [];
    if (!data.name || data.name.trim() === '') {
        errors.push('Endpoint name is required');
    }
    if (!data.method) {
        errors.push('HTTP method is required');
    }
    if (!data.url || data.url.trim() === '') {
        errors.push('URL is required');
    }
    if (!data.folder_id) {
        errors.push('Folder ID is required');
    }
    return errors;
}
/**
 * Validate update endpoint data
 */
export function validateUpdateData(data) {
    const errors = [];
    if (!data.endpoint_id) {
        errors.push('Endpoint ID is required');
    }
    if (!data.updateData || Object.keys(data.updateData).length === 0) {
        errors.push('At least one field to update is required');
    }
    return errors;
}
/**
 * Format endpoint list text
 */
export function formatEndpointListText(endpoints, folderId, method) {
    let endpointText = `🔗 Endpoints List (${endpoints.length}):\n\n`;
    if (endpoints.length === 0) {
        endpointText += 'No endpoints found';
        if (folderId)
            endpointText += ' in this folder';
        if (method)
            endpointText += ` with method ${method}`;
        endpointText += '.\n';
        endpointText += 'Use create_endpoint tool to add your first endpoint.\n';
    }
    else {
        // Group by folder if no folder filter
        if (!folderId) {
            const byFolder = {};
            endpoints.forEach(endpoint => {
                const folderId = endpoint.folder_id || 'unknown';
                if (!byFolder[folderId])
                    byFolder[folderId] = [];
                byFolder[folderId].push(endpoint);
            });
            Object.entries(byFolder).forEach(([folderId, folderEndpoints]) => {
                endpointText += `📁 Folder ${folderId}:\n`;
                folderEndpoints.forEach((endpoint, index) => {
                    endpointText += `  ${index + 1}. ${endpoint.method} ${endpoint.name} (${endpoint.id})\n`;
                    endpointText += `     ${endpoint.url}\n`;
                    if (endpoint.description) {
                        endpointText += `     📝 ${endpoint.description}\n`;
                    }
                    endpointText += '\n';
                });
            });
        }
        else {
            // Simple list when folder is specified
            endpoints.forEach((endpoint, index) => {
                endpointText += `${index + 1}. ${endpoint.method} ${endpoint.name} (${endpoint.id})\n`;
                endpointText += `   ${endpoint.url}\n`;
                if (endpoint.description) {
                    endpointText += `   📝 ${endpoint.description}\n`;
                }
                endpointText += '\n';
            });
        }
    }
    endpointText += `📊 Total endpoints: ${endpoints.length}`;
    return endpointText;
}
/**
 * Format endpoint details text
 */
export function formatEndpointDetailsText(endpoint) {
    const headers = parseHeaders(endpoint.headers);
    const body = endpoint.body;
    let detailsText = `🔗 Endpoint Details\n\n`;
    detailsText += `🏷️  Name: ${endpoint.name}\n`;
    detailsText += `🆔 ID: ${endpoint.id}\n`;
    detailsText += `📡 Method: ${endpoint.method}\n`;
    detailsText += `🌐 URL: ${endpoint.url}\n`;
    detailsText += `📝 Description: ${endpoint.description || 'No description'}\n`;
    if (endpoint.folder) {
        detailsText += `📁 Folder: ${endpoint.folder.name} (${endpoint.folder.id})\n`;
    }
    if (Object.keys(headers).length > 0) {
        detailsText += `\n📋 Headers (${Object.keys(headers).length}):\n`;
        Object.entries(headers).forEach(([key, value], index) => {
            detailsText += `   ${index + 1}. ${key}: ${value}\n`;
        });
    }
    if (body && body !== '{}') {
        detailsText += `\n💾 Body:\n`;
        detailsText += `   ${body}\n`;
    }
    detailsText += `\n📅 Created: ${endpoint.created_at}\n`;
    detailsText += `🔄 Updated: ${endpoint.updated_at}\n`;
    return detailsText;
}
/**
 * Format endpoint creation text
 */
export function formatEndpointCreateText(endpoint) {
    let createText = `✅ Endpoint Created Successfully\n\n`;
    createText += `🏷️  Name: ${endpoint.name}\n`;
    createText += `🆔 ID: ${endpoint.id}\n`;
    createText += `📡 Method: ${endpoint.method}\n`;
    createText += `🌐 URL: ${endpoint.url}\n`;
    createText += `📝 Description: ${endpoint.description || 'No description'}\n`;
    createText += `📁 Folder: ${endpoint.folder_id}\n`;
    createText += `📅 Created: ${endpoint.created_at}\n`;
    return createText;
}
/**
 * Format endpoint update text
 */
export function formatEndpointUpdateText(endpoint) {
    let updateText = `✅ Endpoint Updated Successfully\n\n`;
    updateText += `🏷️  Name: ${endpoint.name}\n`;
    updateText += `🆔 ID: ${endpoint.id}\n`;
    updateText += `📡 Method: ${endpoint.method}\n`;
    updateText += `🌐 URL: ${endpoint.url}\n`;
    updateText += `📝 Description: ${endpoint.description || 'No description'}\n`;
    updateText += `📁 Folder: ${endpoint.folder_id}\n`;
    updateText += `🔄 Updated: ${endpoint.updated_at}\n`;
    return updateText;
}
/**
 * Format endpoint move text
 */
export function formatEndpointMoveText(endpoint) {
    let moveText = `✅ Endpoint Moved Successfully\n\n`;
    moveText += `🏷️  Name: ${endpoint.name}\n`;
    moveText += `🆔 ID: ${endpoint.id}\n`;
    moveText += `📁 New Folder: ${endpoint.folder_id}\n`;
    moveText += `📡 Method: ${endpoint.method}\n`;
    moveText += `🌐 URL: ${endpoint.url}\n`;
    return moveText;
}
/**
 * Format endpoint delete text
 */
export function formatEndpointDeleteText(endpointId, success, message) {
    if (success) {
        let deleteText = `✅ Endpoint deleted successfully\n\n`;
        deleteText += `📋 Details:\n`;
        deleteText += `• Endpoint ID: ${endpointId}\n`;
        deleteText += `• Status: Deleted\n`;
        if (message) {
            deleteText += `• Message: ${message}\n`;
        }
        deleteText += `\n⚠️  Note: This action cannot be undone.`;
        return deleteText;
    }
    else {
        let deleteText = `❌ Failed to delete endpoint\n\n`;
        deleteText += `📋 Details:\n`;
        deleteText += `• Endpoint ID: ${endpointId}\n`;
        deleteText += `• Error: ${message || 'Unknown error'}\n`;
        return deleteText;
    }
}
//# sourceMappingURL=utils.js.map