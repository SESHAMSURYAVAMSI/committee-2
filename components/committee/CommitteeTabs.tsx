"use client";

import { useState, useMemo } from "react";
import { CommitteeMember } from "@/types/committee";
import CommitteeGrid from "./CommitteeGrid";

type Props = {
  categories: string[];
  data: CommitteeMember[];
};

export default function CommitteeTabs({ categories, data }: Props) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedDesignation, setSelectedDesignation] = useState("ALL");

  /* members of active category */
  const categoryMembers = useMemo(() => {
    return data.filter(m => m.category === activeCategory);
  }, [data, activeCategory]);

  /* unique designations */
  const designations = useMemo(() => {
    const set = new Set(
      categoryMembers.map(m => m.designation).filter(Boolean)
    );
    return ["ALL", ...Array.from(set)];
  }, [categoryMembers]);

  /* members to show */
  const membersToShow =
    selectedDesignation === "ALL"
      ? categoryMembers
      : categoryMembers.filter(
          m => m.designation === selectedDesignation
        );

  return (
    <div className="space-y-6">
      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-3 border-b pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedDesignation("ALL");
            }}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition
              ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILTER BAR (BEST PLACE) */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-gray-800">
          Designation:
        </label>

        <select
          value={selectedDesignation}
          onChange={e => setSelectedDesignation(e.target.value)}
          className="rounded-md border  py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
        >
          {designations.map(d => (
            <option key={d} value={d}>
              {d === "ALL" ? "All Designations" : d}
            </option>
          ))}
        </select>
      </div>

      {/* MEMBERS LIST */}
      <CommitteeGrid
        title={activeCategory}
        members={membersToShow}
      />
    </div>
  );
}
