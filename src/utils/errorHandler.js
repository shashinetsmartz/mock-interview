import { toast } from "react-toastify";
// import { handleLogout } from "./logout";

export const errorHandler = (error) => {
  const errorMsg = error.data?.message || error.data?.error;
  if (errorMsg) {
    toast.error(errorMsg);
  }

  //   if (error.status === 417) {
  //     handleLogout(errorMsg);
  //   }
};
