"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import type { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const PRIORITY_STYLES = {
  high: "border-l-red-500",
  medium: "border-l-yellow-400",
  low: "border-l-green-500",
} as const;

const PRIORITY_BADGE = {
  high: { label: "高", className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  medium: { label: "中", className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" },
  low: { label: "低", className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
} as const;

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function commitEdit() {
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  const badge = PRIORITY_BADGE[todo.priority];

  return (
    <li
      className={`flex items-center gap-3 rounded-lg border border-gray-200 border-l-4 bg-white px-4 py-3 shadow-sm transition-opacity dark:border-gray-700 dark:bg-gray-800 ${PRIORITY_STYLES[todo.priority]} ${todo.completed ? "opacity-50" : ""}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-4 w-4 cursor-pointer accent-blue-600"
      />

      {editing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded border border-blue-500 bg-transparent px-2 py-0.5 text-sm outline-none dark:text-white"
        />
      ) : (
        <span
          onDoubleClick={() => !todo.completed && setEditing(true)}
          className={`flex-1 cursor-default select-none text-sm dark:text-gray-100 ${todo.completed ? "line-through" : ""}`}
          title={todo.completed ? undefined : "ダブルクリックで編集"}
        >
          {todo.text}
        </span>
      )}

      <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${badge.className}`}>
        {badge.label}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
        className="ml-1 rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  );
}
