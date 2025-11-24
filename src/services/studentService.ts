import { Api } from "./api";

export class StudentService {
    getAll(curso?: string, serie?: string, ativo?: string) {
        const params: string[] = [];
        if (curso) params.push(`curso=${curso}`);
        if (serie) params.push(`serie=${serie}`);
        if (ativo) params.push(`ativo=${ativo}`);
        const query = params.length > 0 ? `?${params.join('&')}` : '';
        return new Api().get(`students${query}`);
    }

    update(id: string, data: object) {
        return new Api().put(`alunos/${id}`, data);
    }

    delete(id: string) {
        return new Api().delete(`alunos/${id}`);
    }

    reactivate(id: string) {
        return new Api().put(`alunos/${id}`, { ativo: true });
    }

    getAttendancePercentage(id: string) {
        return new Api().get(`alunos/${id}/presenca-porcentagem`);
    }
}
