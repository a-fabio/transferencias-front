import http from "../http-common";

class TaxaService {

  calcularValorComTaxas(dataRealizacaoTransferencia, valor) {
    return http.get(`/taxa/calcular/${dataRealizacaoTransferencia}/${valor}`);
  }
}

export default new TaxaService();
