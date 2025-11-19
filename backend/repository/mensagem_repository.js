import fs from "node:fs/promises"
import { randomUUID } from "node:crypto"

const filepath = "../backend/data/mensagem.json"

class MensagemRepository {

    static async read() {
        return JSON.parse(await fs.readFile(filepath))
    }

    static async create(id_empresa, id_user, mensagem) {
        let data = await this.read()
        data.push({
            "id": randomUUID().toString(),
            "data_criacao": Date.now(),
            "id_empresa": id_empresa,
            "id_user": id_user,
            "mensagem": mensagem
        })
        await fs.writeFile(filepath, JSON.stringify(data))
        return 1
    }

    static async delete(id) {
        let data = await this.read()
        let found_user_index = undefined
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == id){
                found_user_index = i
                break
            }
        }
        if (found_user_index != undefined) {
            data.splice(found_user_index, 1)
            await fs.writeFile(filepath, JSON.stringify(data))
            return 1
        }
        return -1
    }

    static async update(id, id_empresa = undefined, id_user = undefined, mensagem = undefined) {
        let data = await this.read()
        let found_user_index = undefined
        
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == id){
                found_user_index = i
                break
            }
        }
        if (found_user_index != undefined) {
            let i = found_user_index

            data[i]["id_empresa"] = id_empresa != undefined ? id_empresa : data[i]["id_empresa"]
            data[i]["id_user"] = id_user != undefined ? id_user : data[i]["id_user"]
            data[i]["mensagem"] = mensagem != undefined ? mensagem : data[i]["mensagem"]

            await fs.writeFile(filepath, JSON.stringify(data, null, 2))
            return 1
        }
        return -1
    }
}

export default MensagemRepository;
