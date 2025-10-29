import React from 'react'
import USER from '../Img/user (1).png';
import Header from "./Header/Header";
import MONITORAMENTO from "../Img/monitoring.png"
import Lista from "../Img/list.png"
import CADASTRO from "../Img/Cadastro.png"
import { Link } from 'react-router-dom';

function MainAdmin(){
    return(
        <div className="w-full">
      <Header />
      <div >
        <main className="main p-12 lg:p-24">
          <div className="card">

            <img className="imgcode" src={USER} alt="USER" />

            <button class="botao-alterar">Alterar foto</button>

            <p><strong>Nome:</strong></p>
            <input type="text" value="Adiministrador" disabled />
          </div>

          <div className="flex justify-around w-full gap-5 flex-wrap p-10 2xl:justify-center 2xl:gap-50 ">
            <Link className="itens h-70 w-70" to="/Cadastro">
              <img className="imgcode" src={CADASTRO} alt="QR Code" />
              <p>Cadastro</p>
            </Link>

            <Link className="itens h-70 w-70" to="/Monitoramento">
              <img className="imgcode" src={Lista} alt="DOCUMENT" />
              <p>Monitoramento</p>
            </Link> 

            <Link className="itens h-70 w-70" to="/Scanner">
              <img className="imgcode" src={MONITORAMENTO} alt="DOCUMENT" />
              <p>Scanner</p>
            </Link>
          </div>

        </main>
      </div>
    </div>
    )
}

export default MainAdmin;