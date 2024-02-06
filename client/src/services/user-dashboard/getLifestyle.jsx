
import Cookies from "js-cookie";
import AxiosClient from "../AxiosClient";

export async function getLifestyle() {
    return AxiosClient.get(`api/user/getLifestyleAnalyticsData`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    }).then(
        (res) => res
    );
}