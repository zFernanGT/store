import axios from "axios";

export async function getSale() {
    axios.get('https://plugin.tebex.io/sales', {
        headers: {
            "X-Tebex-Secret": process.env.SERVER_SECRET,
        }
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
    });
}
