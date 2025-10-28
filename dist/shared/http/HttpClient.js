/**
 * Shared HTTP Client for MCP2 Tools
 * Centralized HTTP logic to eliminate duplication across modules
 */
export class HttpClient {
    constructor(defaultHeaders = {}, defaultTimeout = 30000) {
        this.defaultHeaders = {
            'User-Agent': 'GASSAPI-MCP-Client/2.0',
            ...defaultHeaders
        };
        this.defaultTimeout = defaultTimeout;
    }
    /**
     * Execute HTTP request with standardized error handling
     */
    async request(options) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.defaultTimeout);
        try {
            const startTime = Date.now();
            const requestHeaders = {
                ...this.defaultHeaders,
                ...(options.headers || {})
            };
            const fetchOptions = {
                method: options.method,
                headers: requestHeaders,
                signal: controller.signal
            };
            if (options.body && ['POST', 'PUT', 'PATCH'].includes(options.method)) {
                if (typeof options.body === 'object') {
                    fetchOptions.body = JSON.stringify(options.body);
                    requestHeaders['Content-Type'] = 'application/json';
                }
                else {
                    fetchOptions.body = options.body;
                }
            }
            const response = await fetch(options.url, fetchOptions);
            const responseTime = Date.now() - startTime;
            clearTimeout(timeoutId);
            const responseHeaders = {};
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });
            let responseBody = null;
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                try {
                    responseBody = await response.json();
                }
                catch (error) {
                    responseBody = await response.text();
                }
            }
            else {
                responseBody = await response.text();
            }
            return {
                success: response.ok,
                data: responseBody,
                status: response.status,
                statusText: response.statusText,
                headers: responseHeaders,
                responseTime,
                error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
            };
        }
        catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                return {
                    success: false,
                    status: 0,
                    statusText: 'Request Timeout',
                    headers: {},
                    responseTime: options.timeout || this.defaultTimeout,
                    error: `Request timeout after ${options.timeout || this.defaultTimeout}ms`
                };
            }
            return {
                success: false,
                status: 0,
                statusText: 'Network Error',
                headers: {},
                responseTime: 0,
                error: error.message || 'Network error occurred'
            };
        }
    }
    /**
     * Convenience methods for common HTTP operations
     */
    async get(url, headers, timeout) {
        return this.request({ method: 'GET', url, headers, timeout });
    }
    async post(url, body, headers, timeout) {
        return this.request({ method: 'POST', url, body, headers, timeout });
    }
    async put(url, body, headers, timeout) {
        return this.request({ method: 'PUT', url, body, headers, timeout });
    }
    async patch(url, body, headers, timeout) {
        return this.request({ method: 'PATCH', url, body, headers, timeout });
    }
    async delete(url, headers, timeout) {
        return this.request({ method: 'DELETE', url, headers, timeout });
    }
}
//# sourceMappingURL=HttpClient.js.map