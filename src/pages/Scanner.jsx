import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { PresencaService } from "../services/presencaService";
import { StudentService } from "../services/studentService";

export function Scanner() {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [chamadaIniciada, setChamadaIniciada] = useState(false);
    const [curso, setCurso] = useState("");
    const [serie, setSerie] = useState("");
    const [turma, setTurma] = useState("");
    const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);
    const [scanning, setScanning] = useState(false);
    const presencaService = new PresencaService();
    const studentService = new StudentService();

    useEffect(() => {
        carregarTurmasDisponiveis();
    }, [curso, serie]);

    const carregarTurmasDisponiveis = async () => {
        if (!curso || !serie) {
            setTurmasDisponiveis([]);
            setTurma("");
            return;
        }

        try {
            const response = await studentService.getAll(curso, serie, "true");
            const alunos = response || [];
            const turmasDinamicas = [...new Set(alunos.map(aluno => aluno.turma))].filter(Boolean);
            const turmasFixas = ["Tarde", "Manhã", "Noite"];
            const todasTurmas = [...new Set([...turmasFixas, ...turmasDinamicas])];
            setTurmasDisponiveis(todasTurmas);
            
            if (todasTurmas.length > 0 && !todasTurmas.includes(turma)) {
                setTurma("");
            }
        } catch (error) {
            console.error('Erro ao carregar turmas:', error);
        }
    };

    const iniciarChamada = async (e) => {
        e.preventDefault();
        console.log('Iniciando chamada:', { turma, serie, curso });
        try {
            const response = await presencaService.iniciarChamada({ turma, serie, curso });
            console.log('Resposta:', response);
            setChamadaIniciada(true);
            setError(null);
        } catch (err) {
            console.error('Erro ao iniciar chamada:', err);
            setError(err.message || 'Erro ao iniciar chamada');
        }
    };

    const registrarPresenca = async (token) => {
        try {
            const response = await presencaService.registrarToken(token);
            setScanResult(response.student);
            setError(null);
            setTimeout(() => setScanResult(null), 3000);
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(null), 3000);
        }
    };

    useEffect(() => {
        if (chamadaIniciada && !scanning) {
            setScanning(true);
            const html5QrCode = new Html5Qrcode("reader");
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            
            html5QrCode.start(
                { facingMode: "environment" },
                config,
                (decodedText) => registrarPresenca(decodedText)
            );

            return () => {
                html5QrCode.stop().catch(() => {});
            };
        }
    }, [chamadaIniciada]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Registro de Presença</h1>
                
                {!chamadaIniciada ? (
                    <form onSubmit={iniciarChamada} className="space-y-4">
                        {error && (
                            <div className="bg-red-100 border border-red-400 p-4 rounded text-red-700">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium mb-2">Curso</label>
                            <select
                                value={curso}
                                onChange={(e) => setCurso(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="">Selecione o curso</option>
                                <option value="DS">DS</option>
                                <option value="ADM">ADM</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Série</label>
                            <select
                                value={serie}
                                onChange={(e) => setSerie(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                required
                            >
                                <option value="">Selecione a série</option>
                                <option value="primeiro_ano">1º ANO</option>
                                <option value="segundo_ano">2º ANO</option>
                                <option value="terceiro_ano">3º ANO</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Turma</label>
                            <select
                                value={turma}
                                onChange={(e) => setTurma(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                                disabled={!curso || !serie}
                                required
                            >
                                <option value="">Selecione a turma</option>
                                {turmasDisponiveis.map(turmaDisponivel => (
                                    <option key={turmaDisponivel} value={turmaDisponivel}>
                                        {turmaDisponivel}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                            Iniciar Chamada
                        </button>
                    </form>
                ) : (
                    <>
                        <div id="reader" className="mb-4"></div>
                        
                        {scanResult && (
                            <div className="bg-green-100 border border-green-400 p-4 rounded">
                                <h2 className="font-bold text-green-800">Presença Registrada!</h2>
                                <p>Nome: {scanResult.nome}</p>
                                <p>RM: {scanResult.rm}</p>
                                <p>Curso: {scanResult.curso}</p>
                                <p>Série: {scanResult.serie} - Turma: {scanResult.turma}</p>
                            </div>
                        )}
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 p-4 rounded text-red-700">
                                {error}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}