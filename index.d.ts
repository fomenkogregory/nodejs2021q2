import { AsyncValidationOptions } from 'joi';

declare module 'joi' {
    export interface AnySchema {
        validateAsync<T>(
            value: T,
            options?: AsyncValidationOptions
        ): Promise<T>;
    }
}
