/* eslint-disable prettier/prettier */
import Cookies from "js-cookie";
import AxiosClient from "../AxiosClient";

export async function getSkinCare() {
    return AxiosClient.get(`api/user/getSkinCareRoutineData`, {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    }).then(
        (res) => res
    );
}