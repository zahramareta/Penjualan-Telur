// panggil model telur
const telurModel = require(`../models/telur.model`)

// panggil model member
const memberModel = require(`../models/member.model`)
const { request, response } = require("express")

// panggil model pack
const packModel = require(`../models/pack.model`)

// panggil model transaksi
const transaksiModel = require(`../models/transaksi.model`)

// panggil model detail transaksi
const detailModel = require(`../models/detail_transaksi.model`)

// buat function utk menampilkan form transaksi
exports.showFormTransaksi = async (request, response) => {
    try {
        // ambil data obat
        let telur = await telurModel.findAll()
        // ambil data cust
        let member = await memberModel.findAll()
        // ambil data pack
        let pack = await packModel.findAll()

        // prepare data yg akan dipasing di view
        let sendData = {
            dataTelur: telur,
            dataMember: member,
            dataPack: pack,
            page: `form-transaksi`,
            tgl_transaksi: ``,
            dataTelurString: JSON.stringify(telur),
            dataPackString: JSON.stringify(pack),
            // java script object notation
            dataUser: request.session.dataUser,
            cart: request.session.cart
        }
        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// membuat fungsi untuk menambahkan obat ke cart
exports.addToCart = async (request, response) => {
    try {
        // dapatkan data obat berdasarkan id obat yang dikirimkan
        let selectedTelur = await telurModel.findByCriteria({
            id: request.body.id_telur
        })
        let selectedPack = await packModel.findByCriteria({
            id_pack: request.body.id_pack
        })
        // tampung / receive data yg dikirimkan 
        let storeData = {
            id_telur: request.body.id_telur,
            jumlah_telur: request.body.jumlah_telur,
            id_pack: request.body.id_pack,
            jumlah_pack: request.body.jumlah_pack,
            harga_telur: request.body.harga_telur,
            harga_pack: request.body.harga_pack,
            jenis_telur: selectedTelur[0].jenis_telur,
            nama_pack: selectedPack[0].nama_pack
        }

        // masukkan data ke keranjang menggunakan session
        request.session.cart.push(storeData) //menambah data ke dalam array
        
        // direct ke halaman form transaksi
        return response.redirect(`/transaksi/add`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function utk menghapus data cart
exports.hapusCart = async (request, response) => {
    try {
        // ambil seluruh data cart pd session
        let cart = request.session.cart

        // ambil id obat yg akan dihapus
        let id_telur = request.params.id_telur

        let id_pack = request.params.id_pack

        // cari tau posisi index dari data yang akan dihapus
        let index = cart.findIndex(item => item.id_telur == id_telur)

        // hapus data sesuai index
        cart.splice(index, 1) //untk menghapus data dlm array

        // mengembalikan data cart ke dalam session
        request.session.cart = cart

        // direct ke form trnsksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// fundtion untk meyimpan data transaksi
exports.simpanTransaksi = async (request, response) => {
    try {
        // tampung data yg dikirimkan 
        let newTransaksi = {
            tgl_transaksi: request.body.tgl_transaksi,
            id_member: request.body.id_member,
            id_admin: request.session.dataUser.id_admin

        }

        // simpan transaksi
        let resultTransaksi = await transaksiModel.add(newTransaksi)

        // manampung isi cart 
        let cart = request.session.cart

        for (let i = 0; i < cart.length; i++) {
            // hapus dulu data nama obat dari cart
            delete cart[i].jenis_telur
            delete cart[i].nama_pack

            // tambah key id transaksi ke dlm cart
            cart[i].id_transaksi = resultTransaksi.insertId

            // eksekusi simpan cart ke detail trsnski
            await detailModel.add(cart[i])
        }

        // hapus cartnya
        request.session.cart = []

        // direct ke form transaksi
        return response.redirect(`/transaksi/add`)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function untk menampilkan data transaksi
exports.showTransaksi = async (request, response) => {
    try {
        // ambil dadta transaksi
        let transaksi = await transaksiModel.findAll()

        // sisipkan data detail dari setiap transaksi
        for (let i = 0; i < transaksi.length; i++) {
            // ambil id transaksi
            let id = transaksi[i].id_transaksi

            // ambil data detail sesuai id
            let detail = await detailModel.findByCriteria({id_transaksi: id})

            // sisipkan detail ke transaksinya
            transaksi[i].detail = detail
        }

        // prepare data yg akan dikirimkan ke view
        let sendData = {
            page: `transaksi`,
            dataUser: request.session.dataUser,
            transaksi: transaksi
        }

        return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// funtion untk menghapus data transaksi
exports.hapusTransaksi = async (request,response) => {
    try {
        // menampung data id yg akan dihapus
        let id = request.params.id

        // proses menghapus detail transaksi
        await detailModel.delete({id_transaksi: id})

        // menghapus data transaksi
        await transaksiModel.delete({id_transaksi: id})

        // redirect ke transaksi
        return response.redirect(`/transaksi`)

    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}