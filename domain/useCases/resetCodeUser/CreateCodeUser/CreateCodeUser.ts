import ResetCodeUserRepository from "domain/entity/resetCodeUser/ResetCodeUserRepository";


export default class CreateCodeUser {
    constructor(private readonly resetCodeRepository: ResetCodeUserRepository) {}

    async execute(id_client: number, code: number): Promise<any> {
        return await this.resetCodeRepository.createCodeUser(id_client, code)
    }
}