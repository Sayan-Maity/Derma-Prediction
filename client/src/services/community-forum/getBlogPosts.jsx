
import AxiosClient from "../AxiosClient";

export async function getBlogPosts() {
    return AxiosClient.get(`api/getCommunityForum`).then(
        (res) => res
    );
}