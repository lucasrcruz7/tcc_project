import { useContext } from "react";
import Header from "./Header/Header";
import QRCODE from '../Img/qrcode.png';
import USER from '../Img/user (1).png';
import MONITORAMENTO from '../Img/monitoring.png';
import { Link } from 'react-router-dom';
import { AuthUserContext } from "../layouts/AuthLayout";

function MainProfessor() {
  const user = useContext(AuthUserContext);
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <main className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex items-center gap-4">
            <img className="w-16 h-16 sm:w-20 sm:h-20" src={USER} alt="USER" />
            <p className="text-base sm:text-lg"><strong>Nome:</strong> {user?.nome || '-'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Link className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center gap-4" to="/Scanner">
              <img className="w-16 h-16 sm:w-20 sm:h-20" src={QRCODE} alt="QR Code" />
              <p className="text-center text-sm sm:text-base font-medium">QRCODE</p>
            </Link>

            <Link className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center gap-4" to="/PresencaManual">
              <img className="w-16 h-16 sm:w-20 sm:h-20" src={MONITORAMENTO} alt="DOCUMENT" />
              <p className="text-center text-sm sm:text-base font-medium">Chamada manual</p>
            </Link>

            <Link className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center gap-4" to="/ProfessorAlterarSenha">
              <span className="text-4xl sm:text-5xl">🔒</span>
              <p className="text-center text-sm sm:text-base font-medium">ALTERAR SENHA</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainProfessor;
