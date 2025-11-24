import React, { useState, useEffect } from "react";
import { StudentService } from "../services/studentService";
import { PresencaService } from "../services/presencaService";

export default function PresencaManual() {
  const [alunos, setAlunos] = useState([]);
  const [presencas, setPresencas] = useState({});
  const [curso, setCurso] = useState("");
  const [serie, setSerie] = useState("");
  const [turma, setTurma] = useState("");
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [loadingAlunos, setLoadingAlunos] = useState(false);
  const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);

  const studentService = new StudentService();
  const presencaService = new PresencaService();

  useEffect(() => {
    carregarTurmasDisponiveis();
  }, [curso, serie]);

  useEffect(() => {
    carregarAlunos();
  }, [curso, serie, turma]);

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
      const turmasFixas = ["Manhã", "Noite"];
      const todasTurmas = [...new Set([...turmasFixas, ...turmasDinamicas])];
      setTurmasDisponiveis(todasTurmas);
      
      if (todasTurmas.length > 0 && !todasTurmas.includes(turma)) {
        setTurma("");
      }
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    }
  };

  const carregarAlunos = async () => {
    if (!curso || !serie || !turma) {
      setAlunos([]);
      return;
    }
    
    setLoadingAlunos(true);
    try {
      const response = await studentService.getAll(curso, serie, "true");
      let alunosFiltrados = response || [];
      
      alunosFiltrados = alunosFiltrados.filter(aluno => aluno.turma === turma);
      
      setAlunos(alunosFiltrados);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    } finally {
      setLoadingAlunos(false);
    }
  };

  const handlePresencaChange = (alunoId, presente) => {
    setPresencas(prev => ({
      ...prev,
      [alunoId]: presente
    }));
  };

  const registrarPresencas = async () => {
    if (Object.keys(presencas).length === 0) {
      alert('Marque a presença de pelo menos um aluno');
      return;
    }

    const token = localStorage.getItem('token');
    console.log('Token:', token);
    console.log('Dados:', { alunoId: Object.keys(presencas)[0], data, presente: Object.values(presencas)[0] });

    setLoading(true);
    try {
      const promises = Object.entries(presencas).map(([alunoId, presente]) =>
        presencaService.registrarManual({ alunoId, data, presente, turma, serie, curso })
      );

      await Promise.all(promises);
      alert('Presenças registradas com sucesso!');
      setPresencas({});
    } catch (error) {
      console.error('Erro ao registrar presenças:', error);
      alert(`Erro ao registrar presenças: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Registro de Presença Manual
        </h1>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Curso</label>
            <select
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              className="w-full p-2 border rounded-lg"
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
            >
              <option value="">Selecione a turma</option>
              {turmasDisponiveis.map(turmaDisponivel => (
                <option key={turmaDisponivel} value={turmaDisponivel}>
                  {turmaDisponivel}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Aluno</th>
                <th className="text-center py-2">Presente</th>
                <th className="text-center py-2">Falta</th>
              </tr>
            </thead>
            <tbody>
              {loadingAlunos ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">Carregando alunos...</td>
                </tr>
              ) : alunos.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    {!curso || !serie || !turma 
                      ? 'Selecione curso, série e turma para visualizar os alunos'
                      : 'Nenhum aluno encontrado'}
                  </td>
                </tr>
              ) : (
                alunos.map((aluno) => (
                  <tr key={aluno.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2">{aluno.nome}</td>
                    <td className="text-center">
                      <input
                        type="radio"
                        name={`presenca-${aluno.id}`}
                        checked={presencas[aluno.id] === true}
                        onChange={() => handlePresencaChange(aluno.id, true)}
                        className="h-5 w-5 text-green-600"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        type="radio"
                        name={`presenca-${aluno.id}`}
                        checked={presencas[aluno.id] === false}
                        onChange={() => handlePresencaChange(aluno.id, false)}
                        className="h-5 w-5 text-red-600"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={registrarPresencas}
          disabled={loading}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrar Presenças'}
        </button>
      </div>
    </div>
  );
}
