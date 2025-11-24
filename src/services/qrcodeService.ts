import { Api } from './api';

const api = new Api();

export const qrcodeService = {
    gerarQRCode: async () => {
        return await api.get('qrcode');
    }
};
