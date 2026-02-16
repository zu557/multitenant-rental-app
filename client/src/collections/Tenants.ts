import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "name", // Use the Store Name as the display title in Admin UI
  },
  access: {
    // Standard Payload access (Defaults to 'anyone logged in' if not defined)
    read: () => true,
     create: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Store Name",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "The unique subdomain for this tenant (e.g., 'my-store')",
      },
    },
  ],
};