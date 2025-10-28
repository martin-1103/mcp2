/**
 * Shared utilities for MCP2 Tools
 * Common helper functions used across modules
 */
import { ValidationError } from '../types/index.js';
/**
 * Validation utilities
 */
export declare class ValidationUtils {
    /**
     * Validate required fields
     */
    static validateRequired(data: any, requiredFields: string[]): ValidationError[];
    /**
     * Validate URL format
     */
    static validateUrl(url: string): boolean;
    /**
     * Validate HTTP method
     */
    static validateHttpMethod(method: string): boolean;
    /**
     * Validate timeout value
     */
    static validateTimeout(timeout: any): boolean;
}
/**
 * String interpolation utilities
 */
export declare class StringUtils {
    /**
     * Simple template interpolation
     */
    static interpolate(template: string, variables: Record<string, any>): string;
    /**
     * Convert object to query string
     */
    static toQueryString(obj: Record<string, any>): string;
    /**
     * Generate random ID
     */
    static generateId(length?: number): string;
    /**
     * Truncate string with ellipsis
     */
    static truncate(str: string, maxLength: number): string;
}
/**
 * Time utilities
 */
export declare class TimeUtils {
    /**
     * Format milliseconds to human readable format
     */
    static formatDuration(ms: number): string;
    /**
     * Get current timestamp in ISO format
     */
    static now(): string;
    /**
     * Parse timeout value with default
     */
    static parseTimeout(value?: any, defaultValue?: number): number;
}
/**
 * Object utilities
 */
export declare class ObjectUtils {
    /**
     * Deep merge objects
     */
    static deepMerge(target: any, source: any): any;
    /**
     * Remove undefined values from object
     */
    static removeUndefined(obj: any): any;
    /**
     * Pick specific keys from object
     */
    static pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
}
/**
 * Error utilities
 */
export declare class ErrorUtils {
    /**
     * Create standardized error response
     */
    static createErrorResponse(message: string, code?: string, details?: any): {
        success: boolean;
        error: string;
        code: string;
        details: any;
        timestamp: string;
    };
    /**
     * Extract meaningful error message from error object
     */
    static extractMessage(error: any): string;
    /**
     * Check if error is network related
     */
    static isNetworkError(error: any): boolean;
}
/**
 * Async utilities
 */
export declare class AsyncUtils {
    /**
     * Sleep for specified milliseconds
     */
    static sleep(ms: number): Promise<void>;
    /**
     * Execute with timeout
     */
    static withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T>;
    /**
     * Retry async function
     */
    static retry<T>(fn: () => Promise<T>, maxAttempts?: number, delayMs?: number): Promise<T>;
}
