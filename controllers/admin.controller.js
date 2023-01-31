// panggil model member

const adminModel = require(`../models/admin.model`)
const { request, response } = require("../routes/admin.route")

// memanggil file crypt.js
const crypt = require(`../crypto`) 

// fungsi utk menampilkan data telur
exports.tampilkanAdmin = async (request, response) => {
    try {
        // ambil data telur dengan model
        let dataAdmin = await adminModel.findAll()

        let sendData = {
            page: `admin`,
            data: dataAdmin,
            dataUser: request.session.dataUser
        }

        // menampilkan di view
        return response.render(`../views/index`, sendData)
    } catch (error) {
       /** handling error */
       let sendData = {
        message: error
    }
    return response.render(`../views/error-page`, sendData)
}}

// fungsi utk menambah data
exports.menambahAdmin = async (request, response) => {
    try {
        let sendData = {
            page: `form-admin`, 
            nama_admin: ``,
            username: ``,
            password: ``,
            /** set target route for submit filled data */
            targetRoute: `/admin/add`,
            dataUser: request.session.dataUser,
            deskripsi: crypt.deskripsi
        }
    
        /** set view page for this function */
        return response.render(`../views/index`, sendData)
    
    
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// proses tambah data
exports.prosesTambah = async (request, response) => {
    try {
        /** reading telur's data from user that has sent */
        let newAdmin = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        /** call function for insert to table of telur */
        await adminModel.add(newAdmin)

        /** redirect to telur's page */
        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function unt mengedit data
exports.editDataAdmin = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id_admin: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await adminModel.findByCriteria(parameter)

    try {
        /** prepare data to send to view page  */
    let sendData = {
        page: `form-admin`, // page that will be show
        /** set each data based on data that will be change */
        nama_admin: selectedData[0].nama_admin,
        username: selectedData[0].username,
        password: selectedData[0].password,
        /** set target route for submit filled data */
        targetRoute: `/admin/edit/${selectedID}`,
        dataUser: request.session.dataUser,
        deskripsi: crypt.deskripsi
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
    
}

// fungsi utk menyimpan data yg sudah diubah
exports.prosesSimpanEdit = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id_admin: selectedID // 'id' is similar as column's name of table
        }

        /** reading telur's data from user that has sent */
        let newAdmin = {
            nama_admin: request.body.nama_admin,
            username: request.body.username,
            password: crypt.enkripsi(request.body.password)
        }

        /** call function for update to table of telur */
        await adminModel.update(newAdmin, parameter)

        /** redirect to telur's page */
        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function utk hapus data
exports.prosesHapus = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id_admin: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of telur */
        await adminModel.delete(parameter)

        return response.redirect(`/admin`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}