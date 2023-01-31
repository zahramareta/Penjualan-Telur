/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const telurController = require(`../controllers/telur.controller`)
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// rute menampilkan data telur
app.get("/", authorization.cekUser, telurController.tampilkanTelur)

// rute utk tambah data
app.get("/add", authorization.cekUser, telurController.menambahTelur)

// rute proses manambah data
app.post(`/add`, authorization.cekUser, telurController.prosesTambah)

// rute utk mengedit data
app.get(`/edit/:id`, authorization.cekUser, telurController.editDataTelur)

// rute utk menyimpan edit
app.post(`/edit/:id`, authorization.cekUser, telurController.prosesSimpanEdit)

// rute utk hapus
app.get(`/delete/:id`, authorization.cekUser, telurController.prosesHapus)

/** export object "app" to another file */
module.exports = app

