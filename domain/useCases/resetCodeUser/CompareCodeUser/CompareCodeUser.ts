import ResetCodeUserRepository from "domain/entity/resetCodeUser/ResetCodeUserRepository";

export default class CompareCodeUser {
    constructor(private readonly resetCodeUserRepository: ResetCodeUserRepository) {}

    async execute(code: number): Promise<any> {
        return await this.resetCodeUserRepository.compareCodeUser(code)
    }
}