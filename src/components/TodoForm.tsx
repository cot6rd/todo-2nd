"use client";

import { useState, type FormEvent } from "react";
import type { Priority } from "@/types/todo";

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

export function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onAdd(text, priority);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="タスクを入力..."
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
          <option key={p} value={p}>
            {PRIORITY_LABELS[p]}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={!text.trim()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        追加
      </button>
    </form>
  );
}
