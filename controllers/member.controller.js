// panggil model member

const memberModel = require(`../models/member.model`)
const { request, response } = require("../routes/member.route")

// fungsi utk menampilkan data telur
exports.tampilkanMember = async (request, response) => {
    try {
        // ambil data telur dengan model
        let dataMember = await memberModel.findAll()

        let sendData = {
            page: `member`,
            data: dataMember,
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
exports.menambahMember = async (request, response) => {
    try {
        let sendData = {
            page: `form-member`, 
            nama_member: ``,
            alamat: ``,
            telepon: ``,
            dataUser: request.session.dataUser,
            /** set target route for submit filled data */
            targetRoute: `/member/add`
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
        let newMember = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        /** call function for insert to table of telur */
        await memberModel.add(newMember)

        /** redirect to telur's page */
        return response.redirect(`/member`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}

// function unt mengedit data
exports.editDataMember = async (request, response) => {
    /** read selected ID from URL parameter */
    let selectedID = request.params.id

    /** store selected ID to object "parameter" */
    let parameter = {
        id_member: selectedID // 'id' is similar as column's name of table
    }

    /** call function for get data from database based on seleced id */
    let selectedData = await memberModel.findByCriteria(parameter)

    /** prepare data to send to view page  */
    let sendData = {
        page: `form-member`, // page that will be show
        /** set each data based on data that will be change */
        nama_member: selectedData[0].nama_member,
        alamat: selectedData[0].alamat,
        telepon: selectedData[0].telepon,
        dataUser: request.session.dataUser,
        /** set target route for submit filled data */
        targetRoute: `/member/edit/${selectedID}`
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
            id_member: selectedID // 'id' is similar as column's name of table
        }

        /** reading telur's data from user that has sent */
        let newMember = {
            nama_member: request.body.nama_member,
            alamat: request.body.alamat,
            telepon: request.body.telepon
        }

        /** call function for update to table of telur */
        await memberModel.update(newMember, parameter)

        /** redirect to telur's page */
        return response.redirect(`/member`)

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
            id_member: selectedID // 'id' is similar as column's name of table
        }

        /** call function for delete data table of telur */
        await memberModel.delete(parameter)

        return response.redirect(`/member`)

    } catch (error) {
        /** handling error */
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}