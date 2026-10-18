# 🔐 Simple Text Encrypter (Caesar Cipher)

Aplikasi penyandi teks sederhana (*Text Encrypter / Decrypter*) berbasis algoritma klasika **Sandi Caesar (Caesar Cipher)** untuk mengubah pesan biasa menjadi kode rahasia atau sebaliknya secara *real-time*.

---

## 🎯 Konsep Pembelajaran RPL / Pemrograman Web

1. **ASCII Code Manipulation (`charCodeAt` & `fromCharCode`):**
   Memanfaatkan kode ASCII huruf kapital (65–90) dan huruf kecil (97–122) untuk menggeser posisi karakter secara matematis.
2. **Modulo Arithmetic (`% 26`):**
   Menerapkan operasi aritmatika modulo untuk memastikan hasil pergeseran huruf kembali melingkar (*wrap around*) dalam alfabet 26 huruf.
3. **Real-time Event Processing:**
   Merespons setiap ketikan teks atau perubahan angka *shift* secara langsung tanpa membutuhkan tombol pemroses manual.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Mode switcher, input shift key, area teks, dan kotak hasil
├── style.css        # Desain Neobrutalism ungu-pop, gaya tombol aktif, dan toast
└── script.js        # Rumus Caesar Cipher (ASCII & Modulo), mode handler, & DOM
