import BaseService from './base-service.js';
import CursosRepository from '../repositories/cursos-repository.js';

export default class CursosService extends BaseService {
    constructor() {
        super(new CursosRepository());

        console.log(
            'Estoy en: CursosService.constructor()'
        );
    }
}