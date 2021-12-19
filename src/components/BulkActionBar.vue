<template>
  <div class="bulk-action-bar">
    <span class="checkbox">
      <input
        type="checkbox"
        :checked="todosEmailsSelecionados"
        :class="[algunsEmailsSelecionados ? 'partial-check' : '']"
        @click="selecionarTodos"
      />
    </span>
    <span class="buttons">
      <button
        @click="emailsSelecionados.lidos()"
        :disabled="[...emailsSelecionados.emails].every(e => e.read)"
      >
        Marcar como lido
      </button>
      <button
        @click="emailsSelecionados.naoLidos()"
        :disabled="[...emailsSelecionados.emails].every(e => !e.read)"
      >
        Marcar como não lido
      </button>
      <button @click="emailsSelecionados.arquivar()" :disabled="numSelecionados === 0">
        Arquivar
      </button>
    </span>
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
      selecionarTodos,
      emailsSelecionados,
      numSelecionados
    };
  }
};
</script>
