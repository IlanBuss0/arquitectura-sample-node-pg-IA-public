import BaseService from './base-service.js';
import MateriasRepository from '../repositories/materias-repository.js';

export default class MateriasService extends BaseService {
    constructor() {
        super(new MateriasRepository());

        console.log(
            'Estoy en: MateriasService.constructor()'
        );
    }
}