import { CategoryDropdown } from "./category-dropdown";
import { Category } from "@/payload-types";

interface CategoriesProps {
  data: Category[];
}

export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="px-4 lg:px-12 w-full">
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
        {data?.map((item: Category) => (
          <div
            key={item.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-auto"
          >
            <CategoryDropdown
              category={item}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
