module.exports = {
    status : "",
    message : "",
    body : ""
}

module.exports.errorMessage = (message) => {
    return {
        status : 400,
        message : 'Error',
        body : message
    }
}

module.exports.success = (message) => {
    return {
        status : 200,
        message : 'Success',
        body : message
    }
}

module.exports.serverError = () => {
    return {
        status : 500,
        message : 'Error',
        body : 'Something went wrong'
    }
}

module.exports.unauthorized = () => {
    return {
        status : 401,
        message : 'Error',
        body : 'Unauthorized'
    }
}
