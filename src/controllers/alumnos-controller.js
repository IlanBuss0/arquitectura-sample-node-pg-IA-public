import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import AlumnosService from './../services/alumnos-service.js';
import Alumno from './../entities/alumno.js';
import { handleControllerRequest } from './../helpers/controller-helper.js';

const router = Router();
const currentService = new AlumnosService();

// Endpoint de ejemplo: crear un alumno desde código usando la clase Alumno
// En vez de recibir los datos del body (req.body), los armamos nosotros desde código.
// Para eso usamos la clase Alumno de la carpeta entities.
// Probar con: GET http://localhost:3000/api/alumnos/test-insert
router.get('/test-insert', async (req, res) => {
    console.log('/test-insert');
    try {
        const nuevoAlumno = new Alumno('Willy', 'Wonka', 1, '2005-07-15', true);

        console.log('Objeto Alumno creado desde código:', nuevoAlumno);

        const newId = await currentService.createAsync(nuevoAlumno);
        if (newId > 0) {
            res.status(StatusCodes.CREATED).json({
                message : `Se creó el alumno desde código con id: ${newId}`,
                alumno  : nuevoAlumno,
                newId   : newId
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'No se pudo crear el alumno.' });
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).send(`Error: ${error.message}`);
    }
});

router.get('', async (req, res) => {
    console.log(`AlumnosController.get`);

    return handleControllerRequest({
        res,
        operation: () => currentService.getAllAsync(),
        failureStatus: StatusCodes.INTERNAL_SERVER_ERROR,
        failureBody: 'Error interno.'
    });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    return handleControllerRequest({
        res,
        operation: () => currentService.getByIdAsync(id),
        failureBody: `No se encontro la entidad (id:${id}).`
    });
});

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

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const entity = req.body;

    if (entity.id && parseInt(entity.id) !== id) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .send(`El id de la URL (${id}) no coincide con el id del body (${entity.id}).`);
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
