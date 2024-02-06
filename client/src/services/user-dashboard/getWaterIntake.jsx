
import Cookies from "js-cookie";
import AxiosClient from "../AxiosClient";

export async function getWaterIntake() {
    const config = {
        method: "get",
        url: `api/user/getWaterIntakeData`,
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    };

    return AxiosClient(config).then((res) => res);
}

