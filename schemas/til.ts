import { defineField, defineType } from "sanity";
import { HiLightBulb } from "react-icons/hi";
import Author from "./author";

export default defineType({
  name: "til",
  title: "T.I.L (Today I Learned)",
  type: "document",
  icon: HiLightBulb,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "What did you learn today? Keep it concise and clear (30-100 characters)",
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Generate from title or customize for URL",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Quick Summary",
      type: "text",
      description: "Brief overview of what you learned (100-200 characters)",
      rows: 3,
      validation: (Rule) => [
        Rule.required()
          .min(50)
          .max(200)
          .error("Summary should be between 50-200 characters"),
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Categorize your learning",
      options: {
        list: [
          { title: "Backend Development", value: "backend" },
          { title: "Frontend Development", value: "frontend" },
          { title: "Database", value: "database" },
          { title: "DevOps & Cloud", value: "devops" },
          { title: "Architecture & Design", value: "architecture" },
          { title: "Security", value: "security" },
          { title: "Performance", value: "performance" },
          { title: "Testing", value: "testing" },
          { title: "Tools & CLI", value: "tools" },
          { title: "Best Practices", value: "best-practices" },
          { title: "API Development", value: "api" },
          { title: "PHP & Laravel", value: "php-laravel" },
          { title: "JavaScript & Node.js", value: "javascript" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      description: "Add relevant technical tags (e.g., PHP, Laravel, MySQL, Docker)",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: "difficulty",
      title: "Difficulty Level",
      type: "string",
      description: "How complex is this learning?",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
      },
      initialValue: "intermediate",
    }),
    defineField({
      name: "date",
      title: "Date Learned",
      type: "datetime",
      description: "When did you learn this?",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Detailed Explanation",
      type: "blockContent",
      description: "Explain what you learned in detail - include code examples, insights, gotchas, etc.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "codeExample",
      title: "Primary Code Example",
      type: "code",
      description: "Main code snippet demonstrating the learning (optional)",
      options: {
        language: "php",
        languageAlternatives: [
          { title: "PHP", value: "php" },
          { title: "JavaScript", value: "javascript" },
          { title: "TypeScript", value: "typescript" },
          { title: "SQL", value: "sql" },
          { title: "Bash/Shell", value: "bash" },
          { title: "JSON", value: "json" },
          { title: "YAML", value: "yaml" },
          { title: "HTML", value: "html" },
          { title: "CSS", value: "css" },
          { title: "Python", value: "python" },
        ],
        withFilename: true,
      },
    }),
    defineField({
      name: "resources",
      title: "Reference Links",
      type: "array",
      description: "Add helpful links to documentation, articles, or resources",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Link Title",
              validation: (rule) => rule.required(),
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              validation: (rule) => rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "relatedTo",
      title: "Related Blog Post",
      type: "reference",
      description: "Link to a related blog post if applicable (optional)",
      to: [{ type: "Post" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: Author.name }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature This Learning",
      type: "boolean",
      description: "Highlight this on the TIL page",
      initialValue: false,
    }),
    defineField({
      name: "isPublished",
      title: "PUBLISH",
      type: "boolean",
      description: "Make this TIL public",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      isPublished: "isPublished",
      date: "date",
    },
    prepare(selection) {
      const { title, category, isPublished, date } = selection;
      return {
        title: title,
        subtitle: isPublished 
          ? `${category} • ${new Date(date).toLocaleDateString()}` 
          : "Draft",
      };
    },
  },
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Date, Oldest",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
});
