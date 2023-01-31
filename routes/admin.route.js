/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const adminController = require(`../controllers/admin.controller`)
const authorization = require(`../middleware/authorization`) 

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// rute menampilkan data telur
app.get("/", authorization.cekUser, adminController.tampilkanAdmin)

// rute utk tambah data
app.get("/add", authorization.cekUser, adminController.menambahAdmin)

// rute proses manambah data
app.post(`/add`, authorization.cekUser, adminController.prosesTambah)

// rute utk mengedit data
app.get(`/edit/:id`, authorization.cekUser, adminController.editDataAdmin)

// rute utk menyimpan edit
app.post(`/edit/:id`, authorization.cekUser, adminController.prosesSimpanEdit)

// rute utk hapus
app.get(`/delete/:id`, authorization.cekUser, adminController.prosesHapus)

/** export object "app" to another file */
module.exports = app