// import { isSuperAdmin } from "@/lib/access"; 
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    read: () => true,   // 👈 allow public access
    // create: ({ req }) => {
    //   if (isSuperAdmin(req.user as any)) return true;

    //   const tenant = req.user?.tenants?.[0]?.tenant as Tenant;

      // Commented out Stripe verification requirement
      // return Boolean(tenant?.stripeDetailsSubmitted);
      
      // Temporary: Allow creation regardless of Stripe status
    //   return true; 
    // },

    // delete: ({ req }) => isSuperAdmin(req.user as any),
  },
  admin: {
    useAsTitle: "name",
    description: "You must verify your account before creating products",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "price",
      type: "number",
      required: true,
      admin: {
        description: "Price in birr.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    // {
    //   name: "tags",
    //   type: "relationship",
    //   relationTo: "tags",
    //   hasMany: true,
    // },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      type: "select",
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"],
      defaultValue: "30-day",
    },
    {
      name: "content",
      type: "richText",
      admin: {
        description:
          "Protected content only visible to customers after purchase. Add product documentation , downloadable files, getting started guides, and bonus materials. Supports markdown formatting",
      },
    },
    {
      name: "isArchived",
      label: "Archive",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description: "Check if you want to hide this product",
      },
    },
    {
      name: "isPrivate",
      label: "Private",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description: "Check if you want to private this product",
      },
    },
  ],
};