import {
	pgTable,
	foreignKey,
	serial,
	integer,
	varchar,
	boolean,
	text,
	timestamp,
	check,
	uuid,
	smallint,
	unique,
	primaryKey,
	pgEnum
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const pricingModelEnum = pgEnum('pricing_model_enum', ['FREE', 'PAID', 'FREEMIUM']);

export const categories = pgTable(
	'categories',
	{
		id: serial().primaryKey().notNull(),
		parentId: integer('parent_id'),
		name: varchar({ length: 100 }).notNull(),
		icon: varchar({ length: 10 }).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: 'categories_parent_id_fkey'
		})
	]
);

export const products = pgTable(
	'products',
	{
		id: serial().primaryKey().notNull(),
		categoryId: integer('category_id').notNull(),
		name: varchar({ length: 200 }).notNull(),
		originId: integer('origin_id').notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: 'products_category_id_fkey'
		}),
		foreignKey({
			columns: [table.originId],
			foreignColumns: [countries.id],
			name: 'products_origin_id_fkey'
		})
	]
);

export const countries = pgTable('countries', {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	isFriendly: boolean('is_friendly').notNull()
});

export const aliases = pgTable(
	'aliases',
	{
		id: serial().primaryKey().notNull(),
		productId: integer('product_id').notNull(),
		name: varchar({ length: 200 }).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: 'aliases_product_id_fkey'
		})
	]
);

export const alternatives = pgTable(
	'alternatives',
	{
		id: serial().primaryKey().notNull(),
		name: varchar({ length: 150 }).notNull(),
		categoryId: integer('category_id').notNull(),
		originId: integer('origin_id').notNull(),
		pricingModel: pricingModelEnum('pricing_model'),
		description: text(),
		url: varchar({ length: 500 }),
		aiGenerated: boolean('ai_generated').default(false),
		isCashbackAvailable: boolean('is_cashback_available'),
		cashbackInfo: text('cashback_info')
	},
	(table) => [
		foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: 'alternatives_category_id_fkey'
		}),
		foreignKey({
			columns: [table.originId],
			foreignColumns: [countries.id],
			name: 'alternatives_origin_id_fkey'
		})
	]
);

export const reviewSummaries = pgTable(
	'review_summaries',
	{
		alternativeId: integer('alternative_id').primaryKey().notNull(),
		summary: text().notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.alternativeId],
			foreignColumns: [alternatives.id],
			name: 'review_summaries_alternative_id_fkey'
		}).onDelete('cascade')
	]
);

export const reviews = pgTable(
	'reviews',
	{
		id: serial().primaryKey().notNull(),
		userId: uuid('user_id').notNull(),
		alternativeId: integer('alternative_id').notNull(),
		rating: smallint().notNull(),
		title: varchar({ length: 200 }),
		content: text(),
		pros: text().array(),
		cons: text().array(),
		helpful: boolean().default(false),
		timestamp: timestamp({ withTimezone: true, mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: 'reviews_user_id_fkey'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.alternativeId],
			foreignColumns: [alternatives.id],
			name: 'reviews_alternative_id_fkey'
		}).onDelete('cascade'),
		check('reviews_rating_check', sql`(rating >= 1) AND (rating <= 5)`)
	]
);

export const refreshTokens = pgTable(
	'refresh_tokens',
	{
		refreshToken: varchar('refresh_token', { length: 255 }).primaryKey().notNull(),
		userId: uuid('user_id').notNull(),
		expiredAt: timestamp('expired_at', { withTimezone: true, mode: 'string' }).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: 'refresh_tokens_user_id_fkey'
		}).onDelete('cascade')
	]
);

export const users = pgTable(
	'users',
	{
		id: uuid().defaultRandom().primaryKey().notNull(),
		username: varchar({ length: 50 }).notNull(),
		email: varchar({ length: 255 }).notNull(),
		passwordHash: varchar('password_hash', { length: 255 }).notNull(),
		avatar: text(),
		joined: timestamp({ withTimezone: true, mode: 'string' })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		emailVerified: boolean('email_verified').default(false).notNull(),
		verificationToken: varchar('verification_token', { length: 36 }),
		verificationTokenExpiresAt: timestamp('verification_token_expires_at', {
			withTimezone: true,
			mode: 'string'
		})
	},
	(table) => [
		unique('users_username_key').on(table.username),
		unique('users_email_key').on(table.email)
	]
);

export const productAlternatives = pgTable(
	'product_alternatives',
	{
		productId: integer('product_id').notNull(),
		alternativeId: integer('alternative_id').notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: 'product_alternatives_product_id_fkey'
		}),
		foreignKey({
			columns: [table.alternativeId],
			foreignColumns: [alternatives.id],
			name: 'product_alternatives_alternative_id_fkey'
		}),
		primaryKey({
			columns: [table.productId, table.alternativeId],
			name: 'product_alternatives_pkey'
		})
	]
);

export const userSaved = pgTable(
	'user_saved',
	{
		userId: uuid('user_id').notNull(),
		alternativeId: integer('alternative_id').notNull(),
		savedAt: timestamp('saved_at', { withTimezone: true, mode: 'string' }).default(
			sql`CURRENT_TIMESTAMP`
		)
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: 'user_saved_user_id_fkey'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.alternativeId],
			foreignColumns: [alternatives.id],
			name: 'user_saved_alternative_id_fkey'
		}).onDelete('cascade'),
		primaryKey({ columns: [table.userId, table.alternativeId], name: 'user_saved_pkey' })
	]
);

export const reviewVotes = pgTable(
	'review_votes',
	{
		reviewId: integer('review_id').notNull(),
		userId: uuid('user_id').notNull(),
		value: smallint().notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.reviewId],
			foreignColumns: [reviews.id],
			name: 'review_votes_review_id_fkey'
		}).onDelete('cascade'),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: 'review_votes_user_id_fkey'
		}).onDelete('cascade'),
		primaryKey({ columns: [table.reviewId, table.userId], name: 'review_votes_pkey' }),
		check('review_votes_value_check', sql`value = ANY (ARRAY['-1'::integer, 1])`)
	]
);
