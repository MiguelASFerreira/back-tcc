import Veiculo from "./Veiculo";

export default interface VeiculoRepository {
    createVeiculo(data: Veiculo): Promise<Veiculo>;
    veiculosByEmpresa(id_empresa: number): Promise<Veiculo[]>;
    updateVeiculo(id: number, id_empresa: number, data: Veiculo): Promise<Veiculo>;
    deleteVeiculo(id: number, id_empresa: number): Promise<any>;
}
