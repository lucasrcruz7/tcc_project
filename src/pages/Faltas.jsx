import React, { useState, useEffect, useContext } from "react"
import Header from "./Header/Header";
import USER from '../Img/user (1).png';
import { PresencaService } from "../services/presencaService";
import { AuthUserContext } from "../layouts/AuthLayout";

function Faltas() {
  const user = useContext(AuthUserContext);
  const [relatorio, setRelatorio] = useState(null);
  const [loading, setLoading] = useState(true);
  const presencaService = new PresencaService();

  useEffect(() => {
    presencaService.getRelatorioPresenca()
      .then(data => setRelatorio(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const totalAulas = relatorio?.totalAulas || 0;
  const presencas = relatorio?.presencas || 0;
  const faltas = relatorio?.faltas || 0;
  const frequencia = relatorio?.frequencia || 0;
  const faltasPermitidas = relatorio?.faltasPermitidas || Math.floor(totalAulas * 0.25);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      <main className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
              <img className="w-16 h-16 sm:w-20 sm:h-20" src={USER} alt="USER" />
              <div>
                <p className="text-base sm:text-lg"><strong>Nome:</strong> {user?.nome || '-'}</p>
                <p className="text-base sm:text-lg"><strong>RM:</strong> {user?.rm || '00000'}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Minhas Presenças</h2>
              {loading ? (
                <p className="text-gray-600">Carregando...</p>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-sm sm:text-base"><strong>Total de aulas:</strong> {totalAulas}</p>
                  <p className="text-sm sm:text-base"><strong>Presenças:</strong> {presencas}</p>
                  <p className="text-sm sm:text-base"><strong>Faltas:</strong> {faltas}</p>
                  <p className="text-sm sm:text-base"><strong>Frequência:</strong> {frequencia}%</p>
                  <p className="text-sm sm:text-base"><strong>Faltas permitidas:</strong> {faltasPermitidas}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Faltas;
