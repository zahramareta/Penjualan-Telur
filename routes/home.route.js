/** load express js */
const express = require(`express`)

/** create object of express */
const app = express()

// load controller home
const homeController = require(`../controllers/home.controller`)
const authorization = require(`../middleware/authorization`)

/** allow route to read urlencoded data */
app.use(express.urlencoded({ extended: true }))

// menampilkan home
app.get(`/`, authorization.cekUser, homeController.tampilanHome)

/** export object "app" to another file */
module.exports = app
