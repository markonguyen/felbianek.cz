/* Minimal rich-text toolbar via document.execCommand */
(function () {
  window.AdminEditor = {
    init(root) {
      const toolbar = root.querySelector(".rte__toolbar");
      const editor = root.querySelector(".rte__editor");
      if (!toolbar || !editor) return;

      toolbar.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-cmd]");
        if (!btn) return;
        e.preventDefault();
        editor.focus();
        const cmd = btn.getAttribute("data-cmd");
        const value = btn.getAttribute("data-value") || null;

        if (cmd === "createLink") {
          const url = window.prompt("Zadejte adresu odkazu:", "https://");
          if (url) document.execCommand("createLink", false, url);
          return;
        }

        if (cmd === "highlight") {
          document.execCommand("hiliteColor", false, "#ffd166");
          // fallback
          if (!document.queryCommandSupported("hiliteColor")) {
            document.execCommand("backColor", false, "#ffd166");
          }
          return;
        }

        document.execCommand(cmd, false, value);
      });

      // Prevent losing selection on toolbar mousedown
      toolbar.addEventListener("mousedown", (e) => {
        if (e.target.closest("button")) e.preventDefault();
      });
    },

    getHtml(root) {
      return root.querySelector(".rte__editor")?.innerHTML || "";
    },

    setHtml(root, html) {
      const editor = root.querySelector(".rte__editor");
      if (editor) editor.innerHTML = html || "";
    },
  };
})();
