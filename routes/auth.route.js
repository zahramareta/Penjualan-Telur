// panggil express
const express = require(`express`)

// buat objek utk express
const app = express()

// minta izin untk membaca request dari user
app.use(express.urlencoded({extended: true}))

// panggil controller
const authController = require(`../controllers/auth.controller`)

// untuk menampilkan halaman login
app.get(`/`, authController.tampilanLogin)

// membuat route untk proses login
app.post(`/`, authController.authentication)

// route untk proses logout
app.get(`/logout`, authController.logout)

// ekspor objek app
module.exports = app