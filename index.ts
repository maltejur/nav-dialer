import Dialer from "./dialer";

let listenForPopstate = false;

async function main() {
  history.pushState({ page: 0 }, null, "");
  history.pushState({ page: 1 }, null, "");
  history.pushState({ page: 2 }, null, "");
  history.go(-2);
  setTimeout(() => {
    history.go(1);
    setTimeout(() => {
      listenForPopstate = true;
    });
  });

  const dialer = new Dialer(document.getElementById("dialer"));

  const number = document.getElementById("number");
  const lastUpdate = Number.parseInt(localStorage.getItem("lastUpdate"));
  if (Date.now() - lastUpdate < 2000) {
    if (localStorage.getItem("call") === "true") {
      localStorage.setItem("call", "false");
      document.body.innerHTML = `<div id="calling">Calling <b>${localStorage.getItem(
        "number"
      )}</b></div>`;
      return;
    } else {
      number.innerText = localStorage.getItem("number") || "";
    }
  }

  window.addEventListener("popstate", (event) => {
    if (!listenForPopstate) return;
    switch (event.state.page) {
      case 0:
        history.go(1);
        // dialer.current -= 1;
        number.innerText = number.innerText.slice(0, -1);
        break;

      case 2:
        history.go(-1);
        dialer.current += 1;

      default:
        break;
    }
  });

  window.addEventListener("beforeunload", () => {
    listenForPopstate = false;
    localStorage.setItem("lastUpdate", Date.now().toFixed(0));
    if (dialer.value === "OK") {
      localStorage.setItem("call", "true");
    } else {
      number.innerText += dialer.value;
      localStorage.setItem("number", number.innerText);
    }
  });

  // @ts-ignore
  if (window.chrome)
    document.getElementById("manualforward").style.display = "unset";
}

main();
