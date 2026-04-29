"use client";

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
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-lg space-y-6">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          TODOリスト
        </h1>

        <div className="rounded-2xl bg-white p-6 shadow-md space-y-5 dark:bg-gray-800">
          <TodoForm onAdd={addTodo} />

          {todos.length > 0 ? (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
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
          ダブルクリックでタスクを編集
        </p>
      </div>
    </main>
  );
}
