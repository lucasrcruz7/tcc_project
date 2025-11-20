import { useState, useEffect } from 'react';
import Header from './Header/Header';
import { ProfessorListagemService } from '../services/professor/professorListagemService';

function ListagemProfessores() {
    const [professores, setProfessores] = useState([]);
    const [busca, setBusca] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [professorEditando, setProfessorEditando] = useState(null);
    const service = new ProfessorListagemService();

    const carregarProfessores = async (nome = '') => {
        setLoading(true);
        try {
            const data = await service.listar(nome);
            setProfessores(data);
        } catch (error) {
            alert('Erro ao carregar professores');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarProfessores();
    }, []);

    const handleBuscar = () => {
        carregarProfessores(busca);
    };

    const handleEditar = (professor) => {
        setProfessorEditando(professor);
        setModalAberto(true);
    };

    const handleExcluir = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este professor?')) return;
        try {
            await service.delete(id);
            alert('Professor excluído com sucesso!');
            carregarProfessores(busca);
        } catch (error) {
            alert(error.message || 'Erro ao excluir professor');
        }
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        try {
            await service.update(professorEditando.id, professorEditando);
            alert('Professor atualizado com sucesso!');
            setModalAberto(false);
            setProfessorEditando(null);
            carregarProfessores(busca);
        } catch (error) {
            alert(error.message || 'Erro ao atualizar professor');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="w-full max-w-6xl mx-auto p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Listagem de Professores</h1>

                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            placeholder="Buscar por nome..."
                            className="flex-1 p-2 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleBuscar}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
                        >
                            Buscar
                        </button>
                    </div>

                    {loading && <p className="text-center py-8 text-gray-600">Carregando...</p>}

                    {!loading && professores.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-blue-100 text-left">
                                        <th className="px-4 py-2 border border-gray-300">Nome</th>
                                        <th className="px-4 py-2 border border-gray-300">Email</th>
                                        <th className="px-4 py-2 border border-gray-300">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professores.map((professor) => (
                                        <tr key={professor.id} className="hover:bg-gray-100">
                                            <td className="px-4 py-2 border border-gray-200">{professor.nome}</td>
                                            <td className="px-4 py-2 border border-gray-200">{professor.email}</td>
                                            <td className="px-4 py-2 border border-gray-200">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditar(professor)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleExcluir(professor.id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && professores.length === 0 && (
                        <p className="text-center py-8 text-gray-600">Nenhum professor encontrado</p>
                    )}
                </div>
            </main>

            {modalAberto && professorEditando && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4">
                        <h2 className="text-2xl font-bold mb-6">Editar Professor</h2>
                        <form onSubmit={handleSalvar} className="flex flex-col gap-4">
                            <label className="block">
                                <span className="font-semibold">Nome:</span>
                                <input
                                    type="text"
                                    value={professorEditando.nome}
                                    onChange={(e) => setProfessorEditando({...professorEditando, nome: e.target.value})}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="font-semibold">Email:</span>
                                <input
                                    type="email"
                                    value={professorEditando.email}
                                    onChange={(e) => setProfessorEditando({...professorEditando, email: e.target.value})}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </label>

                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => { setModalAberto(false); setProfessorEditando(null); }}
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

export default ListagemProfessores;
