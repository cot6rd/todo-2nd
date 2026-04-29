"use client";

import type { FilterType } from "@/types/todo";

interface Props {
  filter: FilterType;
  onFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "active", label: "未完了" },
  { value: "completed", label: "完了" },
];

export function TodoFilter({ filter, onFilter, activeCount, completedCount, onClearCompleted }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
      <span>{activeCount} 件残り</span>

      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilter(f.value)}
            className={`rounded-md px-3 py-1 transition-colors ${
              filter === f.value
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs transition-colors hover:text-red-500"
        >
          完了済みを削除
        </button>
      )}
    </div>
  );
}
