# MyKuliner — Tempat Review Kuliner Berbagai Restoran

## Deskripsi Website

Website yang berisi user dapat melakukan login, register akun, logout. Dalam dashboard bisa melakukan tambah review dari kuliner di suatu restoran, menginput nama kuliner, restoran, alamat, poto (opsional), deskripsi, dan juga rating bintang. Hasil review dapat difilter dari abjad, rating, dan bisa dicari. Dalam melakukan aksi CRUD pada hasil review.

## Alasan Membuat MyKuliner

Setiap pembeli pasti ingin menikmati makanan yang enak. Makanan yang enak pasti dapat diterima banyak orang. Oleh karena itu, penilaian orang terhadap makanan penting. Penilaian atau review menjadi penting untuk konsumen memilih makanan. Itulah alasan saya membuat website kecil ini. Alasan lain karena saya doyan makan, dan mau cari makan enak, ya harus liat respon banyak orang dong. Selain itu juga saya terinspirasi gofood dan shopeefood. Alasan lainnya karena ini tugas akhir dari Matakuliah Pemrograman Web.

---

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
    * Mengurutkan review berdasarkan abjad (nama kuliner, nama restoran).
* **Data Dummy:** Inisialisasi otomatis data pengguna dan review dummy untuk memudahkan pengujian dan demonstrasi.

## Dosen Pengampu

**Pak Muhammad Habib Algifari, S.Kom., M.T.I.**  
Dosen kece di Institut Teknologi Sumatera  
Mata kuliah: *Pemrograman Web*
Kode Matkul  : IF3028

---

## Identitas Pembuat

Nama : Reynaldi Cristian Simamora 
NIM : 122140116
GitHub: [@reynaldi116](https://github.com/reynaldi116)  

---

## 🛠️ Instalansi Penggunaaan

### Backend (Python Pyramid)

1. Clone dulu repositori ini  
   ```bash
   git clone https://github.com/reynaldi116/tubes_pemrograman_web_itera_122140116.git
   cd tubes_pemrograman_web_itera_122140116
2. Mengaktifkan environment python
``` bash
    python -m venv env
    source env/bin/activate # Untuk pengguna MacOs
    env\Scripts\activate # Untuk pengguna Windows
```
   
3. Menginstal Depedensi
```bash
    cd Backend/mykulinerdb # Masuk Direktori
    pip install -e .
    python.exe -m pip install --upgrade pip # Jika Terdapat Error perlu pip python versi terbaru
    pip install psycopg2-binary # Untuk memastikan libray pyscopg2 ada
```

4. Mengatur Database
Pastikan Postgres Telah Diinstal. Perbarui file `development.ini` dengan URL sesuai akun kredensial anda :
```bash
    sqlalchemy.url = postgresql://.../mykulinerdb
```

5. Melakukan inisialisasi Database
```bash
   alembic -c development.ini revision --autogenerate -m "init"
   alembic -c development.ini upgrade head
   python -m mykulinerdb.scripts.initialize_db development.ini
```
6. Menjalankan Database Server
```bash 
    pserve development.ini --reload
```

### Frontend (React JS)

1. Pindah direktori  
   ```bash 
   cd ../../Frontend/mykuliner
    ```
2. Instal depedensi
``` bash
    npm install
```
   
3. Menginstal Depedensi
```bash
    npm start
```

### Struktur Projek

* `backend/mykulinerdb` – Python Pyramid
  * `Backend/mykulinerdb/development.ini` – Konfigurasi Database
  * `Backend/mykulinerdb/mykulinerdb/models` – SQLAlchemy model entitas
  * `Backend/mykulinerdb/mykulinerdb/views/` – API views
  * `Backend/mykulinerdb/mykulinerd/scripts/initialize_db.py` – Skrip dari inisial database
  * `Backend/mykulinerdb/mykulinerdb/models` - Mengatur Rute

* `Frontend/` – React JavaScript
  * `src/pages/` – Pengaturan halaman
  * `src/components/` – Komponen Frontend
  * `src/hooks/` – Kustom hook
  * `src/lib/utils.js` – Fungsi utilitas


### Referensi
https://www.programiz.com/python-programming/examples/pyramid-patterns
https://react.dev/learn
https://github.com/BelajarPyramidReact

### Terima Kasih
