import axios from "axios";

export default function request(url: string, params: any) {
    const config = Object.assign({ url }, params);
    return axios(config).then(res => res.data);
}