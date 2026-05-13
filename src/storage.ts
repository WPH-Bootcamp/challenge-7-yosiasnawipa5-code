import * as fs from 'fs';
import * as path from 'path';
import { TodoList } from "./types";
import { isTodoList } from "./utils"

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

//konfigurasi path file
const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_File = path.join(DATA_DIR, "todos.json");

//pastikan folder "data" ada sebelum dipakai
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true});
  }
}

//READ: Baca semua To-Do dari file JSON
export function readTodos(): TodoList {
  //selalu pastikan folder ada dulu
  ensureDataDir();

  //return array kosong (bukan kosong)
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  try {
    //baca isi file sebagai string
    const rawData = fs.readFileSync(DATA_FILE, "utf-8");

    //kalau file kosong, return array kosong
    if (rawData.trim() === "") {
      return [];
    }

    //Parse JSON string -> JS object
    const parsedData: unknown = JSON.parse(rawData);

    // type guard! validasi bahwa data yang dibaca sesuai harapan
    if (!isTodoList(parsedData)) {
      console.error("⚠️ Data di file rusak atau formatnya salah. Reset ke array kosong.");
      return [];
    }

    // kalau lolos type guard, typescript sekarang tahu ini adalah TodoList
    return parsedData;
  } catch (error) {
    console.error ("❌ Gagal membaca file:", error);
    return [];
  }
}

//WRITE: Simpan semua To-Do ke file json
export function writeTodos(todos: TodoList): void {
  ensureDataDir();

  try {
    const jsonString = JSON.stringify(todos, null, 2);
    fs.writeFileSync(DATA_FILE, jsonString, "utf-8");
  } catch (error) {
    throw new Error('Gagal menyimpan data: ${error}');
  }
}
