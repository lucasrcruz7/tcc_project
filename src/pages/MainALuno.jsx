import { useContext } from "react";
import Header from "./Header/Header";
import QRCODE from '../Img/qrcode.png';
import DOCUMENT from '../Img/document.png';
import USER from '../Img/user (1).png';
import { Link } from 'react-router-dom';
import { AuthUserContext } from "../layouts/AuthLayout";

function MainALuno() {
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
            <p><strong>RM:</strong> {user?.rm || '00000'}</p>
            <p><strong>Habilitação:</strong></p>
            <input type="text" value={user?.curso} disabled />
          </div>

          <div className="flex justify-around w-full gap-5 flex-wrap p-10 2xl:justify-center 2xl:gap-50 ">
            <Link className="itens h-70 w-70" to="/QRcode">
              <img className="imgcode" src={QRCODE} alt="QR Code" />
              <p>QRCODE</p>
            </Link>



            <Link className="itens h-70 w-70" to="/Faltas">
              <img className="imgcode" src={DOCUMENT} alt="DOCUMENT" />
              <p>FALTAS</p>
            </Link>
          </div>

        </main>
      </div>
    </div>
  );
}

export default MainALuno;
