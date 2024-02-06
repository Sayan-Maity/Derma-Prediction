
import AxiosClient from "../AxiosClient";

export async function postCommunityForum({ content, title, author, bannerImage }) {
    return AxiosClient.post(`api/postCommunityForum`, {
        content,
        title,
        author,
        bannerImage,
    }).then(
        (res) => res
    );
}