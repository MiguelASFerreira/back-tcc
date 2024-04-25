import {QueryServicoOferta, ServicoOferta} from './ServicoOferta';

export default interface ServicoOfertaRepository {
  createServicoOferta(data: ServicoOferta): Promise<ServicoOferta>;
  filterServicoOferta(query: QueryServicoOferta):Promise<QueryServicoOferta>;
}
