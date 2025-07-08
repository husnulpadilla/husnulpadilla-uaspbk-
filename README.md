# 💆 Spa & Reflexology Booking App

Aplikasi frontend berbasis Vue 3 untuk mengelola layanan spa, refleksi, dan totok, dilengkapi fitur transaksi, keranjang, pengerjaan, riwayat, dan laporan.

---

## 🚀 Fitur Utama

- Menampilkan menu layanan berdasarkan kategori
- Menambahkan layanan ke keranjang
- Checkout transaksi dengan nama pelanggan
- Menandai transaksi selesai
- Menampilkan riwayat transaksi
- Melihat total transaksi & pemasukan di laporan

---

## 🗂️ Halaman (Routing)

| Path            | Nama Halaman   | Fungsi                                                        |
|-----------------|----------------|---------------------------------------------------------------|
| `/`             | Home           | Menampilkan daftar layanan & tombol keranjang                 |
| `/transaksi`    | Transaksi      | Menampilkan isi keranjang & checkout                          |
| `/pengerjaan`   | Pengerjaan     | Menampilkan transaksi yang belum selesai & tombol selesai     |
| `/riwayat`      | Riwayat        | Menampilkan daftar transaksi yang sudah selesai               |
| `/laporan`      | Laporan        | Statistik total transaksi dan pemasukan                       |

---

## 🔗 Endpoint API (JSON Server)

| Endpoint                     | Method | Fungsi                                                                 |
|-----------------------------|--------|------------------------------------------------------------------------|
| `/menu`                     | GET    | Mengambil daftar layanan spa/refleksi/totok per kategori              |
| `/transaksi`                | GET    | Mengambil seluruh data transaksi                                      |
| `/transaksi`                | POST   | Menambahkan transaksi baru dari checkout                              |
| `/transaksi/:id`            | PATCH  | Menandai transaksi sebagai selesai (`{ selesai: true }`)              |

---

## 📁 Contoh `db.json`

```json
{
  "menu": [
    {
      "id": 1,
      "kategori": "Spa",
      "variasi": [
        { "id": 101, "nama": "Body Spa Aromatherapy", "harga": 120000 },
        { "id": 102, "nama": "Hot Stone Massage", "harga": 150000 }
      ]
    },
    {
      "id": 2,
      "kategori": "Refleksi",
      "variasi": [
        { "id": 201, "nama": "Refleksi Kaki", "harga": 80000 },
        { "id": 202, "nama": "Refleksi Punggung", "harga": 90000 }
      ]
    },
    {
      "id": 3,
      "kategori": "Totok",
      "variasi": [
        { "id": 301, "nama": "Totok Wajah", "harga": 70000 },
        { "id": 302, "nama": "Totok Tubuh", "harga": 95000 }
      ]
    }
  ],
  "transaksi": []
}
