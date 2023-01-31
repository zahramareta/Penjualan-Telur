/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const packController = require(`../controllers/pack.controller`)
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// rute menampilkan data telur
app.get("/", authorization.cekUser, packController.tampilkanPack)

// rute utk tambah data
app.get("/add", authorization.cekUser, packController.menambahPack)

// rute proses manambah data
app.post(`/add`, authorization.cekUser, packController.prosesTambah)

// rute utk mengedit data
app.get(`/edit/:id`, authorization.cekUser, packController.editDataPack)

// rute utk menyimpan edit
app.post(`/edit/:id`, authorization.cekUser, packController.prosesSimpanEdit)

// rute utk hapus
app.get(`/delete/:id`, authorization.cekUser, packController.prosesHapus)

/** export object "app" to another file */
module.exports = app