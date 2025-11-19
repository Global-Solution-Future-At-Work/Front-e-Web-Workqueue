import fs from "node:fs"

const nome_arquivo = {
    user: "user.json",
    empresa: "empresa.json",
    feed: "feed.json",
    mensagem: "mensagem.json",
    queue: "queue.json"
};

export default function verify() {
    for (let data in nome_arquivo){
        if (!fs.existsSync(`../backend/data/${nome_arquivo[data]}`)) {
            fs.writeFileSync(`../backend/data/${nome_arquivo[data]}`, JSON.stringify([]));
        }
    }
} 

