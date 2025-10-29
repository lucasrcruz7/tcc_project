import React from 'react';
import Header from './Header/Header';




function Cadastro() {
    return (   
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />
            <main className="w-full max-w-3xl mt-8 bg-white p-8 rounded-lg shadow-md">
                <form className="flex flex-col gap-4 relative">
                    <label className="block">
                        <span className="font-semibold">Nome:</span>
                        <input type="text" required className="mt-1 w-full p-2 border border-gray-300 rounded" />
                    </label>

                    <label className="block">
                        <span className="font-semibold">EmailRes:</span>
                      
                        <input className="mt-1 w-full p-2 border border-gray-300 rounded" type="email" placeholder="xxxxxxx@gmail.com" required></input>
                    
                    </label>

                    <label className="block">
                        <span className="font-semibold">Email:</span>
                          <input className="mt-1 w-full p-2 border border-gray-300 rounded" type="email" placeholder="xxxxxxx@gmail.com" required></input>
                    </label>

                    <label className="block">
                        <span className="font-semibold">Curso:</span>
                        <select className="mt-1 w-full p-2 border border-gray-300 rounded font-bold">
                            <option>DS</option>
                            <option>ADM</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="font-semibold">Telefone:</span>
                       <input type="text" id="telefone" placeholder="(99) 99999-9999" required className="mt-1 w-full p-2 border border-gray-300 rounded" />
                     
                    </label>

                    <label className="block">
                        <span className="font-semibold">Série:</span>
                        <select className="mt-1 w-full p-2 border border-gray-300 rounded font-bold">
                           <option>1º ANO</option>
                            <option>2º ANO</option>
                            <option>3º ANO</option>
                        </select>
                    </label>

                    {/* Botão no canto inferior direito */}
                    <div className="flex justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default Cadastro;
