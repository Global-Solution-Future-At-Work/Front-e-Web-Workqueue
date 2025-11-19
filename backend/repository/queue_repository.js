import fs from "node:fs/promises"
import { randomUUID } from "node:crypto"

const filepath = "../backend/data/queue.json"

class QueueRepository {

    static async read() {
        return JSON.parse(await fs.readFile(filepath))
    }

    static async create(id_empresa, nome_empresa, vaga, sugestao_ia = null, status = "Ativo", candidatos = []) {
        let data = await this.read()
        data.push({
            "id": randomUUID().toString(),
            "data_criacao": Date.now(),
            "id_empresa": id_empresa,
            "nome_empresa": nome_empresa,
            "vaga": vaga,
            "sugestao_ia": sugestao_ia,
            "status": ativo,
            "candidatos": candidatos
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

    static async update(id, id_empresa = undefined, nome_empresa = undefined, vaga = undefined, sugestao_ia = undefined, status = undefined, candidatos = undefined) {
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
            data[i]["nome_empresa"] = nome_empresa != undefined ? nome_empresa : data[i]["nome_empresa"]
            data[i]["vaga"] = vaga != undefined ? vaga : data[i]["vaga"]
            data[i]["sugestao_ia"] = sugestao_ia != undefined ? sugestao_ia : data[i]["sugestao_ia"]
            data[i]["status"] = status != undefined ? status : data[i]["status"]
            data[i]["candidatos"] = candidatos != undefined ? candidatos : data[i]["candidatos"]

            await fs.writeFile(filepath, JSON.stringify(data))
            return 1
        }
        return -1
    }
}

export default QueueRepository