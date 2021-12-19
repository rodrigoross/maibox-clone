<template>
  <table class="mail-table">
    <tbody>
      <tr
        v-for="email in emailsNaoArquivados"
        :key="email.id"
        :class="['clickable', email.read ? 'read' : '']"
        @click="lerEmail(email)"
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
          {{ format(new Date(email.sentAt), "d, MMM yyyy") }}
        </td>
        <td>
          <button @click="arquivarEmail(email)">Arquivar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { format } from "date-fns";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "MailTable",
  async setup() {
    // let { data: emails } = await axios.get("http://localhost:3000/emails");
    // let emails = response.data; // reduzindo com es6 fica { data: emails}
    let response = await axios.get("http://localhost:3000/emails");
    const emails = ref(response.data);

    return {
      format,
      emails
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
    lerEmail(email) {
      email.read = true;
      this.atualizarEmail(email);
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
