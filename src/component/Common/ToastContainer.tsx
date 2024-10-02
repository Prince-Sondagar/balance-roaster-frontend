import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const toastEmitter = {
    success(message: string) {
        toast.success(message);
    },
    error(message: string) {
        toast.error(message)
    },
    warn(message: string) {
        toast.warn(message)
    },
    info(message: string) {
        toast.info(message)
    },
    toast(message: string) {
        toast(message)
    }
}
