<template>
  <BulkActionBar :emails="emailsNaoArquivados" />
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in emailsNaoArquivados"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
      >
        <td>
          <input
            type="checkbox"
            @click="selecaoDeEmails.troca(email)"
            :checked="selecaoDeEmails.emails.has(email)"
          />
        </td>
        <td @click="abrirEmail(email)">{{ email.from }}</td>
        <td @click="abrirEmail(email)">
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date" @click="abrirEmail(email)">
          {{ format(new Date(email.sentAt), "d 'de' MMMM", localeOptions) }}
        </td>
        <td>
          <button @click="arquivarEmail(email)">Arquivar</button>
        </td>
      </tr>
    </tbody>
  </table>
  <ModalView v-if="emailAberto" @closeModal="emailAberto = null">
    <MailView :email="emailAberto" @alterarEmail="alterarEmail" />
  </ModalView>
</template>
<script>
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ref } from "vue";
import axios from "axios";
import useSelecaoDeEmails from "@/composables/use-selecao-emails";
import MailView from "@/components/MailView";
import ModalView from "@/components/ModalView";
import BulkActionBar from "@/components/BulkActionBar";

export default {
  name: "MailTable",
  components: {
    MailView,
    ModalView,
    BulkActionBar
  },
  async setup() {
    let { data: emails } = await axios.get("http://localhost:3000/emails");
    // let emails = response.data; // reduzindo com es6 fica { data: emails}

    return {
      format,
      localeOptions: {
        locale: ptBR
      },
      emails: ref(emails),
      emailAberto: ref(null),
      selecaoDeEmails: useSelecaoDeEmails()
    };
  },
  computed: {
    emailsOrdenados() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1;
      });
    },
    emailsNaoArquivados() {
      return this.emailsOrdenados.filter(e => !e.archived);
    }
  },
  methods: {
    abrirEmail(email) {
      this.emailAberto = email;

      if (email) {
        email.read = true;
        this.atualizarEmail(email);
      }
    },
    arquivarEmail(email) {
      email.archived = true;
      this.atualizarEmail(email);
    },
    alterarEmail({ trocarLeitura, trocarArquivar, salvar, fecharModal, mudarIndex }) {
      let email = this.emailAberto;

      if (trocarLeitura) email.read = !email.read;
      if (trocarArquivar) email.archived = !email.archived;

      if (salvar) this.atualizarEmail(email);
      if (fecharModal) this.emailAberto = null;

      if (mudarIndex) {
        let emails = this.emailsNaoArquivados;
        let indexAtual = emails.indexOf(this.emailAberto);
        let novoEmail = emails[indexAtual + mudarIndex];
        this.abrirEmail(novoEmail);
      }
    },
    atualizarEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    }
  }
};
</script>
