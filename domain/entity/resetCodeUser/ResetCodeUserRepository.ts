

export default interface ResetCodeUserRepository {
    createCodeUser(id_client: number, code: number): Promise<any>;
    existCodeUser(code: number): Promise<boolean>;
    compareCodeUser(code: number): Promise<any>
}