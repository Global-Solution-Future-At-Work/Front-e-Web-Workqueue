import fs from "node:fs/promises"
import { randomUUID } from "node:crypto"

const filepath = "../backend/data/recomendacoes.json"

class RecomendacoesRepository {

    static async read() {
        try {
            return JSON.parse(await fs.readFile(filepath))
        } catch (error) {
            return []
        }
    }

    static async create(id_user, mensagem) {
        let data = await this.read()
        
        data.push({
            "id": randomUUID().toString(), 
            "id_user": id_user,           
            "mensagem": mensagem
        })
        
        await fs.writeFile(filepath, JSON.stringify(data, null, 2))
        return 1
    }

    static async findAll() {
        return await this.read();
    }

    static async findByUserId(id_user) {
        const data = await this.read();
        return data.filter(rec => rec.id_user === id_user);
    }

    static async delete(id) {
        let data = await this.read()
        let found_index = undefined
        
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == id){
                found_index = i
                break
            }
        }
        
        if (found_index != undefined) {
            data.splice(found_index, 1)
            await fs.writeFile(filepath, JSON.stringify(data, null, 2))
            return 1
        }
        return -1
    }
}

export default RecomendacoesRepository;