/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

/** load obat controller */
const memberController = require(`../controllers/member.controller`)
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// rute menampilkan data telur
app.get("/", authorization.cekUser, memberController.tampilkanMember)

// rute utk tambah data
app.get("/add", authorization.cekUser, memberController.menambahMember)

// rute proses manambah data
app.post(`/add`, authorization.cekUser, memberController.prosesTambah)

// rute utk mengedit data
app.get(`/edit/:id`, authorization.cekUser, memberController.editDataMember)

// rute utk menyimpan edit
app.post(`/edit/:id`, authorization.cekUser, memberController.prosesSimpanEdit)

// rute utk hapus
app.get(`/delete/:id`, authorization.cekUser, memberController.prosesHapus)

/** export object "app" to another file */
module.exports = app