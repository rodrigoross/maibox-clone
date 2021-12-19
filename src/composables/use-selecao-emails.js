import axios from "axios";

const { reactive } = require("vue");

const emails = reactive(new Set());
export const useSelecaoDeEmails = function () {

  const troca = function (email) {
    if (emails.has(email)) {
      emails.delete(email);
    } else {
      emails.add(email);
    }
  }

  const limpa = () => {
    emails.clear()
  }

  const adicionaVarios = (novosEmails) => {
    novosEmails.forEach(email => {
      emails.add(email)
    });
  }

  const paraSelecionados = (fn) => {
    emails.forEach(email => {
      fn(email);
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    })
  }

  const lidos = () => paraSelecionados(e => e.read = true)
  const naoLidos = () => paraSelecionados(e => e.read = false)
  const arquivar = () => { paraSelecionados(e => e.archived = true); limpa() }

  return {
    emails,
    troca,
    limpa,
    adicionaVarios,
    lidos,
    naoLidos,
    arquivar
  }
}

export default useSelecaoDeEmails;
