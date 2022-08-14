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

module.exports.notFound = () => {
    return {
        status : 404,
        message : 'Not Found',
        body : 'You\'ve stumbled upon a page that doesn\'t exist'
    }
}
