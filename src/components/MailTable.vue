<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in emailsNaoArquivados"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="abrirEmail(email)"
      >
        <td>
          <input type="checkbox" name="read" id="read" />
        </td>
        <td>{{ email.from }}</td>
        <td>
          <p>
            <strong>{{ email.subject }}</strong> - {{ email.body }}
          </p>
        </td>
        <td class="date">
          {{ format(new Date(email.sentAt), "d 'de' MMMM", localeOptions) }}
        </td>
        <td>
          <button @click="arquivarEmail(email)">Arquivar</button>
        </td>
      </tr>
    </tbody>
  </table>
  <MailView v-if="emailAberto" :email="emailAberto" />
</template>
<script>
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ref } from "vue";
import axios from "axios";
import MailView from "@/components/MailView";

export default {
  name: "MailTable",
  components: {
    MailView
  },
  async setup() {
    // let { data: emails } = await axios.get("http://localhost:3000/emails");
    // let emails = response.data; // reduzindo com es6 fica { data: emails}
    let response = await axios.get("http://localhost:3000/emails");
    const emails = ref(response.data);

    return {
      format,
      localeOptions: {
        locale: ptBR
      },
      emails,
      emailAberto: ref(null)
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
      email.read = true;
      this.atualizarEmail(email);
      this.emailAberto = email;
    },
    arquivarEmail(email) {
      email.archived = true;
      this.atualizarEmail(email);
    },
    atualizarEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email);
    }
  }
};
</script>
