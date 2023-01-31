// panggil library crypto
const crypto = require(`crypto-js`)

// fungsi untk enkripsi
exports.enkripsi = (plainText) => {
    //buat scret key
    let secretKey = `TELUR`

    // proses enkripsi
    let enkripsi = crypto.AES.encrypt(plainText, secretKey).toString()
    return enkripsi
}

// membuat fungsi deskripsi
exports.deskripsi = (chiperText) => {
    // define secret key
    let secretKey = `TELUR`

    // proses deskripsi
    let byte = crypto.AES.decrypt(chiperText, secretKey)
    let deskripsi = byte.toString(crypto.enc.Utf8)

    return deskripsi
}