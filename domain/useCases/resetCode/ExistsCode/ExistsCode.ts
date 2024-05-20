import ResetCodeRepository from "domain/entity/resetCode/ResetCodeRepository";

export default class ExistsCode {
    constructor(private readonly resetCodeRepository: ResetCodeRepository) {}

    async execute(code: number): Promise<boolean> {
        return await this.resetCodeRepository.existCode(code)
    }
}