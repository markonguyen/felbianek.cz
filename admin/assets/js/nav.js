/* Shared admin shell: sidebar, role switch, mobile menu */
(function () {
  const ROLE_KEY = "felbianek_admin_role";

  function getRole() {
    return localStorage.getItem(ROLE_KEY) || "admin";
  }

  function setRole(role) {
    localStorage.setItem(ROLE_KEY, role);
    if (window.AdminMock) window.AdminMock.setRole(role);
  }

  function isNestedAppPage() {
    const path = (window.location.pathname || "").replace(/\\/g, "/");
    return /\/(novinky|stranky|media|uzivatele|nastaveni|kos)\//.test(path);
  }

  function pathPrefix() {
    return isNestedAppPage() ? "../" : "./";
  }

  function authPrefix() {
    return isNestedAppPage() ? "../../" : "../";
  }

  const NAV = [
    { id: "prehled", href: "index.html", label: "Přehled", icon: "⌂" },
    { id: "novinky", href: "novinky/index.html", label: "Novinky", icon: "✎" },
    { id: "stranky", href: "stranky/index.html", label: "Stránky", icon: "☰" },
    { id: "media", href: "media/index.html", label: "Média", icon: "▣" },
    { id: "kos", href: "kos/index.html", label: "Koš", icon: "⌫" },
    { id: "uzivatele", href: "uzivatele/index.html", label: "Uživatelé", icon: "☺", adminOnly: true },
    { id: "nastaveni", href: "nastaveni/index.html", label: "Nastavení", icon: "⚙", adminOnly: true },
  ];

  window.AdminShell = {
    init(options) {
      const active = options?.active || "prehled";
      const title = options?.title || "Admin";
      const role = getRole();
      if (window.AdminMock) window.AdminMock.currentRole = role;

      const user =
        window.AdminMock?.getCurrentUser() || {
          name: role === "admin" ? "Jana Nováková" : "Petr Svoboda",
          email: role === "admin" ? "jana@felbianek.cz" : "petr@felbianek.cz",
          role,
        };

      const prefix = pathPrefix();
      const logoutHref = authPrefix() + "login.html";

      const navHtml = NAV.filter((item) => !item.adminOnly || role === "admin")
        .map((item) => {
          const href = prefix + item.href.replace(/^\.\//, "");
          const isActive =
            active === item.id ||
            (active.startsWith("novinky") && item.id === "novinky") ||
            (active.startsWith("stranky") && item.id === "stranky");
          return `<a href="${href}" class="${isActive ? "is-active" : ""}" data-nav="${item.id}">
            <span class="nav-icon" aria-hidden="true">${item.icon}</span>${item.label}
          </a>`;
        })
        .join("");

      const shell = document.getElementById("admin-shell");
      if (!shell) return;

      const pageContent = shell.innerHTML;

      shell.outerHTML = `
        <div class="sidebar-overlay" id="sidebar-overlay" hidden></div>
        <aside class="sidebar" id="sidebar" aria-label="Hlavní navigace">
          <a class="sidebar__brand" href="${prefix}index.html">
            <span class="sidebar__brand-mark">F</span>
            Felbiánek
          </a>
          <nav class="sidebar__nav">${navHtml}</nav>
          <div class="sidebar__footer">
            <div class="sidebar__user">
              <strong>${user.name}</strong>
              <span>${user.role === "admin" ? "Administrátor" : "Editor"} · ${user.email}</span>
            </div>
            <div class="role-switch" title="Jen pro prototyp – přepnutí role">
              <button type="button" data-role="admin" class="${role === "admin" ? "is-active" : ""}">Admin</button>
              <button type="button" data-role="editor" class="${role === "editor" ? "is-active" : ""}">Editor</button>
            </div>
            <p style="margin:0.75rem 0 0"><a href="${logoutHref}">Odhlásit se</a></p>
          </div>
        </aside>
        <div class="main">
          <header class="topbar">
            <button type="button" class="topbar__menu" id="menu-toggle" aria-label="Otevřít menu">Menu</button>
            <h1 class="topbar__title">${title}</h1>
            <div class="topbar__actions" id="topbar-actions"></div>
          </header>
          <div class="content ${options?.wide ? "content--wide" : ""}" id="page-content">
            ${pageContent}
          </div>
        </div>
      `;

      // Move topbar actions if marked
      const actionsSource = document.getElementById("page-actions");
      const actionsTarget = document.getElementById("topbar-actions");
      if (actionsSource && actionsTarget) {
        actionsTarget.append(...actionsSource.childNodes);
        actionsSource.remove();
      }

      document.getElementById("menu-toggle")?.addEventListener("click", () => {
        document.body.classList.add("sidebar-open");
        const overlay = document.getElementById("sidebar-overlay");
        if (overlay) overlay.hidden = false;
      });

      document.getElementById("sidebar-overlay")?.addEventListener("click", () => {
        document.body.classList.remove("sidebar-open");
        const overlay = document.getElementById("sidebar-overlay");
        if (overlay) overlay.hidden = true;
      });

      document.querySelectorAll(".role-switch button").forEach((btn) => {
        btn.addEventListener("click", () => {
          setRole(btn.getAttribute("data-role"));
          window.location.reload();
        });
      });

      // Redirect editors away from admin-only pages
      if (role !== "admin" && (active === "uzivatele" || active === "nastaveni")) {
        window.location.href = prefix + "index.html";
      }
    },
  };
})();
