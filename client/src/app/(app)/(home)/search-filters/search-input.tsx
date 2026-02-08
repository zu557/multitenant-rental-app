import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
interface Props {
    disabled?: boolean;
}

export const SearchInput = (props: Props) => {
    return (
        <div className="flex items-center w-full">
            <div className="relative w-full pb-0">
                <Input placeholder="Search Products ..." className="pl-8" disabled={props.disabled} />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
            </div>  
        </div>
    );
};

