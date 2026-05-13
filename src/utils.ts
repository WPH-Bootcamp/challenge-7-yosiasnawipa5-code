// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid
// type Guard
import { Todo, TodoList, TodoStatus } from "./types";

//type guard 1: cek apakah sebuah string adalah TodoStatus yang valid
export function isTodoStatus(value: unknown): value is TodoStatus
{
  return value === "active" || value === "done";
}

//type guard 2: cek apakah sebuah objek adalah Todo yang valid
export function isTodo(value: unknown): value is Todo {
  // Langkah 1: ini adalah objek (bukan null, bukan array)
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // langkah 2: Cast ke Record agar bisa akses properti-nya
  const obj = value as Record<string, unknown>;
  //langkah 3: cek setiap properti yang wajib ada
  const hasId = typeof obj.id === "number";
  const hasTitle = typeof obj.title === "string";
  const hasStatus = isTodoStatus(obj.status); // type guard kita sendiri
  const hasCreatedAt = typeof obj.createdAt === "string";
  return hasId && hasTitle && hasStatus && hasCreatedAt;
}

//type guard 3: cek apakah sesuatu adalah array of Todo
export function isTodoList(value: unknown): value is TodoList {
  if (!Array.isArray(value)){
    return false;
  }
  //setiap elemen dalam array harus lolos type guard isTodo()
  return (value as unknown[]).every((item: unknown) => isTodo(item));
}

// HELPER: Generate ID unik untuk To-Do baru
// kalau list kosong, mulai dari 1
export function generateId(todos: TodoList): number {
  if (todos.length === 0) {
    return 1;
  }

  // math.max(...) butuh list angka
  // spread operator (...) mengubah array menjadi arument terpisah
  const maxId = Math.max(...todos.map((todo) => todo.id));
  return maxId + 1;
}

// HELPER: Format tampilan status
// ini fungsi kecil tapi penting untuk konsistensi tampilan
export function getCurrentTimestamp(): string {
  return new Date(). toISOString();
}

//HELPER: Validasi bahwa string tidak kosong
export function isNonEmptyString(value: string): boolean {
  return value.trim().length > 0;
}
