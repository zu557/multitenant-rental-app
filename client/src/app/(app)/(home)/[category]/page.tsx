interface Props {
  params: {
    category: string;
  };
}

export default async function Page({ params }: Props) {
  const { category } = await params;

  return <div>Category Page: {category}</div>;
}

// import { SearchParams } from "nuqs/server";
// import { loadProductFilter } from "@/modules/products/searchParams";
// import { ProductListView } from "@/modules/products/ui/views/product-list-views";
// import { DEFAULT_LIMIT } from "@/constants";

// interface Props {
//   params: Promise<{
//     category: string;
//   }>;
//   searchParams: Promise<SearchParams>;
// }

// export const dynamic = "force-dynamic";

// const Page = async ({ params, searchParams }: Props) => {
//   const { category } = await params;
//   const filters = await loadProductFilter(searchParams);

//   const query = new URLSearchParams({
//     limit: DEFAULT_LIMIT.toString(),
//     ...(category && { "where[category][equals]": category }),
//     ...Object.fromEntries(
//       Object.entries(filters || {}).map(([key, value]) => [
//         `where[${key}][equals]`,
//         String(value),
//       ])
//     ),
//   });

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_APP_URL}/api/products?${query.toString()}`,
//     { cache: "no-store" }
//   );

//   const data = await res.json();

//   return (
//     <ProductListView
//       category={category}
//       initialProducts={data.docs}
//       hasNextPage={data.hasNextPage}
//     />
//   );
// };

// export default Page;
