import ResetCodeUserRepository from "domain/entity/resetCodeUser/ResetCodeUserRepository";

export default class ExistsCodeUser {
    constructor(private readonly resetCodeUserRepository: ResetCodeUserRepository) {}

    async execute(code: number): Promise<boolean> {
        return await this.resetCodeUserRepository.existCodeUser(code)
    }
}