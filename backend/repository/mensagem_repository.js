import fs from "node:fs/promises"
import { randomUUID } from "node:crypto"

const filepath = "../backend/data/mensagem.json"

class MensagemRepository {

    static async read() {
        try {
            const data = await fs.readFile(filepath);
            return JSON.parse(data);
        } catch (error) {
            return []; // Retorna array vazio se arquivo não existir ou der erro
        }
    }

    // ADICIONADO: parametro 'enviado_por'
    static async create(id_empresa, id_user, mensagem, enviado_por) {
        let data = await this.read()
        data.push({
            "id": randomUUID().toString(),
            "data_criacao": Date.now(),
            "id_empresa": id_empresa, // Define o contexto (Empresa participante)
            "id_user": id_user,       // Define o contexto (Usuário participante)
            "enviado_por": enviado_por, // QUEM enviou a mensagem (ID do autor)
            "mensagem": mensagem
        })
        await fs.writeFile(filepath, JSON.stringify(data, null, 2))
        return 1
    }

    static async delete(id) {
        let data = await this.read()
        let found_index = data.findIndex(msg => msg.id == id);
        
        if (found_index !== -1) {
            data.splice(found_index, 1)
            await fs.writeFile(filepath, JSON.stringify(data, null, 2))
            return 1
        }
        return -1
    }

    static async update(id, id_empresa = undefined, id_user = undefined, mensagem = undefined) {
        let data = await this.read()
        let found_index = data.findIndex(msg => msg.id == id);
        
        if (found_index !== -1) {
            let i = found_index
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