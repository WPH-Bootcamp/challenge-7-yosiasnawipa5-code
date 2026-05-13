// TODO: Import readline untuk membaca input dari command line

// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

// TODO: Jalankan fungsi main
//console.log('Welcome to TypeScript To-Do App!');
//console.log('Start building your app here...');
import * as readline from "readline";
import { TodoService } from "./todoService";

const service = new TodoService();

const rl = readliine.createInterface({
  input: process.stdin, //sumber input: keyboard
  output: process.stdout,
});

// Helper : Tanya User dan return jawaban sebagai promise

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer: string) => {
      resolve(answer.trim()); //hapus spasi di ujung jawaban
    });
  });
}

//Tampilkan menu utama
function showMenu(): void {
  console.log("\n" + "=".repeat(40));
  console.log("📋 TO-DO APP (TypeScript)");
  console.log("=".repeat(40));
  console.log("1. ➕ Tambah To-Do");
  console.log("2. ✅ Tandai selesai");
  console.log("3. 🗑️ Hapus To-Do");
  console.log("4. 📋 Lihat Semua To-Do");
  console.log("5. 🚪 Keluar");
  console.log("=".repeat(40));
}

//main loop - Aplikasi berjalan sampai user pilih "keluar"
async function main(): Promise<void> {
  console.log("\n🚀 Selamat datang di To-Do App TypeScript!");
  while (true) {
    showMenu();
    const choice = await prompt("pilih menu (1-5): ");
    switch (choice) {
        // ------------------------------------------
      case "1": {
        //Tambah To-do
        const title = await prompt("judul to-do: ");

        if (title === "") {
          console.log("❌ Judul tidak boleh kosong!");
        } else {
          service.addTodo(title);
        }
        break;
      }

        // ----------------------------------------------
      case "2": {
        service.listTodos();

        const idInput = await prompt("Masukan ID yang ingin diselesaikan: ");
        const id = parseInt(idInput, 10);

        if (isNaN(id) || id <= 0) {
          console.log("❌ ID harus berupa angka positif!");
        } else {
          service.completeTodo(id);
        }
        break;
      }

        //--------------------------------------------------
      case "3": {
        //hapus To-Do
        service.listTodos();

        const idInput = await prompt("Masukkan ID yang ingin dihapus: ");
        const id = parseInt(idInput, 10);

        if (isNaN(id) || id <= 0) {
          console.log("❌ ID harus berupa angka positif!");
        } else {
          //minta konfigurasi sebelum hapus
          const confirm = await prompt('Yakin hapus to-do ID ${id}? (y/n): ');
          if (confirm.toLowerCase() === "y") {
            service.deleteTodo(id);
          } else {
            console.log("ℹ️ Penghapusan dibatalkan.");
          }
        }
        break;
      }

        //------------------------------------------------------
      case "4": {
        //lihat semua To-Do
        service.listTodos();
        break;
      }

        //------------------------------------------------
      case "5": {
        //keluar dari aplikasi
        console.log("\n👋🏿 Sampai jumpa Tetap produktif!\n");
        rl.close();// tutup readline interface
        process.exit(0); //Hentikan program dengan kode sukses
      }

        //-------------------------------------------------------
      default: {
        //input tidak valid (bukan 1-5)
        console.log('❌ Pilihan "${choice}" tidak valid. Masukan angka 1-5.');
      }
    } 
  }
}


// Jalankan main() dan tangkap error yang tidak terduga
main().catch((error) => {
  console.error("💥 Terjadi kesalahan fatal:", error);
  rl.close();
  process.exit(1); 
});
