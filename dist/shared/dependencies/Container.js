/**
 * Simple Dependency Injection Container
 * Eliminates singleton pattern repetition across modules
 */
export class DIContainer {
    constructor() {
        this.services = new Map();
        this.factories = new Map();
        this.singletons = new Map();
    }
    /**
     * Register a service factory
     */
    register(name, factory, singleton = true) {
        this.factories.set(name, factory);
        this.singletons.set(name, singleton);
        if (singleton) {
            this.services.delete(name); // Clear cached instance
        }
    }
    /**
     * Register an instance directly
     */
    registerInstance(name, instance) {
        this.services.set(name, instance);
        this.singletons.set(name, true);
    }
    /**
     * Get a service instance
     */
    async get(name) {
        // Check if instance already exists
        if (this.services.has(name)) {
            return this.services.get(name);
        }
        // Get factory
        const factory = this.factories.get(name);
        if (!factory) {
            throw new Error(`Service '${name}' not registered`);
        }
        // Create instance
        const instance = await factory();
        // Cache if singleton
        if (this.singletons.get(name)) {
            this.services.set(name, instance);
        }
        return instance;
    }
    /**
     * Check if service is registered
     */
    has(name) {
        return this.factories.has(name) || this.services.has(name);
    }
    /**
     * Clear a service instance (useful for testing or refresh)
     */
    clear(name) {
        if (name) {
            this.services.delete(name);
        }
        else {
            this.services.clear();
        }
    }
    /**
     * Get all registered service names
     */
    getRegisteredServices() {
        return Array.from(new Set([...this.factories.keys(), ...this.services.keys()]));
    }
}
// Global container instance
export const container = new DIContainer();
/**
 * Decorator for easy service registration
 */
export function Service(name) {
    return function (constructor) {
        const serviceName = name || constructor.name;
        container.register(serviceName, () => new constructor(), true);
        return constructor;
    };
}
/**
 * Helper function to get service from global container
 */
export function getService(name) {
    return container.get(name);
}
//# sourceMappingURL=Container.js.map