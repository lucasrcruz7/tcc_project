import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import { StudentService } from '../services/studentService';
import { useToastMessage } from '../hooks/toastMessage';

function ListagemAlunos() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [curso, setCurso] = useState('');
    const [serie, setSerie] = useState('');
    const [turma, setTurma] = useState('');
    const [statusFiltro, setStatusFiltro] = useState('');
    const [modalAberto, setModalAberto] = useState(false);
    const [alunoEditando, setAlunoEditando] = useState(null);
    const studentService = new StudentService();

    const fetchAlunos = async (cursoFiltro = '', serieFiltro = '', ativoFiltro = '') => {
        setLoading(true);
        try {
            let data = await studentService.getAll(cursoFiltro, serieFiltro, ativoFiltro);
            
            if (turma) {
                data = data.filter(aluno => aluno.turma === turma);
            }
            
            setAlunos(data);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            setAlunos([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlunos();
    }, []);

    useEffect(() => {
        fetchAlunos(curso, serie, statusFiltro);
    }, [curso, serie, turma, statusFiltro]);

    const handleLimpar = () => {
        setCurso('');
        setSerie('');
        setTurma('');
        setStatusFiltro('');
        fetchAlunos();
    };

    const toast = useToastMessage()

    const handleDesativar = async (id) => {
        if (!confirm('Tem certeza que deseja desativar este aluno?')) return;
        try {
            await studentService.delete(id);
            toast.success('Aluno desativado com sucesso!');
            fetchAlunos(curso, serie, statusFiltro);
        } catch (error) {
            toast.error('Erro ao desativar aluno!')
        }
    };

    const handleReativar = async (id) => {
        if (!confirm('Deseja reativar este aluno?')) return;
        try {
            await studentService.reactivate(id);
            toast.success('Aluno reativado com sucesso!')
            fetchAlunos(curso, serie, statusFiltro);
        } catch (error) {
            toast.error('Erro ao reativar aluno')
        }
    };

    const handleAlterar = (aluno) => {
        setAlunoEditando(aluno);
        setModalAberto(true);
    };

    const handleSalvarEdicao = async (e) => {
        e.preventDefault();
        try {
            await studentService.update(alunoEditando.id, alunoEditando);
            toast.success('Aluno atualizado com sucesso!')
            setModalAberto(false);
            setAlunoEditando(null);
            fetchAlunos(curso, serie, statusFiltro);
        } catch (error) {
            toast.error('Erro ao atualizar aluno')
        }
    };

    const handleFecharModal = () => {
        setModalAberto(false);
        setAlunoEditando(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="w-full max-w-6xl mx-auto p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Listagem de Alunos</h1>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <select
                            value={curso}
                            onChange={(e) => setCurso(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full sm:w-auto font-bold"
                        >
                            <option value="">Todos os cursos</option>
                            <option value="DS">DS</option>
                            <option value="ADM">ADM</option>
                        </select>

                        <select
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full sm:w-auto font-bold"
                        >
                            <option value="">Todas as séries</option>
                            <option value="primeiro_ano">1º ANO</option>
                            <option value="segundo_ano">2º ANO</option>
                            <option value="terceiro_ano">3º ANO</option>
                        </select>

                        <select
                            value={turma}
                            onChange={(e) => setTurma(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full sm:w-auto font-bold"
                        >
                            <option value="">Todas as turmas</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>

                        <select
                            value={statusFiltro}
                            onChange={(e) => setStatusFiltro(e.target.value)}
                            className="p-2 border border-gray-300 rounded w-full sm:w-auto font-bold"
                        >
                            <option value="">Todos</option>
                            <option value="true">Ativos</option>
                            <option value="false">Desativados</option>
                        </select>

                        <button
                            onClick={handleLimpar}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Limpar
                        </button>
                    </div>

                    {loading && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">Carregando...</p>
                        </div>
                    )}

                    {!loading && alunos.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-blue-100 text-left">
                                        <th className="px-4 py-2 border border-gray-300">Nome</th>
                                        <th className="px-4 py-2 border border-gray-300">Curso</th>
                                        <th className="px-4 py-2 border border-gray-300">Série</th>
                                        <th className="px-4 py-2 border border-gray-300">Turma</th>
                                        <th className="px-4 py-2 border border-gray-300">RM</th>
                                        <th className="px-4 py-2 border border-gray-300">Presença</th>
                                        <th className="px-4 py-2 border border-gray-300">Status</th>
                                        <th className="px-4 py-2 border border-gray-300">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alunos.map((aluno, index) => (
                                        <tr key={index} className={`hover:bg-gray-100 ${!aluno.ativo ? 'opacity-50' : ''}`}>
                                            <td className="px-4 py-2 border border-gray-200">{aluno.nome}</td>
                                            <td className="px-4 py-2 border border-gray-200">{aluno.curso}</td>
                                            <td className="px-4 py-2 border border-gray-200">{aluno.serie}</td>
                                            <td className="px-4 py-2 border border-gray-200">{aluno.turma}</td>
                                            <td className="px-4 py-2 border border-gray-200">{aluno.rm}</td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <span className="font-semibold">{aluno.porcentagemPresenca ?? '-'}%</span>
                                            </td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${aluno.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {aluno.ativo ? 'Ativo' : 'Desativado'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleAlterar(aluno)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        Alterar
                                                    </button>
                                                    {aluno.ativo ? (
                                                        <button
                                                            onClick={() => handleDesativar(aluno.id)}
                                                            className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                                                        >
                                                            Desativar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleReativar(aluno.id)}
                                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                                        >
                                                            Reativar
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && alunos.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-600">Nenhum aluno encontrado.</p>
                        </div>
                    )}
                </div>
            </main>

            {modalAberto && alunoEditando && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4">
                        <h2 className="text-2xl font-bold mb-6">Editar Aluno</h2>
                        <form onSubmit={handleSalvarEdicao} className="flex flex-col gap-4">
                            <label className="block">
                                <span className="font-semibold">Nome:</span>
                                <input
                                    type="text"
                                    value={alunoEditando.nome}
                                    onChange={(e) => setAlunoEditando({...alunoEditando, nome: e.target.value})}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="font-semibold">Curso:</span>
                                <select
                                    value={alunoEditando.curso}
                                    onChange={(e) => setAlunoEditando({...alunoEditando, curso: e.target.value})}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded font-bold"
                                >
                                    <option value="DS">DS</option>
                                    <option value="ADM">ADM</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="font-semibold">Série:</span>
                                <select
                                    value={alunoEditando.serie}
                                    onChange={(e) => setAlunoEditando({...alunoEditando, serie: e.target.value})}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded font-bold"
                                >
                                    <option value="primeiro_ano">1º ANO</option>
                                    <option value="segundo_ano">2º ANO</option>
                                    <option value="terceiro_ano">3º ANO</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="font-semibold">Turma:</span>
                                <select
                                    value={alunoEditando.turma}
                                    onChange={(e) => setAlunoEditando({...alunoEditando, turma: e.target.value})}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded font-bold"
                                >
                                    <option value="Manhã">Manhã</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noite">Noite</option>
                                </select>
                            </label>

                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={handleFecharModal}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListagemAlunos;
