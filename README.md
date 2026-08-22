# Felbianek.cz

Statický web a admin UI lesní mateřské školy Felbiánek.

## Repozitář

| Složka | Účel |
|--------|------|
| `web/` | Veřejný web – **toto se nasazuje** |
| `admin/` | Admin UI |
| `site-src/` | Zdrojové šablony pro `npm run build` |
| `scripts/build.mjs` | Build HTML ze `site-src` do `web` |

## Nasazení webu

Nahrajte **obsah** `web/` do document rootu hostingu.

## Příkazy

```bash
npm run build   # site-src → web
npm run web     # náhled webu :4173
npm run admin   # náhled adminu :5173
```
