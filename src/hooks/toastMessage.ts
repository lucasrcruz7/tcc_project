import { toast } from "react-toastify";

type ToastType = 'success' | 'error' | 'info' | 'warning'

export function useToastMessage() {

    function show(message: string, type: ToastType) {
        toast[type](message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })

    }
    function success(message: string) {
        show(message, 'success')
    }

    function error(message: string) {
        show(message, 'error')
    }

    return {success, error}
}
