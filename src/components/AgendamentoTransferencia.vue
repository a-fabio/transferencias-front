<template>
  <form @submit.prevent="cadastrarAgendamento" class="transfer-form">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-5">
        <label for="transferencia">Número Conta Origem</label>
        <input type="text" class="form-control" id="numeroContaOrigem" required
          v-model="transferencia.numeroContaOrigem" name="numeroContaOrigem" />
      </div>

      <div class="col-md-5">
        <label for="transferencia">Número Conta Destino</label>
        <input type="text" class="form-control" id="numeroContaDestino" required
          v-model="transferencia.numeroContaDestino" name="numeroContaDestino" />
      </div>
      <div class="col-md-1"></div>
    </div>
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-5">
        <label for="transferencia">Data Realização Transferência</label>
        <input type="date" class="form-control" id="dataRealizacaoTransferencia" required
          @change="calcularValorComTaxas()" v-model="transferencia.dataRealizacaoTransferencia"
          name="dataRealizacaoTransferencia" />
      </div>

      <div class="col-md-5">
        <label for="transferencia">Valor</label>
        <input type="text" class="form-control" id="valor" required @change="calcularValorComTaxas()"
          v-model="transferencia.valor" name="valor" />
      </div>
      <div class="col-md-1"></div>
    </div>
    <br>
    <div class="row">
      <div class="col-md-5"></div>
      <div class="col-md-2">
        <label for="transferencia">Valor com taxas</label>
        <input type="text" class="form-control" id="valorComTaxas" disabled v-model="valorComTaxas"
          name="valorComTaxas" />
      </div>
      <div class="col-md-5"></div>
    </div>

    <br>
    <div class="row">
      <div class="col-md-5"></div>
      <div class="col-md-2">
        <button type="submit" class="btn btn-success">Cadastrar Agendamento</button>
      </div>
      <div class="col-md-5"></div>
    </div>
  </form>

  <br>
  <div class="col-md-12">
    <h4 style="text-align: center;">Agendamentos de Transferência</h4>
    <table>
      <tr>
        <th>Número Conta Origem</th>
        <th>Número Conta Destino</th>
        <th>Valor</th>
        <th>Valor com taxas</th>
        <th>Data criação</th>
        <th>Data realização transferência</th>
      </tr>
      <tr v-for="(item, index) in transferencias" :key="index">
        <td>{{ item.numeroContaOrigem }}</td>
        <td>{{ item.numeroContaDestino }}</td>
        <td>{{ item.valor }}</td>
        <td>{{ item.valorComTaxas }}</td>
        <td>{{ item.dataCriacao }}</Td>
        <td>{{ item.dataRealizacao }}</Td>
      </tr>
    </table>
  </div>
</template>

<script>
import TransferenciaService from "../services/TransferenciaService";
import TaxaService from "../services/TaxaService";

export default {
  name: "add-tutorial",
  data() {
    return {
      transferencia: {},
      valorComTaxas: {},
      transferencias: [],
    };
  },
  methods: {

    iniciarVariavelTransferencia() {
      this.transferencia = {
        numeroContaOrigem: null,
        numeroContaDestino: null,
        dataRealizacaoTransferencia: null,
        valor: null
      }
    },

    iniciarVariavelValorComTaxas() {
      this.valorComTaxas = null;
    },

    paginar(valorPagina) {
      this.pagina = valorPagina;
      this.retrieveTutorials();
    },


    cadastrarAgendamento() {
      TransferenciaService.cadastrar(this.transferencia)
        .then(response => {
          response;
          this.iniciarVariavelTransferencia();
          this.iniciarVariavelValorComTaxas();
          console.log("TESTE"); 
          this.listarAgendamentos();
        })
        .catch(e => {
          alert(e.response.data.mensagem);
        })
    },

    calcularValorComTaxas() {
      if (this.transferencia.valor && this.transferencia.dataRealizacaoTransferencia) {
        TaxaService.calcularValorComTaxas(this.transferencia.dataRealizacaoTransferencia, this.transferencia.valor)
          .then(response => {
            this.valorComTaxas = response.data;
          })
          .catch(e => {
            alert(e.response.data.mensagem);
          })
      }
    },

    listarAgendamentos() {
      TransferenciaService.listarTransferencias()
        .then(response => {
          this.transferencias = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
  },

  mounted() {
    this.iniciarVariavelTransferencia();
    this.iniciarVariavelValorComTaxas();
    this.listarAgendamentos();
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
