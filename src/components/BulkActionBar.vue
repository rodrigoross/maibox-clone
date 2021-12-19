<template>
  <div>
    <input
      type="checkbox"
      :checked="todosEmailsSelecionados"
      :class="[algunsEmailsSelecionados ? 'partial-check' : '']"
      @click="selecionarTodos"
    />
  </div>
</template>
<script>
import useSelecaoDeEmails from "@/composables/use-selecao-emails";
import { computed } from "@vue/reactivity";
export default {
  props: {
    emails: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const emailsSelecionados = useSelecaoDeEmails();
    const numSelecionados = computed(() => emailsSelecionados.emails.size);
    const totalEmails = props.emails.length;

    const todosEmailsSelecionados = computed(() => numSelecionados.value === totalEmails);
    const algunsEmailsSelecionados = computed(() => {
      return numSelecionados.value > 0 && numSelecionados.value < totalEmails;
    });

    const selecionarTodos = function() {
      if (todosEmailsSelecionados.value) {
        emailsSelecionados.limpa();
      } else {
        emailsSelecionados.adicionaVarios(props.emails);
      }
    };

    return {
      todosEmailsSelecionados,
      algunsEmailsSelecionados,
      selecionarTodos
    };
  }
};
</script>
