<template>
  <div class="email-display">
    <div>
      <button @click="trocaArquivar">
        {{ email.archived ? "Desarquivar (a)" : "Arquivar e-mail (a)" }}
      </button>
      <button @click="trocaLeitura">
        {{ email.read ? "Marcar como Não-lido (r)" : "Marcar como Lido (r)" }}
      </button>
      <button @click="irParaNovo">Novo (k)</button>
      <button @click="irParaAntigo">Antigo (j)</button>
    </div>
    <h2 class="mb-0">
      Assunto: <strong>{{ email.subject }}</strong>
    </h2>
    <div>
      <em
        >De: {{ email.from }} em
        {{ format(new Date(email.sentAt), "d 'de' MMMM 'de' yyyy", localeOptions) }}
      </em>
    </div>
    <div v-html="marked(email.body)"></div>
  </div>
</template>
<script>
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import marked from "marked";
import axios from "axios";
import useKeyDown from "@/composables/use-keydown";

export default {
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const email = props.email;

    // const trocaLeitura = () => {
    //   email.read = !email.read;
    //   axios.put(`http://localhost:3000/emails/${email.id}`, email);
    // };

    // const trocaArquivar = () => {
    //   email.archived = !email.archived;
    //   axios.put(`http://localhost:3000/emails/${email.id}`, email);
    // };

    const trocaLeitura = () => {
      emit("alterarEmail", { trocarLeitura: true, salvar: true });
    };
    const trocaArquivar = () => {
      emit("alterarEmail", { trocarArquivar: true, salvar: true, fecharModal: true });
    };
    const irParaNovo = () => {
      emit("alterarEmail", { mudarIndex: -1 });
    };
    const irParaAntigo = () => {
      emit("alterarEmail", { mudarIndex: 1 });
    };
    const irParaNovoEArquivar = () => {
      emit("alterarEmail", { mudarIndex: -1, trocarArquivar: true, salvar: true });
    };
    const irParaAntigoEArquivar = () => {
      emit("alterarEmail", { mudarIndex: 1, trocarArquivar: true, salvar: true });
    };

    useKeyDown([
      { tecla: "r", fn: trocaLeitura },
      { tecla: "a", fn: trocaArquivar },
      { tecla: "k", fn: irParaNovo },
      { tecla: "j", fn: irParaAntigo },
      { tecla: "[", fn: irParaNovoEArquivar },
      { tecla: "]", fn: irParaAntigoEArquivar }
    ]);

    return {
      format,
      localeOptions: {
        locale: ptBR
      },
      marked,
      trocaLeitura,
      trocaArquivar,
      irParaNovo,
      irParaAntigo
    };
  }
};
</script>
<style lang=""></style>
