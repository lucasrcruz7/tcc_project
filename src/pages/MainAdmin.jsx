import { useContext } from 'react'
import USER from '../Img/user (1).png';
import Header from "./Header/Header";
import MONITORAMENTO from "../Img/monitoring.png"
import Lista from "../Img/list.png"
import CADASTRO from "../Img/Cadastro.png"
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../layouts/AuthLayout';

function MainAdmin(){
  const user = useContext(AuthUserContext);
    return(
        <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <main className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center gap-4">
            <img className="w-16 h-16 sm:w-20 sm:h-20" src={USER} alt="USER" />
            <p className="text-base sm:text-lg"><strong>Nome:</strong> {user?.nome}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Link className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center gap-4" to="/Cadastro">
              <img className="w-16 h-16 sm:w-20 sm:h-20" src={CADASTRO} alt="QR Code" />
              <p className="text-center text-sm sm:text-base font-medium">Cadastro de Aluno</p>
            </Link>

            <Link className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center gap-4" to="/ListagemAlunos">
              <img className="w-16 h-16 sm:w-20 sm:h-20" src={Lista} alt="DOCUMENT" />
              <p className="text-center text-sm sm:text-base font-medium">Listagem dos Alunos</p>
            </Link> 

            <Link className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center gap-4" to="/CadastroProfessor">
              <img className="w-16 h-16 sm:w-20 sm:h-20" src={MONITORAMENTO} alt="DOCUMENT" />
              <p className="text-center text-sm sm:text-base font-medium">Cadastro de Professor</p>
            </Link>

            <Link className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center gap-4" to="/ListagemProfessores">
              <img className="w-16 h-16 sm:w-20 sm:h-20" src={Lista} alt="DOCUMENT" />
              <p className="text-center text-sm sm:text-base font-medium">Listagem dos Professores</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
    )
}

export default MainAdmin;