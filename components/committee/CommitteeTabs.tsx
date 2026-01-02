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
  const [selectedDesignation, setSelectedDesignation] = useState("ALL");

  const categoryMembers = useMemo(() => {
    return data.filter(m => m.category === activeCategory);
  }, [data, activeCategory]);

  const designations = useMemo(() => {
    const set = new Set(
      categoryMembers.map(m => m.designation).filter(Boolean)
    );
    return ["ALL", ...Array.from(set)];
  }, [categoryMembers]);

  const membersToShow =
    selectedDesignation === "ALL"
      ? categoryMembers
      : categoryMembers.filter(
          m => m.designation === selectedDesignation
        );

  return (
    <div className="space-y-6">
      {/* CATEGORY HEADER */}
      <CommitteeGrid title={activeCategory} />

      {/* FILTER — NOW VISIBLE */}
      <div className="flex items-center gap-1">
        <label className="text-sm font-medium text-gray-800">
          Designation:
        </label>

        <select
          value={selectedDesignation}
          onChange={e => setSelectedDesignation(e.target.value)}
          className="rounded-md border py-1 text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {designations.map(d => (
            <option key={d} value={d}>
              {d === "ALL" ? "All Designations" : d}
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
