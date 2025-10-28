/**
 * MCP Session Management System
 * Handles persistent state across multiple MCP tool calls
 */
import { EventEmitter } from 'events';
export interface SessionState {
    jwtToken?: string;
    environment: Record<string, string>;
    flowInputs: Record<string, any>;
    stepOutputs: Record<string, any>;
    runtimeVars: Record<string, any>;
    config: Record<string, any>;
    sessionId: string;
    createdAt: Date;
    lastActivity: Date;
}
export interface McpResponse {
    success: boolean;
    data?: any;
    error?: string;
    content?: Array<{
        type: 'text' | 'image' | 'resource';
        text?: string;
        data?: string;
        mimeType?: string;
    }>;
}
/**
 * MCP Session Class
 * Manages persistent MCP server connection and state
 */
export declare class McpSession extends EventEmitter {
    private serverProcess;
    private state;
    private initialized;
    private requestId;
    private pendingRequests;
    constructor();
    /**
     * Generate unique session ID
     */
    private generateSessionId;
    /**
     * Initialize MCP server connection
     */
    initialize(): Promise<void>;
    /**
     * Process server response
     */
    private processResponse;
    /**
     * Send request to MCP server
     */
    private sendRequest;
    /**
     * Call MCP tool with state injection
     */
    call(toolName: string, args?: Record<string, any>): Promise<string>;
    /**
     * Set environment variables
     */
    setEnvironment(variables: Record<string, string>): void;
    /**
     * Set flow inputs
     */
    setFlowInputs(inputs: Record<string, any>): void;
    /**
     * Set step output
     */
    setStepOutput(stepId: string, outputs: Record<string, any>): void;
    /**
     * Set runtime variables
     */
    setRuntimeVar(name: string, value: any): void;
    /**
     * Set configuration
     */
    setConfig(config: Record<string, any>): void;
    /**
     * Get complete session state
     */
    getState(): SessionState;
    /**
     * Get session info
     */
    getSessionInfo(): {
        sessionId: string;
        createdAt: Date;
        lastActivity: Date;
        uptime: number;
        stateCounts: {
            environment: number;
            flowInputs: number;
            stepOutputs: number;
            runtimeVars: number;
        };
    };
    /**
     * Clear specific state type
     */
    clearState(stateType: 'environment' | 'flowInputs' | 'stepOutputs' | 'runtimeVars'): void;
    /**
     * Reset all state
     */
    resetState(): void;
    /**
     * Close session and cleanup
     */
    close(): Promise<void>;
    /**
     * Force cleanup
     */
    private cleanup;
}
