/**
 * Flow Executor Service
 * Handles the core flow execution logic
 */
import { HttpClient } from '../../../shared/http/HttpClient.js';
import { FlowStep, FlowNodeResult, FlowExecutionOptions } from '../types.js';
export declare class FlowExecutor {
    private httpClient;
    constructor(httpClient?: HttpClient);
    /**
     * Execute a flow with the given context and options
     */
    executeFlow(steps: FlowStep[], initialVariables?: Record<string, any>, options?: FlowExecutionOptions): Promise<{
        success: boolean;
        results: FlowNodeResult[];
        executionTime: number;
        errors: string[];
        variables: Record<string, any>;
    }>;
    /**
     * Execute steps sequentially
     */
    private executeSequential;
    /**
     * Execute steps in parallel
     */
    private executeParallel;
    /**
     * Execute a single step
     */
    private executeStep;
    /**
     * Build HTTP request from step definition
     */
    private buildStepRequest;
    /**
     * Validate step request
     */
    private validateStepRequest;
    /**
     * Utility to chunk array for parallel execution
     */
    private chunkArray;
}
