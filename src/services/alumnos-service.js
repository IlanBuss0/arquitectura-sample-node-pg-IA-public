import BaseService from './base-service.js';
import AlumnosRepository from '../repositories/alumnos-repository.js';
import CursosService from './cursos-service.js';

function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) {
        return null;
    }

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad =
        hoy.getFullYear() - nacimiento.getFullYear();

    const diferenciaMeses =
        hoy.getMonth() - nacimiento.getMonth();

    if (
        diferenciaMeses < 0 ||
        (
            diferenciaMeses === 0 &&
            hoy.getDate() < nacimiento.getDate()
        )
    ) {
        edad--;
    }

    return edad;
}

function agregarEdad(alumno) {
    if (!alumno) {
        return alumno;
    }

    return {
        ...alumno,
        edad: calcularEdad(
            alumno.fecha_nacimiento
        )
    };
}

export default class AlumnosService extends BaseService {
    constructor() {
        super(new AlumnosRepository());

        console.log(
            'Estoy en: AlumnosService.constructor()'
        );

        this.cursosService = new CursosService();
    }

    getAllAsync = async () => {
        console.log(
            'AlumnosService.getAllAsync()'
        );

        const alumnos =
            await super.getAllAsync();

        if (alumnos == null) {
            return null;
        }

        return alumnos.map(
            alumno => agregarEdad(alumno)
        );
    }

    getByIdAsync = async (id) => {
        console.log(
            `AlumnosService.getByIdAsync(${id})`
        );

        const alumno =
            await super.getByIdAsync(id);

        return agregarEdad(alumno);
    }

    createAsync = async (entity) => {
        console.log(
            `AlumnosService.createAsync(${JSON.stringify(entity)})`
        );

        await this.validarCursoExiste(
            entity.id_curso
        );

        return await super.createAsync(entity);
    }

    updateAsync = async (entity) => {
        console.log(
            `AlumnosService.updateAsync(${JSON.stringify(entity)})`
        );

        if (entity.id_curso) {
            await this.validarCursoExiste(
                entity.id_curso
            );
        }

        return await super.updateAsync(entity);
    }

    validarCursoExiste = async (idCurso) => {
        if (!idCurso) {
            return;
        }

        const curso =
            await this.cursosService.getByIdAsync(
                idCurso
            );

        if (curso == null) {
            throw new Error(
                `El curso con id ${idCurso} no existe.`
            );
        }
    }
}