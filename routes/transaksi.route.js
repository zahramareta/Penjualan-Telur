// panggil express
const express = require(`express`)

// buat objek dari express
const app = express()

// minta izin membaca data dari body
app.use(express.urlencoded({extended: true}))

// panggil controller transaksi
const transaksiController = require(`../controllers/transaksi.controller`)

// panggil middleware untk auth
const authorization = require(`../middleware/authorization`)

// route utk menampilkan from transaksi
app.get(`/add`, authorization.cekUser, transaksiController.showFormTransaksi)

// route utk menyimpan data transaksi
app.post(`/add`, authorization.cekUser, transaksiController.simpanTransaksi)

// route utk tampil data transaksi
app.get(`/`, authorization.cekUser, transaksiController.showTransaksi)

// route utk menghapus
app.get(`/:id`, authorization.cekUser, transaksiController.hapusTransaksi)

// export obj app
module.exports = app