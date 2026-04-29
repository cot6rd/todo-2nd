"use client";

import { useState, useRef, useEffect, type KeyboardEvent, type DragEvent } from "react";
import type { Todo } from "@/types/todo";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  isDragging: boolean;
  onDragStart: () => void;
  onDragOver: (e: DragEvent) => void;
  onDragEnd: () => void;
}

const PRIORITY_STYLES = {
  high: {
    border: "border-l-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "font-bold text-red-900 dark:text-red-100 text-base",
    badge: "bg-red-500 text-white text-sm px-2.5 py-1 font-bold",
    shadow: "shadow-md shadow-red-100 dark:shadow-red-900/30",
  },
  medium: {
    border: "border-l-yellow-400",
    bg: "bg-yellow-50/60 dark:bg-yellow-900/10",
    text: "font-medium text-gray-800 dark:text-gray-100 text-base",
    badge: "bg-yellow-400 text-yellow-900 text-sm px-2.5 py-1 font-semibold",
    shadow: "shadow-sm",
  },
  low: {
    border: "border-l-green-400",
    bg: "bg-white dark:bg-gray-800",
    text: "text-gray-600 dark:text-gray-300 text-base",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 text-sm px-2.5 py-1",
    shadow: "shadow-sm",
  },
} as const;

const PRIORITY_LABEL = { high: "高", medium: "中", low: "低" } as const;

export function TodoItem({ todo, onToggle, onDelete, onEdit, isDragging, onDragStart, onDragOver, onDragEnd }: Props) {
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

  const s = PRIORITY_STYLES[todo.priority];

  return (
    <li
      draggable={!editing}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      className={`flex items-center gap-3 rounded-xl border border-gray-200 border-l-4 px-5 py-4 transition-all dark:border-gray-700 ${s.border} ${s.bg} ${s.shadow} ${todo.completed ? "opacity-40" : ""} ${isDragging ? "opacity-50 scale-[0.98] ring-2 ring-blue-400" : ""}`}
    >
      {/* ドラッグハンドル */}
      <span className="cursor-grab text-gray-300 hover:text-gray-400 active:cursor-grabbing select-none shrink-0" aria-hidden>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </span>

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 cursor-pointer accent-blue-600 shrink-0"
      />

      {editing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded border border-blue-500 bg-transparent px-2 py-1 text-base outline-none dark:text-white"
        />
      ) : (
        <span
          onDoubleClick={() => !todo.completed && setEditing(true)}
          className={`flex-1 cursor-default select-none ${s.text} ${todo.completed ? "line-through" : ""}`}
          title={todo.completed ? undefined : "ダブルクリックで編集"}
        >
          {todo.text}
        </span>
      )}

      <span className={`rounded-md font-medium shrink-0 ${s.badge}`}>
        {PRIORITY_LABEL[todo.priority]}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
        className="ml-1 rounded p-1.5 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  );
}
