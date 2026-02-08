import configPromise from '@payload-config'
import { getPayload } from 'payload'
// import { getQueryClient, trpc } from "@/trpc/server";
// import { dehydrate,HydrationBoundary } from "@tanstack/react-query";
import { Footer } from "@/modules/home/ui/components/footer";
import {Navbar} from "@/modules/home/ui/components/navbar";
// import { SearchFilterLoading, SearchFilters } from "../../../modules/home/ui/components/search-filter";

import { Suspense } from "react";
import { SearchFilters } from "./search-filters";
import { Category } from '@/payload-types';

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
    const payload = await getPayload({
      config: configPromise,
    })
    const data = await payload.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
    });
    const formattedData = data?.docs.map((category) => {
      return {
        ...category,
        subcategories: (category.subcategories?.docs ?? []).map((docs)=> ({
          // because of the "depth: 1" we are confident docs will be of type Category
          ...(docs as Category ),
          subcategories: undefined, // remove subcategories from subcategories to avoid confusion
        })),
      };
    });
   


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterLoading/>}> */}

      <SearchFilters data={formattedData} />
        {/* </Suspense>
      </HydrationBoundary> */}
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout;