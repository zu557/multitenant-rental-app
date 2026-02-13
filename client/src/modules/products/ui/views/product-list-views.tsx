import { Suspense } from "react";
import { ProductFilters } from "../components/product-filters";
import { ProductSort } from "../components/product-sort";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { Product } from "@/payload-types";

// interface Product {
//   id: number;
//   name: string;
//   image?: { url?: string };
//   tenant?: { slug?: string; image?: { url?: string } };
//   reviewRating?: number;
//   reviewCount?: number;
//   price: number;
// }

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
  initialProducts: Product[];
  hasNextPage: boolean;
}

export const ProductListView = ({
  category,
  tenantSlug,
  narrowView,
  initialProducts,
  hasNextPage,
}: Props) => {
  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-y-2">
        <p className="text-2xl font-medium">Curated for you</p>
        <Suspense>
          <ProductSort />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>

        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
            <ProductList
              category={category}
              tenantSlug={tenantSlug}
              narrowView={narrowView}
              initialProducts={initialProducts}
              initialHasNextPage={hasNextPage}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
