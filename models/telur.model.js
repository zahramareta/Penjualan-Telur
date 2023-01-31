// program CRUD
// panggil connection dari config
const connection = require(`../config`)

// panggil nama tabel
const tableName = `telur`

// panggil semua data telur
exports.findAll = () => {
    return new Promise((resolve, rejected) => {
        // membuat query
        let query = `select * from ${tableName}`
        
        // show query as log in console
        console.log(`Run: ${query}`)

        // run query
        connection.query(query, (error, result) => {
            if (error) {
                rejected (error)
            }
            resolve(result)
        })
    })
}

// memanggil dengan syarat
exports.findByCriteria = (parameter) => {
    return new Promise((resolve, rejected) => {
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
        
        /** define query to get all data */
        let query = `select * from ${tableName} where ${params}`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error)
            }
            resolve(result)
        })
    })
}

// menambahkan data telur
exports.add = (dataObject) => {
    return new Promise((resolve, rejected) => {
        let columns = Object.keys(dataObject).join()
 
        let values = Object.values(dataObject)
            .map(value => `"${value}"`).join()
        
        /** create query for insert */
        let query = `insert into ${tableName} (${columns}) values (${values})`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error.message)
            }
            resolve(result)
        })
    })
}

exports.update = (dataObject, parameter) => {
    return new Promise((resolve, rejected) => {
        let updateData = Object
            .keys(dataObject)
            .map(key => `${key}="${dataObject[key]}"`)
            .join()
    
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")
        
        /** create query for update */
        let query = `update ${tableName} set ${updateData} where ${params}`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                rejected(error.message)
            }
            resolve(result)
        })
    })
}

// hapus data telur
exports.delete = (parameter) => {
    return new Promise((resolve, rejected) => {
        let params = Object
            .keys(parameter)
            .map(key => `${key}="${parameter[key]}"`)
            .join(" and ")

        /** create query for delete */
        let query = `delete from ${tableName} where ${params}`

        /** show query as log in console */
        console.log(`Run: ${query}`)

        /** run query */
        connection.query(query, (error, result) => {
            if (error) {
                /** reject with error message */
                rejected(error.message)
            }

            /** return resolve with data */
            resolve(result)
        })
    })
}

