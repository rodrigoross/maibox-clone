const { onBeforeUnmount } = require("vue");

/**
 * Composable criado para abstrair o uso da funcao
 */
let useKeyDown = combinacao => {
  let onKeyDown = event => {
    console.log(event.key, combinacao);
    let kc = combinacao.find(kc => kc.tecla == event.key);
    if (kc) kc.fn();
  };

  window.addEventListener("keydown", onKeyDown);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
  });
};

export default useKeyDown
