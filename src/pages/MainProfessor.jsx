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
    <div className="w-full">
      <Header />
      <div >
        <main className="main p-12 lg:p-24">
          <div className="card">

            <img className="imgcode" src={USER} alt="USER" />

            <button class="botao-alterar">Alterar foto</button>

            <p><strong>Nome:</strong>{user?.nome || '-'}</p>
            <p><strong>Habilitação:</strong></p>
            <input className="bg-white rounded-4xl" type="text"value={("Professor")} disabled />
          </div>

          <div className="flex justify-around w-full gap-5 flex-wrap p-10 2xl:justify-center 2xl:gap-50 ">
            <Link className="itens h-70 w-70" to="/QRcode">
              <img className="imgcode" src={QRCODE} alt="QR Code" />
              <p>QRCODE</p>
            </Link>

            <Link className="itens h-70 w-70" to="/PresencaManual">
              <img className="imgcode" src={MONITORAMENTO} alt="DOCUMENT" />
              <p>Chamada manual</p>
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}

export default MainProfessor;
