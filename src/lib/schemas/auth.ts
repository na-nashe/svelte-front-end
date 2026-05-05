import { z } from 'zod';

export const signUpSchema = z.object({
	name: z.string().min(2, "Ім'я має містити мінімум 2 символи"),
	email: z.string().email('Невірний формат email'),
	password: z.string().min(8, 'Пароль має містити мінімум 8 символів'),
	agree: z.literal(true).refine((val) => val === true, {
    message: 'Необхідно прийняти умови використання'
})
});

export type SignUpSchema = typeof signUpSchema;