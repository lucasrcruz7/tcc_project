import React from "react"
import Header from "./Header/Header";
import USER from '../Img/user (1).png';

function Faltas() {
  // Dados simulados (em produção, viriam da API)
  const totalAulas = 50;
  const presencas = 45;
  const faltas = totalAulas - presencas;
  const frequencia = ((presencas / totalAulas) * 100).toFixed(2);
  const faltasPermitidas = Math.floor(totalAulas * 0.25);

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
          <p><strong>Total de aulas:</strong> {totalAulas}</p>
          <p><strong>Presenças:</strong> {presencas}</p>
          <p><strong>Faltas:</strong> {faltas}</p>
          <p><strong>Frequência:</strong> {frequencia}%</p>
          <p><strong>Faltas permitidas:</strong> {faltasPermitidas}</p>
        </div>

      </main>
    </div>
  )
}

export default Faltas;
