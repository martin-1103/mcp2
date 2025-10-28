/**
 * Stateful Variable Interpolation System
 * Supports all variable types with session state context
 */
import { SessionState } from './McpSession';
export interface InterpolationContext {
    state: SessionState;
    currentStepId?: string;
    debugMode?: boolean;
}
/**
 * Enhanced variable interpolation with full state support
 */
export declare class StatefulInterpolator {
    private static readonly VARIABLE_PATTERN;
    private static readonly VALID_TYPES;
    /**
     * Interpolate variables in text with session state context
     */
    static interpolate(text: string, context: InterpolationContext): string;
    /**
     * Extract value from variable expression with state context
     */
    private static extractValue;
    /**
     * Get value from flow inputs
     */
    private static getInputValue;
    /**
     * Get value from environment variables
     */
    private static getEnvironmentValue;
    /**
     * Get value from runtime variables
     */
    private static getRuntimeValue;
    /**
     * Get value from configuration
     */
    private static getConfigValue;
    /**
     * Get value from request headers (during execution)
     */
    private static getHeaderValue;
    /**
     * Get value from step outputs
     */
    private static getStepOutputValue;
    /**
     * Navigate nested object path
     */
    private static navigatePath;
    /**
     * Extract all variable references from text
     */
    static extractVariableReferences(text: string): string[];
    /**
     * Validate variable references against session state
     */
    static validateReferences(references: string[], context: InterpolationContext): {
        valid: string[];
        invalid: {
            reference: string;
            error: string;
        }[];
    };
    /**
     * Build variable summary for debugging
     */
    static buildVariableSummary(context: InterpolationContext): {
        availableInputs: string[];
        availableEnvironment: string[];
        availableRuntime: string[];
        availableConfig: string[];
        availableSteps: string[];
    };
    /**
     * Interpolate object values recursively
     */
    static interpolateObject(obj: any, context: InterpolationContext): any;
    /**
     * Check if text contains variable references
     */
    static hasVariables(text: string): boolean;
    /**
     * Get all variable types used in text
     */
    static getVariableTypes(text: string): string[];
}
