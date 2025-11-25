import Login from "./pages/Login"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES
import MainALuno from "./pages/MainALuno";
import QRcodeAluno from './pages/QRcodeAluno';
import Faltas from './pages/Faltas'
import MainAdmin from "./pages/MainAdmin";
import MainProfessor from "./pages/MainProfessor";
import Cadastro from "./pages/Cadastro"
import CadastroProfessor from "./pages/CadastroProfessor"
import { AuthLayout } from "./layouts/AuthLayout";
import PresencaManual from "./pages/PresencaManual"
import ListagemAlunos from "./pages/ListagemAlunos";
import ListagemProfessores from "./pages/ListagemProfessores";
import { Scanner } from "./pages/Scanner";
import AlterarSenhaAluno from "./pages/AlterarSenhaAluno";
import AlterarSenhaProfessor from "./pages/AlterarSenhaProfessor";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout role='admin' />}>
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/CadastroProfessor" element={<CadastroProfessor />} />
            <Route path="/MainAdmin" element={<MainAdmin />} />
            <Route path="/ListagemAlunos" element={<ListagemAlunos />} />
            <Route path="/ListagemProfessores" element={<ListagemProfessores />} />
          </Route>

          <Route element={<AuthLayout role='aluno' />}>
            <Route path="MainAluno" element={<MainALuno />} />
            <Route path="/QRcode" element={<QRcodeAluno />} />
            <Route path="/Faltas" element={<Faltas />} />
            <Route path="/AlterarSenha" element={<AlterarSenhaAluno />} />
          </Route>

          <Route element={<AuthLayout role='professor' />}>
            <Route path="/MainProfessor" element={<MainProfessor />} />
            <Route path="/PresencaManual" element={<PresencaManual />} />
            <Route path="/Scanner" element={<Scanner />} />
            <Route path="/ProfessorAlterarSenha" element={<AlterarSenhaProfessor />} />
          </Route>

          <Route path="/" element={<Login />} />

        </Routes>
      </BrowserRouter>

       <ToastContainer />
    </div>
  )
}

export default App
