import fs from "node:fs/promises"
import { randomUUID } from "node:crypto"

// Alterei o caminho para empresa.json
const filepath = "../backend/data/empresa.json"

class EmpresaRepository {

    static async read() {
        return JSON.parse(await fs.readFile(filepath))
    }

    static async create(nome_empresa, email_corporativo, senha, 
        area_atuacao, tamanho, descricao, 
        localizacao = null, site = null
    ) {
        let data = await this.read()
        data.push({
            "id": randomUUID().toString(),
            "nome_empresa": nome_empresa,
            "email_corporativo": email_corporativo,
            "senha": senha,
            "area_atuacao": area_atuacao,
            "tamanho": tamanho,
            "descricao": descricao,
            "localizacao": localizacao,
            "site": site
        })
        
        await fs.writeFile(filepath, JSON.stringify(data))
        return 1
    }

    static async findById(id) {
        const data = await this.read();
        return data.find(empresa => empresa.id === id) || null;
    }

    static async findByEmail(email) {
        const data = await this.read();
        return data.find(empresa => empresa.email_corporativo === email) || null;
    }

    static async delete(id) {
        let data = await this.read()
        let found_empresa_index = undefined
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == id){
                found_empresa_index = i
                break
            }
        }
        if (found_empresa_index != undefined) {
            data.splice(found_empresa_index, 1)
            await fs.writeFile(filepath, JSON.stringify(data, null, 2))
            return 1
        }
        return -1
    }

    static async update(id, nome_empresa = undefined, email_corporativo = undefined, senha = undefined, 
        area_atuacao = undefined, tamanho = undefined, descricao = undefined, 
        localizacao = undefined, site = undefined
    ) {
        let data = await this.read()
        let found_empresa_index = undefined
        for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == id){
                found_empresa_index = i
                break
            }
        }
        if (found_empresa_index != undefined) {
            let i = found_empresa_index

            data[i]["nome_empresa"] = nome_empresa != undefined ? nome_empresa : data[i]["nome_empresa"]
            data[i]["email_corporativo"] = email_corporativo != undefined ? email_corporativo : data[i]["email_corporativo"]
            data[i]["senha"] = senha != undefined ? senha : data[i]["senha"]
            data[i]["area_atuacao"] = area_atuacao != undefined ? area_atuacao : data[i]["area_atuacao"]
            data[i]["tamanho"] = tamanho != undefined ? tamanho : data[i]["tamanho"]
            data[i]["descricao"] = descricao != undefined ? descricao : data[i]["descricao"]
            data[i]["localizacao"] = localizacao != undefined ? localizacao : data[i]["localizacao"]
            data[i]["site"] = site != undefined ? site : data[i]["site"]

            await fs.writeFile(filepath, JSON.stringify(data, null, 2))
            return 1
        }
        return -1
    }
}

export default EmpresaRepository;