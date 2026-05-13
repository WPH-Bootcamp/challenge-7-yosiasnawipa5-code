// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword
// Business Logic Layer
import { Todo, TodoList, TodoOperation, OperationResult } from "./types";
import { readTodos, writeTodos } from "./storage";
import { generateId, getCurrentTimestamp, isNonEmptyString } from "./utils";

//class TodoService - mengimplementasikan kontrak TodoOperations
export class TodoService {

  //add: Tambah To-Do baru
  addTodo(title: string): void {
    if (!isNonEmptyString(title)) {
      console.log("❌ Judul to-do tidak boleh kosong!");
      return;
    }

    //baca data yang sudah ada
    const todos: TodoList = readTodos();
    const newTodo: Todo = {
      id: generateId(todos),
      title: title.trim(), // hapus spasi di ujung
      status: "active", // selalu mulai aktif
      createdAt: getCurrentTimestamp(),
    };

    //tambah ke array dan simpan
    todos.push(newTodo);
    writeTodos(todos);

    console.log('✅ To-do berhasil ditambahkan! (ID: ${newTodo.id})');
  }

  //complete: Tandai To-Do sebagai selesai
  completeTodo(id: number): void {
    const todos: TodoList = readTodos();
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    // handle kasus: ID tidak ditemukan
    if (todoIndex === -1) {
      console.log('❌ To-do dengan ID ${id} tidak ditemukan.');
      return;
    }
    //handle kasus: sudah done (tidak perlu diubah lagi)
    if (todos[todoIndex].status === "done") {
      console.log('ℹ️ To-do "${todos[todoIndex].title}" sudah selesai sebelumnya.');
      return;
    }
    //update status - typescript tahu ini adalah Todo yang Valid
    todos[todoIndex].status = "done";
    writeTodos(todos);

    console.log('✅ To-do "${todos[todoIndex].title}" ditandai selesai');
  }

  //DELETE: Hapus To-Do berdasarkan ID
  deleteTodo(id: number): void {
    const todos: TodoList = readTodos();
    // cari apakah id ada
    const todoToDelete = todos.find((todo) => todo.id === id);

    if (!todoToDelete) {
      console.log('❌ To-do dengan ID ${id} tidak ditemukan.');
      return;
    }

    const updatedTodos = todos.filter((todo) => todo.id !== id);
    writeTodos(updatedTodos);

    console.log('🗑️ To-do "${todoToDelete.title}" berhasil dihapus!');
  }

  //LIST: Tampilan semua To-Do
  listTodos(): void {
    const todos: TodoList = readTodos();

    if (todos.length === 0) {
      console.log("📭 Belum ada to-do. Tambahkan yang pertama!");
      return;
    }

    console.log("\n" + "=".repeat(50));
    console.log("📋 DAFTAR TO-DO");
    console.log("=".repeat(50));

    todos.forEach((todo, index) => {
      const statusLabel = formatStatus(todo.status);
      const number = (index + 1).toString().padStart(2, " "); // "1" -> "1"

      console.log('${statusLabel} ${number}. ${todo.title}');
    });

    //tampilkan ringkasan statistik
    const activeCount = todos.filter((t) => t.status === "active").length;
    const doneCount = todos.filter((t) => t.status === "done").length;

    console.log("=".repeat(50));
    console.log('📊 Total: ${todos.length} | Aktif: ${activeCount} | Selesai: ${doneCount}');
    console.log("=".repeat(50) + "\n");
  }

  //metthod dengan return type operationresult
  addTodoSafe(title: string): OperationResult {
    if (!isNonEmptyString(title)) {
      return { success: false, error: "Judul tidak boleh kosong"
      };
    }

    try {
      const todos = readTodos();
      const newTodo: Todo = {
        id: generateId(todos),
        title: title.trim(),
        status: "active",
        createdAt: getCurrentTimestamp(),
      };
      todos.push(newTodo);
      writeTodos(todos);

      return { success: true, message: `To-do "${newTodo.title}" berhasil ditambahkan (ID: ${newTodo.id})` };
    } catch (error) {
      return { success: false, error: `Gagal menyimpan: ${error}`};
    }
  }
}
