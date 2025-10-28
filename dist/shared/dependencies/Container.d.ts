/**
 * Simple Dependency Injection Container
 * Eliminates singleton pattern repetition across modules
 */
export type ServiceFactory<T = any> = () => T | Promise<T>;
export declare class DIContainer {
    private services;
    private factories;
    private singletons;
    /**
     * Register a service factory
     */
    register<T>(name: string, factory: ServiceFactory<T>, singleton?: boolean): void;
    /**
     * Register an instance directly
     */
    registerInstance<T>(name: string, instance: T): void;
    /**
     * Get a service instance
     */
    get<T>(name: string): Promise<T>;
    /**
     * Check if service is registered
     */
    has(name: string): boolean;
    /**
     * Clear a service instance (useful for testing or refresh)
     */
    clear(name?: string): void;
    /**
     * Get all registered service names
     */
    getRegisteredServices(): string[];
}
export declare const container: DIContainer;
/**
 * Decorator for easy service registration
 */
export declare function Service(name?: string): <T extends {
    new (...args: any[]): {};
}>(constructor: T) => T;
/**
 * Helper function to get service from global container
 */
export declare function getService<T>(name: string): Promise<T>;
