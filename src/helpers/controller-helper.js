import { StatusCodes } from 'http-status-codes';

/**
 * Ejecuta una operación asincrónica de un controller y centraliza
 * el manejo de la respuesta exitosa, la respuesta cuando no hay resultado
 * y los errores inesperados.
 *
 * @param {object} options
 * @param {object} options.res Respuesta de Express.
 * @param {Function} options.operation Función asincrónica que ejecuta el service.
 * @param {Function} [options.isSuccess] Determina si el resultado es exitoso.
 * @param {number} [options.successStatus] Status HTTP para una respuesta exitosa.
 * @param {Function} [options.successBody] Transforma el resultado antes de responder.
 * @param {number} [options.failureStatus] Status HTTP cuando el resultado no es válido.
 * @param {*} [options.failureBody] Cuerpo de la respuesta cuando el resultado no es válido.
 * @param {number} [options.errorStatus] Status HTTP si ocurre una excepción.
 */
export async function handleControllerRequest({
    res,
    operation,
    isSuccess = (result) => result != null,
    successStatus = StatusCodes.OK,
    successBody = (result) => result,
    failureStatus = StatusCodes.NOT_FOUND,
    failureBody = 'No se encontro la entidad.',
    errorStatus = StatusCodes.INTERNAL_SERVER_ERROR
}) {
    try {
        const result = await operation();

        if (isSuccess(result)) {
            return res.status(successStatus).json(successBody(result));
        }

        if (failureBody === null) {
            return res.status(failureStatus).json(null);
        }

        return res.status(failureStatus).send(failureBody);
    } catch (error) {
        console.log(error);
        return res.status(errorStatus).send(`Error: ${error.message}`);
    }
}
