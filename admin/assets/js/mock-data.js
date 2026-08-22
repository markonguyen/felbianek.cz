/* Mock data for Felbiánek admin UI prototype */
window.AdminMock = {
  currentRole: localStorage.getItem("felbianek_admin_role") || "admin",

  setRole(role) {
    this.currentRole = role;
    localStorage.setItem("felbianek_admin_role", role);
  },

  users: [
    {
      id: "u1",
      name: "Jana Nováková",
      email: "jana@felbianek.cz",
      role: "admin",
      active: true,
    },
    {
      id: "u2",
      name: "Petr Svoboda",
      email: "petr@felbianek.cz",
      role: "editor",
      active: true,
    },
    {
      id: "u3",
      name: "Marie Dvořáková",
      email: "marie@felbianek.cz",
      role: "editor",
      active: false,
    },
  ],

  getCurrentUser() {
    return this.currentRole === "admin" ? this.users[0] : this.users[1];
  },

  news: [
    {
      id: "n1",
      title:
        "Zápis k docházce do Lesní mateřské školy Felbiánek pro školní rok 2026/2027",
      badge: "Zápis",
      bodyHtml:
        "<p>Zveme rodiče na <strong>zápis</strong> do LMŠ Felbiánek. Přijďte se podívat do zázemí na Felbabce.</p><p>S sebou stačí občanský průkaz a chuť poznat lesní školku.</p>",
      publishedAt: "2026-04-09",
      status: "published",
      coverImage: "../assets/img/placeholder-cover.svg",
      attachments: [{ name: "Informace_k_zapisu.pdf", size: "240 KB" }],
      authorId: "u1",
      deletedAt: null,
    },
    {
      id: "n2",
      title: "Jarní brigáda v zázemí školky",
      badge: "Akce",
      bodyHtml:
        "<p>Přijďte nám pomoci s úpravou zahrady. <mark>Svačina zajištěna</mark>.</p>",
      publishedAt: "2026-03-20",
      status: "draft",
      coverImage: null,
      attachments: [],
      authorId: "u2",
      deletedAt: null,
    },
    {
      id: "n3",
      title: "Výroční zpráva spolku 2025",
      badge: "Dokument",
      bodyHtml: "<p>Ke stažení je výroční zpráva za uplynulý rok.</p>",
      publishedAt: "2026-02-01",
      status: "published",
      coverImage: null,
      attachments: [{ name: "Vyrocni_zprava_2025.pdf", size: "1.2 MB" }],
      authorId: "u1",
      deletedAt: null,
    },
    {
      id: "n4",
      title: "Starý příspěvek o táborech",
      badge: "Tábory",
      bodyHtml: "<p>Tento příspěvek byl přesunut do koše.</p>",
      publishedAt: "2025-06-01",
      status: "draft",
      coverImage: null,
      attachments: [],
      authorId: "u2",
      deletedAt: "2026-04-01",
    },
  ],

  pages: [
    {
      id: "p1",
      slug: "domu",
      title: "Domů – úvodní text",
      blocks: [
        {
          id: "b1",
          label: "Úvodní odstavec",
          content:
            "Cílem spolku Felbiánek je podněcovat u dětí používání zdravého selského rozumu, rozvíjet jejich osobní zodpovědnost vůči životnímu prostředí a podporovat spotřebitelsky spravedlivé chování.",
        },
      ],
      seoTitle: "Domů | Felbiánek",
      seoDescription:
        "Lesní mateřská škola Felbiánek Felbabka – lesní pedagogika, příroda a radost z objevování.",
    },
    {
      id: "p2",
      slug: "o-nas",
      title: "O nás",
      blocks: [
        {
          id: "b1",
          label: "Hlavní text",
          content:
            "Spolek Felbiánek sdružuje zastánce lesní pedagogiky, úcty k přírodě a zdravého životního stylu.",
        },
      ],
      seoTitle: "O nás | Felbiánek",
      seoDescription: "Kdo jsme a čemu věříme v Lesní mateřské škole Felbiánek.",
    },
    {
      id: "p3",
      slug: "skolka",
      title: "Školka",
      blocks: [
        {
          id: "b1",
          label: "Popis školky",
          content:
            "Lesní mateřská škola Felbiánek nabízí dětem každodenní kontakt s přírodou na Felbabce.",
        },
      ],
      seoTitle: "Školka | Felbiánek",
      seoDescription: "Informace o Lesní mateřské škole Felbiánek.",
    },
    {
      id: "p4",
      slug: "kontakt",
      title: "Kontakt",
      blocks: [
        {
          id: "b1",
          label: "Kontaktní text",
          content:
            "Napište nám e-mail nebo zavolejte. Rádi odpovíme na dotazy k zápisu i provozu.",
        },
      ],
      seoTitle: "Kontakt | Felbiánek",
      seoDescription: "Kontaktní údaje spolku Felbiánek.",
    },
  ],

  media: [
    {
      id: "m1",
      filename: "hero-deti.jpg",
      mime: "image/jpeg",
      kind: "image",
      url: "placeholder-cover.svg",
      uploadedBy: "u1",
      createdAt: "2026-03-01",
    },
    {
      id: "m2",
      filename: "zazemi-skolky.jpg",
      mime: "image/jpeg",
      kind: "image",
      url: "placeholder-doc.svg",
      uploadedBy: "u2",
      createdAt: "2026-03-10",
    },
    {
      id: "m3",
      filename: "Stanovy_spolku.pdf",
      mime: "application/pdf",
      kind: "document",
      url: null,
      uploadedBy: "u1",
      createdAt: "2026-01-15",
    },
    {
      id: "m4",
      filename: "Informace_k_zapisu.pdf",
      mime: "application/pdf",
      kind: "document",
      url: null,
      uploadedBy: "u1",
      createdAt: "2026-04-01",
    },
  ],

  settings: {
    siteName: "Felbiánek",
    email: "info@felbianek.cz",
    phone: "+420 777 000 000",
    address: "Felbabka, okres Beroun",
  },

  formatDate(iso) {
    if (!iso) return "—";
    const [y, m, d] = iso.split("-");
    return `${Number(d)}. ${Number(m)}. ${y}`;
  },

  statusLabel(status) {
    return status === "published" ? "Zveřejněno" : "Koncept";
  },

  activeNews() {
    return this.news.filter((n) => !n.deletedAt);
  },

  trashedNews() {
    return this.news.filter((n) => n.deletedAt);
  },
};
