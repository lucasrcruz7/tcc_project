import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { PresencaService } from "../services/presencaService";
import { StudentService } from "../services/studentService";
import { useToastMessage } from "../hooks/toastMessage";
import { set } from "zod";

export function Scanner() {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const [chamadaIniciada, setChamadaIniciada] = useState(false);
    const [curso, setCurso] = useState("");
    const [serie, setSerie] = useState("");
    const [turma, setTurma] = useState("");
    const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);
    const [scanning, setScanning] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const presencaService = new PresencaService();
    const studentService = new StudentService();
    const tokensPresentes = new Map()
    const toast = useToastMessage();

    useEffect(() => {
        carregarTurmasDisponiveis();
    }, [curso, serie]);

    const resetChamada = () => {
        setChamadaIniciada(false)
        setError(null)
        setAlunos([])
        setScanning(false)
    }

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
            setAlunos(response.alunos || []);
            setChamadaIniciada(true);
            setError(null);
        } catch (err) {
            console.error('Erro ao iniciar chamada:', err);
            setError(err.message || 'Erro ao iniciar chamada');
        }
    };

    const registrarPresenca = async (token) => {
        if (tokensPresentes.has(token)) return

        try {
            tokensPresentes.set(token, true);
            const response = await presencaService.registrarToken(token);
            setScanResult(response.student);
            setAlunos(prev => prev.map(aluno => 
                aluno.rm === response.student.rm ? { ...aluno, presente: true } : aluno
            ));
            toast.success(`Presença registrada: ${response.student.nome}`);          
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
            ).catch((err) => {
                console.error('Erro ao iniciar a câmera:', err);
                setError('Erro ao iniciar a câmera');
            })

        return () => {
            if (html5QrCode.isScanning) {
                html5QrCode.stop().catch(() => {});
            }
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
                        <button 
                            onClick={() => resetChamada()} 
                            className="w-full bg-gray-600 text-white py-2 rounded-xl hover:bg-gray-700 transition mb-4"
                        >
                            Voltar
                        </button>
                        
                        <div id="reader" className="mb-4"></div>
                        
                      
                        
                        {error && (
                            <div className="bg-red-100 border border-red-400 p-4 rounded text-red-700 mb-4">
                                {error}
                            </div>
                        )}

                        <div className="mt-6">
                            <h2 className="text-xl font-bold mb-4">Lista de Alunos</h2>
                            <div className="space-y-2">
                                {alunos.map(aluno => (
                                    <div 
                                        key={aluno.rm} 
                                        className={`p-3 rounded-lg border ${
                                            aluno.presente 
                                                ? 'bg-green-50 border-green-300' 
                                                : 'bg-gray-50 border-gray-300'
                                        }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold">{aluno.nome}</p>
                                                <p className="text-sm text-gray-600">RM: {aluno.rm}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                aluno.presente 
                                                    ? 'bg-green-200 text-green-800' 
                                                    : 'bg-gray-200 text-gray-800'
                                            }`}>
                                                {aluno.presente ? 'Presente' : 'Ausente'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}