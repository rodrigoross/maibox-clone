<template>
  <div class="email-display">
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

export default {
  props: {
    email: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      format,
      localeOptions: {
        locale: ptBR
      },
      marked
    };
  }
};
</script>
<style lang=""></style>
