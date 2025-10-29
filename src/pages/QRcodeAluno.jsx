import React from 'react'
import Header from "./Header/Header";
import USER from '../Img/user (1).png';

function QRcode() {
    return (
        <div>
            <Header />
             <main className="main p-12 lg:p-24 flex justify-between gap-2">
                    <div className="card">
            
                      <img className="imgcode" src={USER} alt="USER" />
            
                      <button class="botao-alterar">Alterar foto</button>
            
                      <p><strong>Nome:</strong></p>
                      <p><strong>RM:</strong> 00000</p>
                      <p><strong>Habilitação:</strong></p>
                      <input type="text" value="Técnico em TI" disabled />
            
                    </div>
            
                  </main>
        </div>
    )
}

export default QRcode;