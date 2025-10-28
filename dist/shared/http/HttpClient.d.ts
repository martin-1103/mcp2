/**
 * Shared HTTP Client for MCP2 Tools
 * Centralized HTTP logic to eliminate duplication across modules
 */
export interface HttpResponse<T = any> {
    success: boolean;
    data?: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    responseTime: number;
    error?: string;
}
export interface HttpRequestOptions {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: any;
    timeout?: number;
}
export declare class HttpClient {
    private defaultHeaders;
    private defaultTimeout;
    constructor(defaultHeaders?: Record<string, string>, defaultTimeout?: number);
    /**
     * Execute HTTP request with standardized error handling
     */
    request<T = any>(options: HttpRequestOptions): Promise<HttpResponse<T>>;
    /**
     * Convenience methods for common HTTP operations
     */
    get<T = any>(url: string, headers?: Record<string, string>, timeout?: number): Promise<HttpResponse<T>>;
    post<T = any>(url: string, body?: any, headers?: Record<string, string>, timeout?: number): Promise<HttpResponse<T>>;
    put<T = any>(url: string, body?: any, headers?: Record<string, string>, timeout?: number): Promise<HttpResponse<T>>;
    patch<T = any>(url: string, body?: any, headers?: Record<string, string>, timeout?: number): Promise<HttpResponse<T>>;
    delete<T = any>(url: string, headers?: Record<string, string>, timeout?: number): Promise<HttpResponse<T>>;
}
