import { Button } from "@/components/ui/button";
import { Category } from "@/payload-types";
import { cn

 } from "@/lib/utils";
interface CategoryDropdownProps {
    category: Category
    isActive: boolean;
    isNavigationHovered: boolean;
}

export const CategoryDropdown = ({ category, isActive, isNavigationHovered }: CategoryDropdownProps) => {
    return (
        <Button variant="elevated" className={cn("h-11 px-4 bg-transparent  border-gray-200 rounded-full hover:bg-white hover:border-primary text-black", isActive && !isNavigationHovered && "bg-white border-primary hover:bg-black hover:text-white")}>
            {category.name}
        </Button>
    );
}