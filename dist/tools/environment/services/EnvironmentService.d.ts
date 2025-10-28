/**
 * Environment Service
 * Handles environment-related operations with backend
 */
import { ListEnvironmentsRequest, ListEnvironmentsResponse, GetEnvironmentDetailsRequest, UpdateEnvironmentVariablesRequest, UpdateEnvironmentVariablesResponse, CreateEnvironmentRequest, CreateEnvironmentResponse, DeleteEnvironmentResponse } from '../types.js';
export declare class EnvironmentService {
    private httpClient;
    private baseUrl;
    constructor(baseUrl: string, token: string);
    /**
     * List all environments for a project
     */
    listEnvironments(request: ListEnvironmentsRequest): Promise<ListEnvironmentsResponse>;
    /**
     * Get detailed environment information
     */
    getEnvironmentDetails(request: GetEnvironmentDetailsRequest): Promise<any>;
    /**
     * Update environment variables
     */
    updateEnvironmentVariables(request: UpdateEnvironmentVariablesRequest): Promise<UpdateEnvironmentVariablesResponse>;
    /**
     * Create a new environment
     */
    createEnvironment(request: CreateEnvironmentRequest): Promise<CreateEnvironmentResponse>;
    /**
     * Delete an environment
     */
    deleteEnvironment(environmentId: string): Promise<DeleteEnvironmentResponse>;
    /**
     * Set default environment
     */
    setDefaultEnvironment(environmentId: string): Promise<boolean>;
    /**
     * Duplicate environment
     */
    duplicateEnvironment(sourceId: string, newName: string): Promise<CreateEnvironmentResponse>;
    /**
     * Export environment configuration
     */
    exportEnvironment(environmentId: string): Promise<string>;
    /**
     * Import environment configuration
     */
    importEnvironment(name: string, data: string, projectId?: string): Promise<CreateEnvironmentResponse>;
    /**
     * Validate create environment request
     */
    private validateCreateRequest;
}
