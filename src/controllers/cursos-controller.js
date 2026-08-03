import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import CursosService from './../services/cursos-service.js';
import { handleControllerRequest } from './../helpers/controller-helper.js';

const router = Router();
const currentService = new CursosService();

/**
 * GET /api/cursos
 * Obtiene todos los cursos.
 */
router.get('', async (req, res) => {
    console.log(`CursosController.get`);

    return handleControllerRequest({
        res,
        operation: () => currentService.getAllAsync(),
        failureStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        failureBody: 'Error interno.'
    });
});

/**
 * GET /api/cursos/:id
 * Obtiene un curso por ID.
 */
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    return handleControllerRequest({
        res,
        operation: () => currentService.getByIdAsync(id),
        failureBody: `No se encontro la entidad (id:${id}).`
    });
});

/**
 * POST /api/cursos
 * Crea un curso.
 */
router.post('', async (req, res) => {
    const entity = req.body;

    return handleControllerRequest({
        res,
        operation: () => currentService.createAsync(entity),

        isSuccess: (newId) => newId > 0,

        successStatus: StatusCodes.CREATED,

        failureStatus: StatusCodes.BAD_REQUEST,
        failureBody: null,

        errorStatus: StatusCodes.BAD_REQUEST
    });
});

/**
 * PUT /api/cursos/:id
 * Modifica un curso.
 */
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const entity = req.body;

    if (entity.id && parseInt(entity.id) !== id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send(
                `El id de la URL (${id}) no coincide con el id del body (${entity.id}).`
            );
    }

    entity.id = id;

    return handleControllerRequest({
        res,
        operation: () => currentService.updateAsync(entity),

        isSuccess: (rowsAffected) => rowsAffected != 0,

        failureBody: `No se encontro la entidad (id:${id}).`,

        errorStatus: StatusCodes.BAD_REQUEST
    });
});

/**
 * DELETE /api/cursos/:id
 * Elimina un curso.
 */
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    return handleControllerRequest({
        res,
        operation: () => currentService.deleteByIdAsync(id),

        isSuccess: (rowCount) => rowCount != 0,

        successBody: () => null,

        failureBody: `No se encontro la entidad (id:${id}).`
    });
});

export default router;