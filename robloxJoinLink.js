(async () => {
  const url = window.location.href;
  const idMatches = url.match(/\/games\/(\d+)\//);
  const jobIdMatches = url.match(/jobId=([\w-]+)/);
  if (!idMatches || !jobIdMatches) {
    return;
  }
  const id = idMatches[1];
  const jobId = jobIdMatches[1];
  console.log("Joining game", id, jobId);
  window.addEventListener("DOMContentLoaded", () => {
    console.log("Injecting script...");
    const script = document.createElement("script");
    script.innerHTML = `  
        (async () => {
            console.log("Waiting for Roblox to be defined...");
            while (typeof Roblox === "undefined" || typeof Roblox.GameLauncher == "undefined" || typeof Roblox.GameLauncher.joinGameInstance === "undefined") {
            await new Promise((resolve) => setTimeout(resolve));
            }
            console.log("Attempting to join game...");
            Roblox.GameLauncher.joinGameInstance(${id}, "${jobId}");
        })();
    `;
    document.head.appendChild(script);
  });
})();