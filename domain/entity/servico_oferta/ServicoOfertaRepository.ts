import {QueryServicoOferta, ServicoOferta} from './ServicoOferta';

export default interface ServicoOfertaRepository {
  createServicoOferta(data: ServicoOferta): Promise<ServicoOferta>;
  filterServicoOferta(query: QueryServicoOferta):Promise<QueryServicoOferta>;
  deleteServicoOfertaEmpresa(id_empresa: number, id_servico: number): Promise<any>;
  updateServicoOfertaEmpresa(valor: number, id_empresa: number, id_servico: number): Promise<any>;
}
