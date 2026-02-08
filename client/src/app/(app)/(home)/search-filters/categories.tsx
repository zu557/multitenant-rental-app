import { CategoryDropdown } from "./category-dropdown";
import { Category } from "@/payload-types";
interface CategoriesProps {
    data: Category[];
}
export const Categories = ({data}:CategoriesProps) => {
    return (
        <div className="px-4 lg:px-12  flex  w-full">  
            {data?.map((item: Category) => {
                return (
                    <div key={item.id} className="lg:mr-3" >
                       <CategoryDropdown category={item} isActive={false} isNavigationHovered={false} />   
                    </div>
                );
            })}
        </div>
    );
}