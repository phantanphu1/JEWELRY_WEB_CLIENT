import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type ToastType = "success" | "error" | "warn" | "info";

export const toastify = (type: ToastType, label: string) => {
  switch (type) {
    case "success": {
      toast.success(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    case "error": {
      toast.error(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    case "warn": {
      toast.warn(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    case "info": {
      toast.info(label, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 1000,
      });
      break;
    }
    default:
      break;
  }
};

export const formatMoney = (money: number | string): string => {
  return Number(money).toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};
