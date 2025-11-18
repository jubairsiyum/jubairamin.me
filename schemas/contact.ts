import { defineField, defineType } from "sanity";
import { BiEnvelope } from "react-icons/bi";

export default defineType({
  name: "contact",
  title: "Contact Submissions",
  type: "document",
  icon: BiEnvelope,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "company",
      title: "Company/Organization",
      type: "string",
    }),
    defineField({
      name: "inquiryType",
      title: "Inquiry Type",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "budget",
      title: "Budget Range",
      type: "string",
    }),
    defineField({
      name: "timeline",
      title: "Project Timeline",
      type: "string",
    }),
    defineField({
      name: "message",
      title: "Additional Message",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "ipAddress",
      title: "IP Address",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "userAgent",
      title: "User Agent",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Replied", value: "replied" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
  ],
  preview: {
    select: {
      name: "name",
      email: "email",
      inquiryType: "inquiryType",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare(selection) {
      const { name, email, inquiryType, submittedAt, status } = selection;
      return {
        title: name,
        subtitle: `${email} • ${inquiryType} • ${status}`,
        description: new Date(submittedAt).toLocaleString(),
      };
    },
  },
  orderings: [
    {
      title: "Date, Newest",
      name: "dateDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Date, Oldest",
      name: "dateAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
});
