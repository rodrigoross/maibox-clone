<template>
  <div class="email-display">
    <div>
      <button @click="arquivarEmail">
        {{ email.archived ? "Desarquivar (a)" : "Arquivar e-mail (a)" }}
      </button>
      <button @click="trocaLeitura">
        {{ email.read ? "Marcar como Não-lido (r)" : "Marcar como Lido (r)" }}
      </button>
      <button @click="irParaNovo" >Novo (k)</button>
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
  setup(props) {
    const email = props.email;

    const trocaLeitura = () => {
      email.read = !email.read;
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    };

    const arquivarEmail = () => {
      email.archived = !email.archived;
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    };

    useKeyDown([
      { tecla: "r", fn: trocaLeitura },
      { tecla: "a", fn: arquivarEmail }
    ]);

    return {
      format,
      localeOptions: {
        locale: ptBR
      },
      marked,
      trocaLeitura,
      arquivarEmail
    };
  }
};
</script>
<style lang=""></style>
