import ResetCodeRepository from "domain/entity/resetCode/ResetCodeRepository";


export default class CreateResetCode {
    constructor(private readonly resetCodeRepository: ResetCodeRepository) {}

    async execute(id_client: number, code: number): Promise<any> {
        return await this.resetCodeRepository.createCode(id_client, code)
    }
}