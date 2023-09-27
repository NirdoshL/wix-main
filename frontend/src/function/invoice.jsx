import { toast } from "react-toastify";
import axiosInstance from "../config/interceptor";
import { GetStore } from "../config/store";

//Super Admin To toggle restaurnat visibility
export const generatedPDF = async (data, cashier) => {
  const user = GetStore("user");
  const datas = {
    data: data,
    res: user.user.resName,
    cashier: cashier,
    address: user.user.resAddress,
  };
  try {
    const response = await axiosInstance.post(`invoice/generatepdf`, datas, {
      responseType: "blob",
    });
    return response;
  } catch (error) {
    toast.error(`${error}`);
  }
};
