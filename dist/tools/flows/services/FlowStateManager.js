/**
 * Flow State Manager Service
 * Manages flow state, variables, and execution tracking
 */
import { TimeUtils } from '../../../shared/utils/index.js';
export class FlowStateManager {
    constructor() {
        this.activeFlows = new Map();
        this.flowHistory = new Map();
    }
    /**
     * Create a new flow state
     */
    createFlowState(flowId, steps) {
        const state = {
            id: flowId,
            status: 'idle',
            totalSteps: steps.length,
            currentStep: 0,
            variables: {},
            results: [],
            errors: []
        };
        this.activeFlows.set(flowId, state);
        return state;
    }
    /**
     * Get flow state by ID
     */
    getFlowState(flowId) {
        return this.activeFlows.get(flowId);
    }
    /**
     * Update flow state
     */
    updateFlowState(flowId, updates) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        Object.assign(state, updates);
        return state;
    }
    /**
     * Start flow execution
     */
    startFlow(flowId) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        state.status = 'running';
        state.startTime = TimeUtils.now();
        state.currentStep = 0;
        state.errors = [];
        return state;
    }
    /**
     * Complete flow execution
     */
    completeFlow(flowId, success) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        state.status = success ? 'completed' : 'failed';
        state.endTime = TimeUtils.now();
        if (state.startTime) {
            state.executionTime = new Date(state.endTime).getTime() - new Date(state.startTime).getTime();
        }
        // Move to history
        this.moveToHistory(flowId);
        return state;
    }
    /**
     * Stop flow execution
     */
    stopFlow(flowId) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        state.status = 'stopped';
        state.endTime = TimeUtils.now();
        if (state.startTime) {
            state.executionTime = new Date(state.endTime).getTime() - new Date(state.startTime).getTime();
        }
        this.moveToHistory(flowId);
        return state;
    }
    /**
     * Update flow variables
     */
    updateFlowVariables(flowId, variables) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        state.variables = { ...state.variables, ...variables };
        return state;
    }
    /**
     * Add step result to flow
     */
    addStepResult(flowId, result) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        state.results.push(result);
        state.currentStep = (state.currentStep || 0) + 1;
        return state;
    }
    /**
     * Add error to flow
     */
    addFlowError(flowId, error) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        state.errors.push(error);
        return state;
    }
    /**
     * Get all active flows
     */
    getActiveFlows() {
        return Array.from(this.activeFlows.values());
    }
    /**
     * Get flow history
     */
    getFlowHistory(flowId) {
        return this.flowHistory.get(flowId) || [];
    }
    /**
     * Clean up old flow states
     */
    cleanup(maxAge = 24 * 60 * 60 * 1000) {
        const now = Date.now();
        const toDelete = [];
        // Clean active flows
        for (const [id, state] of this.activeFlows.entries()) {
            if (state.startTime && (now - new Date(state.startTime).getTime()) > maxAge) {
                toDelete.push(id);
            }
        }
        toDelete.forEach(id => this.activeFlows.delete(id));
        // Clean history (keep only last 10 executions per flow)
        for (const [flowId, history] of this.flowHistory.entries()) {
            if (history.length > 10) {
                this.flowHistory.set(flowId, history.slice(-10));
            }
        }
    }
    /**
     * Validate flow configuration
     */
    validateFlow(steps, config) {
        const errors = [];
        const warnings = [];
        // Validate steps
        if (!steps || steps.length === 0) {
            errors.push('Flow must have at least one step');
        }
        else {
            const stepIds = new Set();
            for (let i = 0; i < steps.length; i++) {
                const step = steps[i];
                // Validate step ID
                if (!step.id) {
                    errors.push(`Step ${i + 1} must have an ID`);
                }
                else if (stepIds.has(step.id)) {
                    errors.push(`Duplicate step ID: ${step.id}`);
                }
                else {
                    stepIds.add(step.id);
                }
                // Validate step name
                if (!step.name) {
                    warnings.push(`Step ${step.id} should have a name`);
                }
                // Validate step configuration
                if (!step.method && !step.endpointId) {
                    errors.push(`Step ${step.id} must have either method or endpointId`);
                }
                if (step.method && !step.url && !step.endpointId) {
                    errors.push(`Step ${step.id} must have URL when method is specified`);
                }
                if (step.timeout && step.timeout < 1000) {
                    warnings.push(`Step ${step.id} timeout is very low (${step.timeout}ms)`);
                }
            }
        }
        // Validate config
        if (config) {
            if (config.timeout && config.timeout < 1000) {
                warnings.push('Flow timeout is very low (< 1 second)');
            }
            if (config.parallel && config.maxConcurrency && config.maxConcurrency > 20) {
                warnings.push('High concurrency may cause resource issues');
            }
        }
        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
    }
    /**
     * Get flow statistics
     */
    getFlowStats() {
        const active = Array.from(this.activeFlows.values()).filter(s => s.status === 'running').length;
        const totalHistory = Array.from(this.flowHistory.values()).reduce((sum, history) => sum + history.length, 0);
        const completed = totalHistory + Array.from(this.activeFlows.values()).filter(s => s.status === 'completed').length;
        const failed = Array.from(this.flowHistory.values())
            .flat()
            .filter(s => s.status === 'failed').length +
            Array.from(this.activeFlows.values()).filter(s => s.status === 'failed').length;
        const stopped = Array.from(this.flowHistory.values())
            .flat()
            .filter(s => s.status === 'stopped').length +
            Array.from(this.activeFlows.values()).filter(s => s.status === 'stopped').length;
        return {
            active,
            completed,
            failed,
            stopped,
            totalExecutions: totalHistory + this.activeFlows.size
        };
    }
    /**
     * Export flow state for persistence
     */
    exportFlowState(flowId) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return null;
        return {
            ...state,
            exportedAt: TimeUtils.now()
        };
    }
    /**
     * Import flow state
     */
    importFlowState(stateData) {
        if (!stateData || !stateData.id)
            return null;
        const state = {
            id: stateData.id,
            status: stateData.status || 'idle',
            totalSteps: stateData.totalSteps || 0,
            currentStep: stateData.currentStep || 0,
            startTime: stateData.startTime,
            endTime: stateData.endTime,
            executionTime: stateData.executionTime,
            variables: stateData.variables || {},
            results: stateData.results || [],
            errors: stateData.errors || []
        };
        this.activeFlows.set(state.id, state);
        return state;
    }
    /**
     * Move flow to history
     */
    moveToHistory(flowId) {
        const state = this.activeFlows.get(flowId);
        if (!state)
            return;
        const history = this.flowHistory.get(flowId) || [];
        history.push({ ...state });
        this.flowHistory.set(flowId, history);
        this.activeFlows.delete(flowId);
    }
}
//# sourceMappingURL=FlowStateManager.js.map