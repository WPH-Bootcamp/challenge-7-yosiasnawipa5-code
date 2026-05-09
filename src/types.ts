// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item

// TODO: Buat tipe untuk status To-Do (active/done)

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

//status: "active"✅ | status: "done" ✅ | status "pending" ❌
export type TodoStatus = "active" | "done";

//✅ interface untuk satu item To-Do
export interface Todo {
  id: number;      //Angka unik pengenal to-do
  title: string;    //Judul /deskripsi tugas
  status: TodoStatus;  //Hanya boleh "active" atau "done"
  createdAt: string;    //Tanggal dibuat (format ISO string)
}

//✅ Type alias untuk array of Todo
export type TodoList = Todo[];

//✅ Interface untuk operasi yang bisa dilakukan user
export interface TodoOperation {
  addTodo(title: string): void;
  completeTodo(id: number): void;
  deleteTodo(id: number): void;
  listTodo(): void;
}

//✅ Type untuk hasil operasi yang bisa sukses atau gagal
export type OperationResult =
  | { success: true; message: string }
  | { success: false; error: string }
