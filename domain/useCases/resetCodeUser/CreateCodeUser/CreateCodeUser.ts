import ResetCodeUserRepository from "domain/entity/resetCodeUser/ResetCodeUserRepository";


export default class CreateCodeUser {
    constructor(private readonly resetCodeUserRepository: ResetCodeUserRepository) {}

    async execute(id_client: number, code: number): Promise<any> {
        return await this.resetCodeUserRepository.createCodeUser(id_client, code)
    }
}