import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    create: () => true,
    read: () => true,
  },

  admin: {
    useAsTitle: "email",
  },

  fields: [
    {
      name: "username",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
