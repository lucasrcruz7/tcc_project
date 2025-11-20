import { Api } from '../api';

export class ProfessorListagemService {
    listar(nome = '') {
        const query = nome ? `?nome=${encodeURIComponent(nome)}` : '';
        return new Api().get(`professores${query}`);
    }

    update(id, data) {
        return new Api().put(`professores/${id}`, data);
    }

    delete(id) {
        return new Api().delete(`professores/${id}`);
    }
}
