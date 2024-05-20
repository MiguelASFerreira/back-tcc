

export default interface ResetCodeRepository {
    createCode(id_client: number, code: number): Promise<any>;
    existCode(code: number): Promise<boolean>;
    compareCode(code: number): Promise<any>
}