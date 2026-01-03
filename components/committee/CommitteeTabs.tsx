"use client";

import { useState, useMemo } from "react";
import { CommitteeMember } from "@/types/committee";
import CommitteeGrid from "./CommitteeGrid";
import MemberCard from "./MemberCard";

type Props = {
  categories: string[];
  data: CommitteeMember[];
};

export default function CommitteeTabs({ categories, data }: Props) {
  const [activeCategory] = useState(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("ALL");

  /* members of active category */
  const categoryMembers = useMemo(() => {
    return data.filter(m => m.category === activeCategory);
  }, [data, activeCategory]);

  /* unique subcategories */
  const subcategories = useMemo(() => {
    const set = new Set(
      categoryMembers.map(m => m.subcategory).filter(Boolean)
    );
    return ["ALL", ...Array.from(set)];
  }, [categoryMembers]);

  /* members to show */
  const membersToShow =
    selectedSubcategory === "ALL"
      ? categoryMembers
      : categoryMembers.filter(
          m => m.subcategory === selectedSubcategory
        );

  return (
    <div className="space-y-6">
      {/* CATEGORY HEADER */}
      <CommitteeGrid title={activeCategory} />

      {/* SUBCATEGORY FILTER */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-800">
          Subcategory:
        </label>

        <select
          value={selectedSubcategory}
          onChange={e => setSelectedSubcategory(e.target.value)}
          className="rounded-md border py-1 px-2 w-full text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {subcategories.map(sc => (
            <option key={sc} value={sc}>
              {sc === "ALL" ? "All Subcategories" : sc}
            </option>
          ))}
        </select>
      </div>

      {/* MEMBERS LIST */}
      <div className="flex flex-col gap-3">
        {membersToShow.map((m, i) => (
          <MemberCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
}
