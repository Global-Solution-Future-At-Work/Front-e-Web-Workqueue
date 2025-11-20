import fs from "node:fs/promises"

const filepath = "../backend/data/admin.json"

export default class AdminRepository {
    static async read() {
        return JSON.parse(await fs.readFile(filepath))
    }
}