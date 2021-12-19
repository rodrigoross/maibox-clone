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

  return {
    emails,
    troca,
    limpa,
    adicionaVarios
  }
}

export default useSelecaoDeEmails;
