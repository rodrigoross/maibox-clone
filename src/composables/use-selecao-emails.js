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

  return {
    emails,
    troca
  }
}

export default useSelecaoDeEmails;
