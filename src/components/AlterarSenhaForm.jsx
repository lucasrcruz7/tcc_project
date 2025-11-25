import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlterarSenhaSchema } from '../types/schemas/AlterarSenhaSchema';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastMessage } from '../hooks/toastMessage';

function AlterarSenhaForm({ onSubmitHandler }) {
    const [loading, setLoading] = useState(false);
    const [showSenhaAtual, setShowSenhaAtual] = useState(false);
    const [showNovaSenha, setShowNovaSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm({
        resolver: zodResolver(AlterarSenhaSchema)
    });

    const novaSenha = watch('novaSenha', '');

    const getPasswordStrength = (password) => {
        if (!password) return { text: '', color: '' };
        if (password.length < 6) return { text: 'Fraca', color: 'text-red-600' };
        if (password.length < 8) return { text: 'Média', color: 'text-yellow-600' };
        return { text: 'Forte', color: 'text-green-600' };
    };

    const strength = getPasswordStrength(novaSenha);
    const toast = useToastMessage()
    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await onSubmitHandler(data.senhaAtual, data.novaSenha);
            toast.success('Senha alterada com sucesso!');
            reset();
            navigate(-1);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <label className="block">
                <span className="font-semibold">Senha Atual:</span>
                <div className="relative">
                    <input 
                        type={showSenhaAtual ? "text" : "password"}
                        {...register('senhaAtual')} 
                        className="mt-1 w-full p-2 border border-gray-300 rounded pr-10" 
                    />
                    <button
                        type="button"
                        onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showSenhaAtual ? '🙈' : '👁️'}
                    </button>
                </div>
                {errors.senhaAtual && <p className="text-red-600 text-xs mt-1">{errors.senhaAtual.message}</p>}
            </label>

            <label className="block">
                <span className="font-semibold">Nova Senha:</span>
                <div className="relative">
                    <input 
                        type={showNovaSenha ? "text" : "password"}
                        {...register('novaSenha')} 
                        className="mt-1 w-full p-2 border border-gray-300 rounded pr-10" 
                    />
                    <button
                        type="button"
                        onClick={() => setShowNovaSenha(!showNovaSenha)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showNovaSenha ? '🙈' : '👁️'}
                    </button>
                </div>
                {errors.novaSenha && <p className="text-red-600 text-xs mt-1">{errors.novaSenha.message}</p>}
                {novaSenha && !errors.novaSenha && (
                    <p className={`text-xs mt-1 font-semibold ${strength.color}`}>
                        Força da senha: {strength.text}
                    </p>
                )}
            </label>

            <label className="block">
                <span className="font-semibold">Confirmar Nova Senha:</span>
                <div className="relative">
                    <input 
                        type={showConfirmarSenha ? "text" : "password"}
                        {...register('confirmarSenha')} 
                        className="mt-1 w-full p-2 border border-gray-300 rounded pr-10" 
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmarSenha ? '🙈' : '👁️'}
                    </button>
                </div>
                {errors.confirmarSenha && <p className="text-red-600 text-xs mt-1">{errors.confirmarSenha.message}</p>}
            </label>

            <div className="flex gap-3 mt-4">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded shadow"
                    disabled={loading}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? 'Alterando...' : 'Alterar Senha'}
                </button>
            </div>
        </form>
    );
}

export default AlterarSenhaForm;
