# MyKuliner - Aplikasi Review Kuliner

MyKuliner adalah aplikasi web sederhana yang memungkinkan pengguna untuk mencatat, me-review, dan memberi rating pada kuliner favorit mereka. Aplikasi ini dibangun menggunakan ReactJS dengan fokus pada praktik modern seperti Function Components, Hooks, React Router DOM untuk navigasi, dan Context API untuk manajemen state. Untuk persistensi data, aplikasi ini menggunakan mock API yang berinteraksi dengan Local Storage browser.

## Fitur Utama

* **Autentikasi Pengguna:** Registrasi dan Login pengguna.
* **Dashboard Review:** Menampilkan semua review kuliner yang telah dibuat oleh pengguna yang sedang login.
* **Manajemen Review (CRUD):**
    * Membuat review kuliner baru (nama kuliner, nama restoran, alamat, deskripsi, URL foto, rating bintang).
    * Mengedit review yang sudah ada.
    * Menghapus review.
* **Pencarian & Penyaringan:**
    * Mencari review berdasarkan nama kuliner atau nama restoran.
    * Memfilter review berdasarkan rating bintang.
    * Mengurutkan review berdasarkan abjad (nama kuliner, nama restoran) atau tanggal terbaru.
* **Data Dummy:** Inisialisasi otomatis data pengguna dan review dummy untuk memudahkan pengujian dan demonstrasi.

## Teknologi yang Digunakan

* **Frontend:**
    * React.js (v18+)
    * React Router DOM (v6) untuk routing
    * React Context API untuk State Management global
    * Custom Hooks untuk logika yang dapat digunakan kembali
    * JavaScript (ES6+) & JSX
    * HTML5 & CSS3 (styling dasar)
* **Penyimpanan Data (Mock):**
    * Local Storage Browser

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut di sistem Anda:

* [Node.js](https://nodejs.org/) (versi LTS direkomendasikan, misal v18.x atau v20.x)
* npm (Node Package Manager, biasanya terinstal bersama Node.js) atau [Yarn](https://yarnpkg.com/)

## Panduan Memulai

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone Repositori:**
    ```bash
    git clone https://github.com/reynaldi116/tubes_pemrograman_web_itera_122140116
    ```

2.  **Masuk ke Direktori Proyek:**
    ```bash
    cd mykuliner
    ```

3.  **Instal Dependensi:**
    Jika menggunakan npm:
    ```bash
    npm install
    ```
    Jika menggunakan Yarn:
    ```bash
    yarn install
    ```

4.  **Konfigurasi Environment Variables (Opsional):**
    Saat ini, aplikasi ini menggunakan mock API yang sepenuhnya berjalan di sisi klien dan tidak memerlukan file `.env` khusus untuk API key atau konfigurasi backend. Namun, jika Anda berencana mengintegrasikannya dengan backend sungguhan di masa depan, Anda mungkin perlu membuat file `.env` di root proyek.

5.  **Jalankan Server Pengembangan:**
    Jika menggunakan npm:
    ```bash
    npm start
    ```
    Jika menggunakan Yarn:
    ```bash
    yarn start
    ```
    Aplikasi akan secara otomatis terbuka di browser default Anda pada alamat `http://localhost:3000`. Jika tidak, buka alamat tersebut secara manual.

## Skrip yang Tersedia

Dalam direktori proyek, Anda dapat menjalankan beberapa skrip bawaan dari Create React App:

* `npm start` atau `yarn start`
    Menjalankan aplikasi dalam mode pengembangan.

* `npm test` atau `yarn test`
    Menjalankan test runner dalam mode interaktif. (Saat ini belum ada test yang dikonfigurasi secara spesifik untuk aplikasi ini).

* `npm run build` atau `yarn build`
    Mem-build aplikasi untuk produksi ke dalam folder `build/`. Ini mengoptimalkan build untuk performa terbaik.

* `npm run eject` atau `yarn eject`
    **Catatan:** Ini adalah operasi satu arah. Sekali Anda `eject`, Anda tidak bisa kembali! Ini akan menyalin semua file konfigurasi dan dependensi transitif (Webpack, Babel, ESLint, dll.) langsung ke proyek Anda sehingga Anda memiliki kontrol penuh atasnya. Gunakan dengan hati-hati.

## Struktur Proyek (Ringkasan `src`)

Berikut adalah gambaran umum struktur folder `src/`:

* **`api/`**: Berisi logika untuk simulasi interaksi dengan API (menggunakan Local Storage).
* **`assets/`**: Tempat untuk menyimpan file statis seperti gambar dan ikon (saat ini kosong, perlu diisi sesuai kebutuhan).
* **`components/`**: Berisi komponen UI React yang dapat digunakan kembali, diorganisir berdasarkan fitur atau kegunaan umum:
    * `Auth/`: Komponen terkait autentikasi (LoginForm, RegisterForm).
    * `Dashboard/`: Komponen spesifik untuk halaman dashboard (ReviewList, ReviewItem, SearchBar, Filter).
    * `Layout/`: Komponen untuk tata letak halaman (Navbar, Footer, MainLayout).
    * `Reviews/`: Komponen terkait formulir pembuatan/edit review (ReviewForm).
    * `UI/`: Komponen UI generik (Button, Input, Spinner, StarRating).
* **`contexts/`**: Digunakan untuk state management global menggunakan React Context API (AuthContext, ReviewContext).
* **`hooks/`**: Berisi custom React Hooks untuk memisahkan dan menggunakan kembali logika stateful (useAuth, useReviews, useForm).
* **`pages/`**: Komponen React yang merepresentasikan halaman-halaman individual dalam aplikasi (LoginPage, DashboardPage, dll.).
* **`routes/`**: Konfigurasi routing aplikasi menggunakan React Router DOM (AppRoutes, PrivateRoute).
* **`styles/`**: Berisi file CSS global (`global.css`).
* **`App.jsx`**: Komponen root aplikasi.
* **`index.js`**: Titik masuk JavaScript untuk aplikasi React.

## Data Dummy & Akun untuk Login

Aplikasi ini dirancang untuk secara otomatis menginisialisasi data pengguna dan review dummy ke dalam Local Storage browser Anda jika Local Storage kosong atau belum berisi data aplikasi. Ini memudahkan Anda untuk langsung mencoba fitur-fitur aplikasi.

**Untuk Memicu Ulang Inisialisasi Data Dummy (jika diperlukan):**

1.  Buka Developer Tools di browser Anda (biasanya dengan menekan `F12`).
2.  Pergi ke tab "Application" (di Chrome/Edge) atau "Storage" (di Firefox).
3.  Di bawah bagian "Local Storage", temukan domain tempat aplikasi Anda berjalan (misalnya, `http://localhost:3000`).
4.  Klik kanan pada domain tersebut dan pilih "Clear" (atau hapus item `mykuliner_users` dan `mykuliner_reviews` secara manual).
5.  Muat ulang (refresh) halaman aplikasi.

**Anda dapat login menggunakan salah satu akun dummy berikut:**

* **Akun 1:**
    * Email: `budi@example.com`
    * Password: `password123`
    * Nama: Budi Kuliner
* **Akun 2:**
    * Email: `siti@example.com`
    * Password: `password123`
    * Nama: Siti Reviewer

---

Reynaldi Cristian Simamora 122140116

Teknik Informatika

Institut Teknologi Sumatera 2025