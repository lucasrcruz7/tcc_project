import Header from './Header/Header';
import AlterarSenhaForm from '../components/AlterarSenhaForm';
import { AlterarSenhaAlunoService } from '../services/aluno/alterarSenhaAlunoService';

function AlterarSenhaAluno() {
    const handleSubmit = async (senhaAtual, novaSenha) => {
        await new AlterarSenhaAlunoService().alterarSenha(senhaAtual, novaSenha);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <Header />
            <main className="w-full max-w-md mt-8 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Alterar Senha</h2>
                <AlterarSenhaForm onSubmitHandler={handleSubmit} />
            </main>
        </div>
    );
}

export default AlterarSenhaAluno;
