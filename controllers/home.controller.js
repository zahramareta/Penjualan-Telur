exports.tampilanHome = (request, response) => {
    try {
        let home = {
            page: `home`,
            dataUser: request.session.dataUser
        }
        return response.render(`../views/index`, home)
    } catch (error) {
        let sendData = {
            message: error
        }
        return response.render(`../views/error-page`, sendData)
    }
}