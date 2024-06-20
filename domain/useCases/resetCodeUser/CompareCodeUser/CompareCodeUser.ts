import ResetCodeUserRepository from "domain/entity/resetCodeUser/ResetCodeUserRepository";

export default class CompareCodeUser {
    constructor(private readonly resetCodeRepository: ResetCodeUserRepository) {}

    async execute(code: number): Promise<any> {
        return await this.resetCodeRepository.compareCodeUser(code)
    }
}