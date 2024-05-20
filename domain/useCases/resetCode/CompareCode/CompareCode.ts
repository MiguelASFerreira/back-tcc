import ResetCodeRepository from "domain/entity/resetCode/ResetCodeRepository";

export default class CompareCode {
    constructor(private readonly resetCodeRepository: ResetCodeRepository) {}

    async execute(code: number): Promise<any> {
        return await this.resetCodeRepository.compareCode(code)
    }
}