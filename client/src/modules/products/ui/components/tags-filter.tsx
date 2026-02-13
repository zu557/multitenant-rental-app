"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LIMIT } from "@/constants";
import { LoaderIcon } from "lucide-react";

interface Props {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

interface Tag {
  id: string;
  name: string;
}

export const TagsFilter = ({ value, onChange }: Props) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchTags = async (pageNumber = 1) => {
    setLoading(true);

    const params = new URLSearchParams({
      limit: DEFAULT_LIMIT.toString(),
      page: pageNumber.toString(),
    });

    const res = await fetch(`/api/tags?${params.toString()}`);
    const data = await res.json();

    if (pageNumber === 1) {
      setTags(data.docs);
    } else {
      setTags((prev) => [...prev, ...data.docs]);
    }

    setHasNextPage(data.hasNextPage);
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    fetchTags(1);
  }, []);

  const onClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value.filter((t) => t !== tag));
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {loading && tags.length === 0 ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => onClick(tag.name)}
          >
            <p className="font-medium">{tag.name}</p>
            <Checkbox
              checked={value?.includes(tag.name)}
              onCheckedChange={() => onClick(tag.name)}
            />
          </div>
        ))
      )}

      {hasNextPage && (
        <button
          disabled={loading}
          onClick={() => {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchTags(nextPage);
          }}
          className="underline cursor-pointer font-medium justify-start text-start disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load more..."}
        </button>
      )}
    </div>
  );
};
