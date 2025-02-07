export function successRes(statusCode: Number, message: String, data: any) {
    return {
        status: "Success",
        statusCode,
        message,
        data
    }
}

export function errorRes(statusCode: Number, errorCode: String, message: String,) {
    return {
        status: "Error",
        statusCode,
        errorCode,
        message
    }
}