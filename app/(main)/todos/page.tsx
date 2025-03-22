"use client";

import { useEffect, useState, JSX } from "react";

/**
 * 할 일 항목의 타입 정의
 */
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * TodoPage 컴포넌트
 * 내부 API 라우트 (/api/todos)를 호출하여 할 일 목록을 가져오고,
 * 새로운 할 일을 추가하며, 기존 할 일을 삭제할 수 있는 UI를 제공합니다.
 *
 * @returns {JSX.Element} 렌더링된 TodoPage 컴포넌트
 */
export default function TodoPage(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  /**
   * 내부 API 라우트에서 모든 할 일 목록을 가져옵니다.
   */
  const fetchTodos = async (): Promise<void> => {
    try {
      const res = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "x-api-key": "YOUR_API_KEY_HERE",
        },
      });
      if (!res.ok) {
        throw new Error(`할 일 불러오기 실패: ${res.statusText}`);
      }
      const data: Todo[] = await res.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
      setError("할 일 목록을 불러오는 중 문제가 발생했습니다.");
    }
  };

  /**
   * 내부 API 라우트에 POST 요청을 보내 새로운 할 일을 추가합니다.
   */
  const createTodo = async (): Promise<void> => {
    if (!newTodoText.trim()) return;
    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "YOUR_API_KEY_HERE",
        },
        body: JSON.stringify({ text: newTodoText }),
      });
      if (!res.ok) {
        throw new Error(`할 일 추가 실패: ${res.statusText}`);
      }
      const newTodo: Todo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
      setNewTodoText("");
    } catch (err) {
      console.error(err);
      setError("새 할 일을 추가하는 중 문제가 발생했습니다.");
    }
  };

  /**
   * 내부 API 라우트에 DELETE 요청을 보내 특정 할 일을 삭제합니다.
   *
   * @param {number} id - 삭제할 할 일의 id
   */
  const deleteTodo = async (id: number): Promise<void> => {
    try {
      const res = await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": "YOUR_API_KEY_HERE",
        },
      });
      if (!res.ok) {
        throw new Error(`할 일 삭제 실패: ${res.statusText}`);
      }
      await res.json();
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
      setError("할 일을 삭제하는 중 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo 리스트</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="새 할 일을 입력하세요..."
          className="border p-2 flex-grow"
        />
        <button
          onClick={createTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          추가
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
