"use client";

import { useState, type DragEvent } from "react";
import { useTodos } from "@/hooks/useTodos";
import { TodoForm } from "@/components/TodoForm";
import { TodoItem } from "@/components/TodoItem";
import { TodoFilter } from "@/components/TodoFilter";

export default function Home() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    reorderTodo,
    activeCount,
    completedCount,
  } = useTodos();

  const [dragId, setDragId] = useState<string | null>(null);

  function handleDragOver(e: DragEvent, targetId: string) {
    e.preventDefault();
    if (dragId && dragId !== targetId) {
      reorderTodo(dragId, targetId);
      setDragId(targetId);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          TODOリスト
        </h1>

        <div className="rounded-2xl bg-white p-6 shadow-md space-y-5 dark:bg-gray-800">
          <TodoForm onAdd={addTodo} />

          {todos.length > 0 ? (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  isDragging={dragId === todo.id}
                  onDragStart={() => setDragId(todo.id)}
                  onDragOver={(e) => handleDragOver(e, todo.id)}
                  onDragEnd={() => setDragId(null)}
                />
              ))}
            </ul>
          ) : (
            <p className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
              タスクがありません
            </p>
          )}

          <TodoFilter
            filter={filter}
            onFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600">
          ダブルクリックで編集 ／ ⠿ をドラッグして並び替え
        </p>
      </div>
    </main>
  );
}
