const { onBeforeUnmount } = require("vue");

/**
 * Composable criado para abstrair o uso da funcao
 */
let useKeyDown = combinacao => {
  let onKeyDown = event => {
    let kc = combinacao.find(kc => kc.tecla == event.key);
    if (kc) kc.fn();
  };

  window.addEventListener("keydown", onKeyDown);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
  });
};

export default useKeyDown
