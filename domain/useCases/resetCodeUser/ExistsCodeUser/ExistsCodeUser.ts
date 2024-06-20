import ResetCodeUserRepository from "domain/entity/resetCodeUser/ResetCodeUserRepository";

export default class ExistsCodeUser {
    constructor(private readonly resetCodeRepository: ResetCodeUserRepository) {}

    async execute(code: number): Promise<boolean> {
        return await this.resetCodeRepository.existCodeUser(code)
    }
}