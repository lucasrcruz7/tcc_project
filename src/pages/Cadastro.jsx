import Header from './Header/Header';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlunoCadastroSchema } from '../types/schemas/AlunoCadastroSchema';
import { AlunoCadastroService } from '../services/aluno/alunoCadastroService';
import { IMaskInput } from "react-imask";

function Cadastro() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(AlunoCadastroSchema)
    });

    const onSubmit = async (data) => {
        try {
            await new AlunoCadastroService().cadastrar(data);
            alert('Aluno cadastrado com sucesso!');
            reset();
        } catch (error) {
            alert(error.message || 'Erro ao cadastrar.');
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />
            <main className="w-full max-w-3xl mt-8 bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
                    <label className="block">
                        <span className="font-semibold">Nome:</span>
                        <input type="text" {...register('nome')} className="mt-1 w-full p-2 border border-gray-300 rounded" />
                        {errors.nome && <p className="text-red-600 text-xs">{errors.nome.message}</p>}
                    </label>

                    <label className="block">
                        <span className="font-semibold">Email do Responsável:</span>
                        <input {...register('responsavelEmail')} className="mt-1 w-full p-2 border border-gray-300 rounded" type="email" placeholder="xxxxxxx@gmail.com" />
                        {errors.responsavelEmail && <p className="text-red-600 text-xs">{errors.responsavelEmail.message}</p>}
                    </label>

                    <label className="block">
                        <span className="font-semibold">Email:</span>
                        <input {...register('email')} className="mt-1 w-full p-2 border border-gray-300 rounded" type="email" placeholder="xxxxxxx@gmail.com" />
                        {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
                    </label>

                    <label className="block">
                        <span className="font-semibold">Curso:</span>
                        <select {...register('curso')} className="mt-1 w-full p-2 border border-gray-300 rounded font-bold">
                            <option value="DS">DS</option>
                            <option value="ADM">ADM</option>
                        </select>
                        {errors.curso && <p className="text-red-600 text-xs">{errors.curso.message}</p>}
                    </label>

                    <label className="block">
                        <span className="font-semibold">Turma:</span>
                        <select {...register('turma')} className="mt-1 w-full p-2 border border-gray-300 rounded font-bold">
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                        </select>
                        {errors.turma && <p className="text-red-600 text-xs">{errors.turma.message}</p>}
                    </label>

                    <label className="block">
                        <span className="font-semibold">Telefone:</span>
                        <Controller
                            name="telefone"
                            control={control}
                            render={({ field }) => (
                                <IMaskInput
                                    mask="(00) 00000-0000"
                                    {...field}
                                    onAccept={(value) => field.onChange(value)} // importante!
                                    placeholder="(99) 99999-9999"
                                    className="mt-1 w-full p-2 border border-gray-300 rounded"
                                />
                            )}
                        />
                        {errors.telefone && (
                            <p className="text-red-600 text-xs">{errors.telefone.message}</p>
                        )}
                    </label>


                    <label className="block">
                        <span className="font-semibold">Série:</span>
                        <select {...register('serie')} className="mt-1 w-full p-2 border border-gray-300 rounded font-bold">
                            <option value="primeiro_ano">1º ANO</option>
                            <option value="segundo_ano">2º ANO</option>
                            <option value="terceiro_ano">3º ANO</option>
                        </select>
                        {errors.serie && <p className="text-red-600 text-xs">{errors.serie.message}</p>}
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

export default Cadastro;
