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
import { Todo, TodoList, TodoOperations, OperationResult } from "./types";
import { readTodos, writeTodos } from "./storage";
import { generateID, formatStatus, getCurrentTimestamp, isNonEmptyString } from "./utils";

//class TodoService - mengimplementasikan kontrak TodoOperations
export class TodoService implements TodoOperations {

  //add: Tambah To-Do baru
  addTodo(title: string): void {
    if (!isNonEmptyString(title)) {
      console.log("❌ Judul to-do tidak boleh kosong!");
      return;
    }

    //baca data yang sudah ada
    const todos: TodoList = readTodos();
    const newTodo: Todo = {
      id: generateID(todos),
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
}
