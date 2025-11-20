import React, { useState, useEffect } from "react"
import Header from "./Header/Header";
import USER from '../Img/user (1).png';
import { PresencaService } from "../services/presencaService";

function Faltas() {
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
    <div>
      <Header />
      <main className="main p-12 lg:p-24 flex justify-between gap-2">

        {/* Card existente */}
        <div className="card">
          <img className="imgcode" src={USER} alt="USER" />
          <button className="botao-alterar">Alterar foto</button>

          <p><strong>Nome:</strong> João Silva</p>
          <p><strong>RM:</strong> 00000</p>
          <p><strong>Habilitação:</strong></p>
          <input type="text" value="Técnico em TI" disabled />
        </div>

        {/* Nova seção de presença */}
        <div className="card p-6 flex flex-col gap-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Minhas Presenças</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <>
              <p><strong>Total de aulas:</strong> {totalAulas}</p>
              <p><strong>Presenças:</strong> {presencas}</p>
              <p><strong>Faltas:</strong> {faltas}</p>
              <p><strong>Frequência:</strong> {frequencia}%</p>
              <p><strong>Faltas permitidas:</strong> {faltasPermitidas}</p>
            </>
          )}
        </div>

      </main>
    </div>
  )
}

export default Faltas;
