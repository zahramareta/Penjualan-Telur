// fungsi utk aut -> digunakan untk mengecek data user yg tersimpan di session,
// jk datanya tersimpak di session mka boleh utk mengakses fitus yg diinginkan,
// jk datanya tidak tersimpan di session makan akan dikembalikan ke login
exports.cekUser = (request, response, next) => {
    if(request.session.dataUser === undefined){
        return response.redirect(`/auth`)
    }else{
        // lanjut ke fitur yg diinginkan
        next()
    }
}