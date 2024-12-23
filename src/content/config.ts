import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.string(), //z.date() -> maar nu is dit een string in de markdown frontmatter file
	}),
});

export const collections = { blog };
