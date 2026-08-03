import { StatusCodes } from 'http-status-codes';
import LogHelper from './log-helper.js';

/**
 * Ejecuta una operación asincrónica de un controller y centraliza:
 * - el try/catch;
 * - la condición de éxito;
 * - la respuesta exitosa;
 * - la respuesta cuando la operación no fue exitosa;
 * - el registro del error.
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
            return res
                .status(successStatus)
                .json(successBody(result));
        }

        if (failureBody === null) {
            return res
                .status(failureStatus)
                .json(null);
        }

        return res
            .status(failureStatus)
            .send(failureBody);

    } catch (error) {
        LogHelper.logError(error);

        return res
            .status(errorStatus)
            .send(`Error: ${error.message}`);
    }
}