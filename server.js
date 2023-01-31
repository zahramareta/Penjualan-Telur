/** load library express */
const express = require(`express`)

/** instance "app" object */
const app = express()

/** define port for the server */
const PORT = `8000`

/** set view engine to ejs */
app.set(`view engine`, `ejs`)

// load session
const session = require(`express-session`)

// session config
app.use(session({
    secret: `i love javascript`,
    resave: false,
    saveUninitialized: false
}))

/** load routes */
const telur = require(`./routes/telur.route`)
const pack = require(`./routes/pack.route`)
const member = require(`./routes/member.route`)
const admin = require(`./routes/admin.route`)
const auth = require(`./routes/auth.route`)
const home = require(`./routes/home.route`)
const transaksi = require(`./routes/transaksi.route`)
const cart = require(`./routes/cart.route`)

/** define prefix for route obat */
app.use(`/telur`, telur)
app.use(`/pack`, pack)
app.use(`/member`, member)
app.use(`/admin`, admin)
app.use(`/auth`, auth)
app.use(`/home`, home)
app.use(`/transaksi`, transaksi)
app.use(`/cart`, cart)

/** running web server based on defined PORT */
app.listen(PORT, () => {
    console.log(`Server Apotek is running on port ${PORT}`);
})
