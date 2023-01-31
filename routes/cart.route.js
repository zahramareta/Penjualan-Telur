// panggil express
const express = require(`express`)

// bikin obj
const app = express()

// minta izin untk baca data
app.use(express.urlencoded({extended: true}))

// panggil controller transaksi
const transaksiController = require(`../controllers/transaksi.controller`)

// panggil auth dr middleware
const authorization = require(`../middleware/authorization`)

// mendefinisikan route utk menambah cart
app.post(`/`,authorization.cekUser, transaksiController.addToCart)

// define route utk menghapus item
app.get(`/:id`, authorization.cekUser, transaksiController.hapusCart)

// ekspor obj app
module.exports = app
