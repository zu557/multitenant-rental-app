import 'dotenv/config'
import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "Electronics",
    color: "#4A90E2",
  },
  {
    name: "Production Equipment",
    color: "#7B8D93",
  },
  {
    name: "Software Development",
    color: "#1E88E5",
  },
  {
    name: "Construction",
    color: "#F57C00",
  },
];

// Normalize slug helper
const normalizeSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "");

const seed = async () => {
  const payload = await getPayload({ config });

  console.log("Clearing existing categories...");

  await payload.delete({
    collection: "categories",
    where: {},
  });

  const usedSlugs = new Set<string>();

  for (const category of categories) {
    const slug = normalizeSlug(category.name);

    if (usedSlugs.has(slug)) {
      throw new Error(`Duplicate slug detected: ${slug}`);
    }

    usedSlugs.add(slug);

    await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug,
        color: category.color,
        parent: null, // no subcategories anymore
      },
    });
  }
};

try {
  await seed();
  console.log("✅ Seeding completed successfully!");
  process.exit(0);
} catch (error) {
  console.error("❌ Error while seeding!", error);
  process.exit(1);
}
