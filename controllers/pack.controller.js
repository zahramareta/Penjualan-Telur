// panggil model pack

const packModel = require(`../models/pack.model`)
const { request, response } = require("../routes/pack.route")

// fungsi utk menampilkan data telur
exports.tampilkanPack = async (request, response) => {
    try {
        // ambil data telur dengan model
        let dataPack = await packModel.findAll()

        let sendData = {
            page: `pack`,
            data: dataPack,
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
exports.menambahPack = async (request, response) => {
    try {
        let sendData = {
            page: `form-pack`, 
            nama_pack:``,
            harga: ``,
            dataUser: request.session.dataUser,
            /** set target route for submit filled data */
            targetRoute: `/pack/add`
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
        let newPack = {
            nama_pack: request.body.nama_pack,
            harga: request.body.harga
        }

        /** call function for insert to table of telur */
        await packModel.add(newPack)

        /** redirect to telur's page */
        return response.redirect(`/pack`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function unt mengedit data
exports.editDataPack = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id_pack: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await packModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-pack`, // page that will be show
        /** set each data based on data that will be change */
        nama_pack: selectedData[0].nama_pack,
        harga: selectedData[0].harga,
        dataUser: request.session.dataUser,
        /** set target route for submit filled data */
        targetRoute: `/pack/edit/${selectedID}`
    }

    /** set view page for this function */
    return response.render(`../views/index`, sendData)
}

// fungsi utk menyimpan data yg sudah diubah
exports.prosesSimpanEdit = async (request, response) => {
    try {
        /** read selected ID from URL parameter */
        let selectedID = request.params.id

        /** store selected ID to object "parameter" */
        let parameter = {
            id_pack: selectedID // 'id' is similar as column's name of table
        }

        /** reading telur's data from user that has sent */
        let newPack = {
            nama_pack: request.body.nama_pack,
            harga: request.body.harga
        }

        /** call function for update to table of telur */
        await packModel.update(newPack, parameter)

        /** redirect to telur's page */
        return response.redirect(`/pack`)

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
            id_pack: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of telur */
        await packModel.delete(parameter)

        return response.redirect(`/pack`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}