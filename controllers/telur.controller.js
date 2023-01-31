// panggil model telur

const telurModel = require(`../models/telur.model`)
const { request, response } = require("../routes/telur.route")

// fungsi utk menampilkan data telur
exports.tampilkanTelur = async (request, response) => {
    try {
        // ambil data telur dengan model
        let dataTelur = await telurModel.findAll()

        let sendData = {
            page: `telur`,
            data: dataTelur,
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
exports.menambahTelur = async (request, response) => {
    try {
        let sendData = {
            page: `form-telur`, 
            jenis_telur: ``,
            harga: ``,
            stok: ``,
            dataUser: request.session.dataUser,
            /** set target route for submit filled data */
            targetRoute: `/telur/add`
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
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok,
        }

        /** call function for insert to table of telur */
        await telurModel.add(newTelur)

        /** redirect to telur's page */
        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function unt mengedit data
exports.editDataTelur = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await telurModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-telur`, // page that will be show
        /** set each data based on data that will be change */
        jenis_telur: selectedData[0].jenis_telur,
        harga: selectedData[0].harga,
        stok: selectedData[0].stok,
        dataUser: request.session.dataUser,
        /** set target route for submit filled data */
        targetRoute: `/telur/edit/${selectedID}`
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
            id: selectedID // 'id' is similar as column's name of table
        }

        /** reading telur's data from user that has sent */
        let newTelur = {
            jenis_telur: request.body.jenis_telur,
            harga: request.body.harga,
            stok: request.body.stok
        }

        /** call function for update to table of telur */
        await telurModel.update(newTelur, parameter)

        /** redirect to telur's page */
        return response.redirect(`/telur`)

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
            id: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of telur */
        await telurModel.delete(parameter)

        return response.redirect(`/telur`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}



