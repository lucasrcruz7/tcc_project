import Login from "./pages/Login"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES
import MainALuno from "./pages/MainALuno";
import QRcodeAluno from './pages/QRcodeAluno';
import Faltas from './pages/Faltas'
import MainAdmin from "./pages/MainAdmin";
import Monitoramento from "./pages/Monitoramento"
import Cadastro from "./pages/Cadastro"
import NovaSenha from "./pages/NovaSenha"
import { AuthLayout } from "./layouts/AuthLayout";
import  PresencaManual  from "./pages/PresencaManual"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout role='admin'/>}>
          <Route path="/Cadastro" element={<Cadastro/>} />
          <Route path="/MainAdmin" element={<MainAdmin />} />
          <Route path="/Monitoramento" element={<Monitoramento />} />
           <Route path="/PresencaManual" element={<PresencaManual />} />
        </Route>

        <Route element={<AuthLayout role='aluno'/>}>
        <Route path="MainAluno" element={<MainALuno />} />  
        <Route path="/QRcode" element={<QRcodeAluno />} />
        <Route path="/Faltas" element={<Faltas />} />
        </Route>


        <Route path="/" element={<Login />} />
        <Route path="/NovaSenha" element={<NovaSenha/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
