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
}