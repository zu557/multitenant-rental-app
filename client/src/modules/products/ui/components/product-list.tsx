"use client";

import { useEffect, useState } from "react";
import { useProductFilters } from "../../hooks/use-product-filter";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/payload-types";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
  initialProducts: Product[];
  initialHasNextPage: boolean;
}

// interface Product {
//   id: string;
//   name: string;
//   image?: { url?: string };
//   tenant?: { slug?: string; image?: { url?: string } };
//   reviewRating?: number;
//   reviewCount?: number;
//   price: number;
// }

export const ProductList = ({
  category,
  tenantSlug,
  narrowView,
  initialProducts,
  initialHasNextPage,
}: Props) => {
  const [filters] = useProductFilters();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (pageNumber = 1) => {
    setLoading(true);

    const params = new URLSearchParams({
      limit: DEFAULT_LIMIT.toString(),
      page: pageNumber.toString(),
      ...(category && { "where[category][equals]": category }),
      ...(tenantSlug && { "where[tenant.slug][equals]": tenantSlug }),
    });

    const res = await fetch(`/api/products?${params.toString()}`);
    const data = await res.json();

    if (pageNumber === 1) {
      setProducts(data.docs);
    } else {
      setProducts((prev) => [...prev, ...data.docs]);
    }

    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchProducts(1);
  }, [category, tenantSlug, filters]);

  if (!loading && products && products?.length === 0) {
    return (
      <div className="border border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
        <InboxIcon />
        <p className="text-base font-medium">No products found</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
          narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
        )}
      >
       {products?.map((product) => {
          const tenant =
            typeof product.tenant === "object" && product.tenant !== null
              ? product.tenant
              : null;

          const image =
            typeof product.image === "object" && product.image !== null
              ? product.image
              : null;

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={image?.url}
              tenantSlug={tenant?.slug}
              // tenantImageUrl={tenant?.image?.url}
              price={product.price}
            />
          );
        })}

      </div>

      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={loading}
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchProducts(nextPage);
            }}
            variant="elevated"
          >
            {loading ? "Loading..." : "Load more..."}
          </Button>
        )}
      </div>
    </>
  );
};

export const ProductListSkeleton = ({ narrowView }: { narrowView?: boolean }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4",
        narrowView && "lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
      )}
    >
      {Array.from({ length: DEFAULT_LIMIT }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};
