import { z } from 'zod';

// Esquema de validación para el registro de usuario
export const registerSchema = z.object({
    usertype: z.string({
        required_error: 'Username is required'
    }).min(3, {
        message: 'Username must be at least 3 characters long'
    }),
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email format'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters long'
    }),
    nombreCompleto: z.string({
        required_error: 'Full name is required'
    }).min(2, {
        message: 'Full name must be at least 2 characters long'
    }),
    terminos: z.boolean()
});

// Esquema de validación para el inicio de sesión
export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    }).email({
        message: 'Invalid email format'
    }),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {
        message: 'Password must be at least 6 characters long'
    })
});
