import http from "../http-common";

class TransferenciaService {

  listarTransferencias() {
    return http.get("/transferencia");
  }

  cadastrar(transferencia) {
    return http.post("/transferencia", transferencia);
  }

}

export default new TransferenciaService();
