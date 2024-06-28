import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    name: "Agendamento Transferência",
    component: () => import("./components/AgendamentoTransferencia")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;