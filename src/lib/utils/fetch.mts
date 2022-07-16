import { get } from "https";
export async function fetch(url: string, format?: 'json' | 'blob' | 'text' | 'arrayBuffer', options = { method: 'GET' }) {
    const _url = new URL(url);
    return new Promise<Record<string, any>>((resolve, reject) => {
        let value = '';
        get(_url, res => {
            const code = res.statusCode;
            if (code >= 400) {
                reject({ code, message: res.statusMessage });
            } else if (code >= 300) {
                fetch(res.headers.location).then(resolve, reject);
            } else {
                res.setEncoding('utf-8');

                res.on('data', (data: string) => {
                    value += data;
                }).on('end', () => {
                    resolve(JSON.parse(value));
                });
            }
        });
    });
}