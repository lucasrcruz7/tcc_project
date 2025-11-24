import { Api } from "./api";

export class PresencaService {
    registrarManual(dadosPresenca: {
        alunoId: string;
        data: string;
        presente: boolean;
    }) {
        return new Api().post('presenca/manual', dadosPresenca);
    }

    registrarMultiplas(presencas: Array<{
        alunoId: string;
        data: string;
        presente: boolean;
    }>) {
        return new Api().post('presenca/manual/multiplas', { presencas });
    }

    getRelatorioPresenca() {
        return new Api().get('presenca/relatorio');
    }

    registrarToken(token: string) {
        return new Api().post('presenca/registrar-token', { token });
    }

    iniciarChamada(dados: { turma: string; serie: string; curso: string }) {
        return new Api().post('presenca/iniciar-chamada', dados);
    }
}