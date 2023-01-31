// load model
const adminModel = require(`../models/admin.model`)

// load crypt
const crypt = require(`../crypto`)
const { request, response } = require("../routes/telur.route")

// menampilkan halaman login
exports.tampilanLogin = (request, response) => {
    try {
        return response.render(`../views/pages/login`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

exports.authentication = async (request, response) => {
    try {
        // tampung data username & pw
        let username = request.body.username
        let password = request.body.password

        // cek kecocokan username
        let result = await adminModel.findByCriteria({username: username})

        // cek keberadaan data apoteker
        if(result.length > 0) {
            // cek kecocokan pw
            if (password === crypt.deskripsi(result[0].password)) {
                // login berhasil
                // menyimpan data user ke session
                request.session.dataUser = result[0]

                // definisi cart di session
                request.session.cart = []
                
                return response.redirect(`/home`)
            }else{
                // login gagal
                return response.redirect(`/auth`)
            }
            
        }else {
            return response.redirect(`/auth`)
        }

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat function logout
exports.logout = async (request, response) => {
    try {
        // menghapus data user dari session
        request.session.dataUser = undefined
        return response.redirect(`/auth`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}