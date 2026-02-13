"use client";

import { useState } from "react";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useParams } from "next/navigation";
import BreadcrumbNavigation from "./breadcrumb-navigation";
import { useProductFilters } from "@/modules/products/hooks/use-product-filter";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
  subcategories?: SubCategory[] | null;
}

interface Props {
  categories: CategoriesGetManyOutput;
}

export const SearchFilters = ({ categories }: Props) => {
  const [filters, setFilters] = useProductFilters();
  const params = useParams();

  const categoryParam = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const activeCategorySlug = categoryParam || "all";

  // Normalize subcategories to always be an array
  const normalizedCategories = categories.map((cat) => ({
    ...cat,
    subcategories: Array.isArray(cat.subcategories)
      ? cat.subcategories
      : [],
  }));

  const activeCategoryData = normalizedCategories.find(
    (cat) => cat.slug === activeCategorySlug
  );

  const activeCategoryColor = activeCategoryData?.color || "#f5f5f5";
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubCategorySlug = Array.isArray(params.subcategory)
    ? params.subcategory[0]
    : params.subcategory;

  const activeSubCategoryName =
    activeCategoryData?.subcategories?.find(
      (subcat) => subcat.slug === activeSubCategorySlug
    )?.name || null;

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput
        defaultValue={filters.search}
        onChange={(value) => setFilters({ search: value })}
      />

      <div className="hidden lg:block">
        <Categories data={normalizedCategories} />
      </div>

      <BreadcrumbNavigation
        activeCategory={activeCategorySlug}
        activeCategoryName={activeCategoryName}
        activeSubCategoryName={activeSubCategoryName}
      />
    </div>
  );
};

export const SearchFilterLoading = () => (
  <div
    className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
    style={{ backgroundColor: "#f5f5f5" }}
  >
    <SearchInput disabled />
    <div className="hidden lg:block">
      <div className="h-11" />
    </div>
  </div>
);
