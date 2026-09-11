CREATE TABLE `audit` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text,
	`actor` text NOT NULL,
	`event` text NOT NULL,
	`detail` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_case_created` ON `audit` (`case_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `cases` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`lane` text NOT NULL,
	`tier` text NOT NULL,
	`status` text NOT NULL,
	`payment_status` text DEFAULT 'unpaid' NOT NULL,
	`amount` integer DEFAULT 0 NOT NULL,
	`intake` text NOT NULL,
	`brief` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`consent_version` text NOT NULL,
	`request_key` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `cases_user` ON `cases` (`user_id`);--> statement-breakpoint
CREATE INDEX `cases_status_created` ON `cases` (`status`,`created_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `cases_request` ON `cases` (`user_id`,`request_key`);--> statement-breakpoint
CREATE TABLE `deliverables` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`status` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	`approved_by` text,
	`approved_at` text,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `deliverables_case` ON `deliverables` (`case_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `deliverable_kind` ON `deliverables` (`case_id`,`kind`);--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`key` text NOT NULL,
	`size` integer NOT NULL,
	`mime` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `documents_case` ON `documents` (`case_id`);--> statement-breakpoint
CREATE TABLE `outbox` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`recipient` text NOT NULL,
	`subject` text NOT NULL,
	`body` text NOT NULL,
	`status` text NOT NULL,
	`due_at` text NOT NULL,
	`sent_at` text,
	`attempts` integer DEFAULT 0 NOT NULL,
	`lease_until` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `outbox_status_due` ON `outbox` (`status`,`due_at`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`case_id` text NOT NULL,
	`session_id` text NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL,
	`livemode` integer NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`case_id`) REFERENCES `cases`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payment_session` ON `payments` (`session_id`);--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
