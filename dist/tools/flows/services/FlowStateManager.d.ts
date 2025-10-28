/**
 * Flow State Manager Service
 * Manages flow state, variables, and execution tracking
 */
import { FlowState, FlowValidationResult, FlowStep, FlowConfig } from '../types.js';
export declare class FlowStateManager {
    private activeFlows;
    private flowHistory;
    /**
     * Create a new flow state
     */
    createFlowState(flowId: string, steps: FlowStep[]): FlowState;
    /**
     * Get flow state by ID
     */
    getFlowState(flowId: string): FlowState | undefined;
    /**
     * Update flow state
     */
    updateFlowState(flowId: string, updates: Partial<FlowState>): FlowState | null;
    /**
     * Start flow execution
     */
    startFlow(flowId: string): FlowState | null;
    /**
     * Complete flow execution
     */
    completeFlow(flowId: string, success: boolean): FlowState | null;
    /**
     * Stop flow execution
     */
    stopFlow(flowId: string): FlowState | null;
    /**
     * Update flow variables
     */
    updateFlowVariables(flowId: string, variables: Record<string, any>): FlowState | null;
    /**
     * Add step result to flow
     */
    addStepResult(flowId: string, result: any): FlowState | null;
    /**
     * Add error to flow
     */
    addFlowError(flowId: string, error: string): FlowState | null;
    /**
     * Get all active flows
     */
    getActiveFlows(): FlowState[];
    /**
     * Get flow history
     */
    getFlowHistory(flowId: string): FlowState[];
    /**
     * Clean up old flow states
     */
    cleanup(maxAge?: number): void;
    /**
     * Validate flow configuration
     */
    validateFlow(steps: FlowStep[], config?: FlowConfig): FlowValidationResult;
    /**
     * Get flow statistics
     */
    getFlowStats(): {
        active: number;
        completed: number;
        failed: number;
        stopped: number;
        totalExecutions: number;
    };
    /**
     * Export flow state for persistence
     */
    exportFlowState(flowId: string): any | null;
    /**
     * Import flow state
     */
    importFlowState(stateData: any): FlowState | null;
    /**
     * Move flow to history
     */
    private moveToHistory;
}
