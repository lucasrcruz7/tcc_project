import React, { useState, useEffect, use } from 'react'
import Header from "./Header/Header";
import USER from '../Img/user (1).png';
import { qrcodeService } from '../services/qrcodeService';
import { AuthService } from '../services/authService';

function QRcode() {
    const [qrcode, setQrcode] = useState('');
    const [aluno, setAluno] = useState(null);
    const [qrInsdisponivel, setQRcodeIndisponivel] = useState(false);

    useEffect(() => {
        const gerarQRCode = async () => {
            try {
                const { qrcode } = await qrcodeService.gerarQRCode();
                setQrcode(qrcode);
            } catch (error) {
               setQRcodeIndisponivel(true)
            }
        };
        
        const buscarAluno = async () => {
            try {
                const authService = new AuthService();
                const data = await authService.getUser();
                setAluno(data);
            } catch (error) {
                console.error('Erro ao buscar dados do aluno:', error);
            }
        };
        
        gerarQRCode();
        buscarAluno();
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Header />
            <main className="p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
                            <img className="w-16 h-16 sm:w-20 sm:h-20" src={USER} alt="USER" />
                            <div>
                                <p className="text-base sm:text-lg"><strong>Nome:</strong> {aluno?.nome || '-'}</p>
                                <p className="text-base sm:text-lg"><strong>RM:</strong> {aluno?.rm || '-'}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center">
                            {qrcode && <img className="w-full max-w-xs sm:max-w-sm" src={qrcode} alt="QR Code" />}
                            {qrInsdisponivel && <p className="text-gray-600">QR Code indisponível</p>}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default QRcode;