import { SearchParams } from "nuqs/server";
import { loadProductFilter } from "@/modules/products/searchParams";
import { ProductListView } from "@/modules/products/ui/views/product-list-views";
import { DEFAULT_LIMIT } from "@/constants";
import { getPayload } from "payload";
import config from "@payload-config";

interface PageProps {
  searchParams: Promise<SearchParams>;
}

type Filters = Awaited<ReturnType<typeof loadProductFilter>> & {
  category?: string;
};

export const dynamic = "force-dynamic";

const Page = async ({ searchParams }: PageProps) => {
  const filters: Filters = await loadProductFilter(searchParams);

  const payload = await getPayload({ config });

  const where: any = {};

  if (filters.category) {
    where.category = { equals: filters.category };
  }

  if (filters.tags && filters.tags.length > 0) {
    where.tags = { in: filters.tags };
  }

  if (filters.search) {
    where.name = { like: filters.search };
  }

  if (filters.minPrice || filters.maxPrice) {
    where.price = {};
    if (filters.minPrice) where.price.gte = Number(filters.minPrice);
    if (filters.maxPrice) where.price.lte = Number(filters.maxPrice);
  }

  let sort: string = "-createdAt"; // default

if (filters.sort === "trending") {
  sort = "-reviewCount";
}

if (filters.sort === "hot_and_new") {
  sort = "-createdAt";
}

if (filters.sort === "curated") {
  sort = "-createdAt";
}

  const products = await payload.find({
  collection: "products",
  limit: DEFAULT_LIMIT,
  where,
  sort,
});


  return (
    <ProductListView
      initialProducts={products.docs}
      hasNextPage={products.hasNextPage}
    />
  );
};

export default Page;
