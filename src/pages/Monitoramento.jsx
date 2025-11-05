import React from 'react';
import Header from "./Header/Header";

function Monitoramento() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="w-full max-w-6xl mx-auto p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    {/* Filtros */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <select className="p-2 border border-gray-300 rounded w-full sm:w-auto">
                            <option>1º ANO</option>
                            <option>2º ANO</option>
                            <option>3º ANO</option>
                        </select>

                        <select className="p-2 border border-gray-300 rounded w-full sm:w-auto">
                            <option>Todos os cursos</option>
                            <option>DS</option>
                            <option>ADM</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            className="p-2 border border-gray-300 rounded w-full sm:w-64"
                        />

                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Pesquisar
                        </button>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-blue-100 text-left">
                                    <th className="px-4 py-2 border border-gray-300">Nome</th>
                                    <th className="px-4 py-2 border border-gray-300">Curso</th>
                                    <th className="px-4 py-2 border border-gray-300">Série</th>
                                    <th className="px-4 py-2 border border-gray-300">RM</th>
                                     <th className="px-4 py-2 border border-gray-300">Presença</th>
                                    <th className="px-4 py-2 border border-gray-300">Deletar</th>
                                    <th className="px-4 py-2 border border-gray-300">Alterar</th>
                                    <th className="px-4 py-2 border border-gray-300">Salvar</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-200">Lucas</td>
                                    <td className="px-4 py-2 border border-gray-200">DS</td>
                                    <td className="px-4 py-2 border border-gray-200">3º ANO</td>
                                    <td className="px-4 py-2 border border-gray-200">00000</td>
                                    <td className="px-4 py-2 border border-gray-200">100%</td>
                                    <td className="px-4 py-2 border border-gray-200">
                                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                            Deletar
                                        </button>
                                    </td>
                                     <td className="px-4 py-2 border border-gray-200">
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                            Alterar
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-200">
                                        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                                            Salvar
                                        </button>
                                    </td>
                                    
                                </tr>
                                {/* Outras linhas aqui */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Monitoramento;
