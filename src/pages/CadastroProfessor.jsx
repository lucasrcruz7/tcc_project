import Header from './Header/Header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfessorCadastroSchema } from '../types/schemas/ProfessorCadastroSchema';
import { ProfessorCadastroService } from '../services/professor/professorCadastroService';
import { useToastMessage } from '../hooks/toastMessage';

function CadastroProfessor() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(ProfessorCadastroSchema)
    });
    const toast = useToastMessage()
    const onSubmit = async (data) => {
        try {
            await new ProfessorCadastroService().cadastrar(data);
            toast.success('Login realizado com sucesso!')
            reset();
        } catch (error) {
            toast.success('Login realizado com sucesso!')
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />
            <main className="w-full max-w-3xl mt-8 bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <label className="block">
                        <span className="font-semibold">Nome:</span>
                        <input type="text" {...register('nome')} className="mt-1 w-full p-2 border border-gray-300 rounded" />
                        {errors.nome && <p className="text-red-600 text-xs">{errors.nome.message}</p>}
                    </label>

                    <label className="block">
                        <span className="font-semibold">Email:</span>
                        <input {...register('email')} className="mt-1 w-full p-2 border border-gray-300 rounded" type="email" placeholder="xxxxxxx@gmail.com" />
                        {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                    </label>

                    <label className="block">
                        <span className="font-semibold">Senha:</span>
                        <input {...register('senha')} type="password" className="mt-1 w-full p-2 border border-gray-300 rounded" />
                        {errors.senha && <p className="text-red-600 text-xs">{errors.senha.message}</p>}
                    </label>

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

export default CadastroProfessor;
