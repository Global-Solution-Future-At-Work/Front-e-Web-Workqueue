import fs from "node:fs/promises"
import { randomUUID } from "node:crypto"

const filepath = "../backend/data/user.json"

class UserRepository {

    static async read() {
        return JSON.parse(await fs.readFile(filepath))
    }

    static async create(nome, email, senha, cargo, localizacao, experiencias,
        foto = null, resumo = null, area = null,  habilidadesTecnicas = [],
        softSkills = [], formacao = [], projetos = [],
        certificacoes = [], idiomas = [], areaInteresses = []
    ) {
        let data = await this.read()
        data.push({
            "id": randomUUID().toString(),
            "nome": nome,
            "email": email,
            "senha": senha,
            "foto": foto,
            "cargo": cargo,
            "resumo": resumo,
            "localizacao": localizacao,
            "area": area,
            "habilidadesTecnicas": habilidadesTecnicas,
            "softSkills": softSkills,
            "experiencias": experiencias,
            "formacao": formacao,
            "projetos": projetos,
            "certificacoes": certificacoes,
            "idiomas": idiomas,
            "areaInteresses": areaInteresses
        })
        await fs.writeFile(filepath, JSON.stringify(data))
        return 1
    }

    static async findById(id) {
        const data = await this.read();
        return data.find(user => user.id === id) || null;
    }

    static async findByEmail(email) {
        const data = await this.read();
        return data.find(user => user.email === email) || null;
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

    static async update(id, nome = undefined, email = undefined, senha = undefined, cargo = undefined, localizacao = undefined, experiencias = undefined,
        foto = undefined, resumo = undefined, area = undefined,  habilidadesTecnicas = undefined,
        softSkills = undefined, formacao = undefined, projetos = undefined,
        certificacoes = undefined, idiomas = undefined, areaInteresses = undefined
    ) {
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

            data[i]["nome"] = nome != undefined ? nome : data[i]["nome"]
            data[i]["email"] = email != undefined ? email : data[i]["email"]
            data[i]["senha"] = senha != undefined ? senha : data[i]["senha"]
            data[i]["cargo"] = cargo != undefined ? cargo : data[i]["cargo"]
            data[i]["localizacao"] = localizacao != undefined ? localizacao : data[i]["localizacao"]
            data[i]["experiencias"] = experiencias != undefined ? experiencias : data[i]["experiencias"]
            data[i]["foto"] = foto != undefined ? foto : data[i]["foto"]
            data[i]["resumo"] = resumo != undefined ? resumo : data[i]["resumo"]
            data[i]["area"] = area != undefined ? area : data[i]["area"]
            data[i]["habilidadesTecnicas"] = habilidadesTecnicas != undefined ? habilidadesTecnicas : data[i]["habilidadesTecnicas"]
            data[i]["softSkills"] = softSkills != undefined ? softSkills : data[i]["softSkills"]
            data[i]["formacao"] = formacao != undefined ? formacao : data[i]["formacao"]
            data[i]["projetos"] = projetos != undefined ? projetos : data[i]["projetos"]
            data[i]["certificacoes"] = certificacoes != undefined ? certificacoes : data[i]["certificacoes"]
            data[i]["idiomas"] = idiomas != undefined ? idiomas : data[i]["idiomas"]
            data[i]["areaInteresses"] = areaInteresses != undefined ? areaInteresses : data[i]["areaInteresses"]

            await fs.writeFile(filepath, JSON.stringify(data))
            return 1
        }
        return -1
    }
}

export default UserRepository