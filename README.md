# Morent — Car Rental Landing Page

Landing page для сервісу оренди автомобілів **Morent**. Реалізація макета з [Figma Community](https://www.figma.com/community) (автор — Pickolab Studio).

## Стек

- **HTML5** — семантична розмітка
- **SCSS** — модульна структура з partials, BEM-нейминг
- **Live Sass Compiler** — компіляція SCSS → CSS
- **SVG-спрайти** — оптимізована робота з іконками
- **Plus Jakarta Sans** — локальний шрифт у форматі woff2

## Структура

```
.
├── index.html
├── css/                 # скомпільований CSS
│   ├── main.css
│   └── main.min.css
├── scss/
│   ├── main.scss        # точка входу
│   ├── base/
│   │   ├── _variables.scss
│   │   ├── _fonts.scss
│   │   └── _reset.scss
│   └── blocks/
│       ├── _header.scss
│       └── _hero.scss
├── fonts/               # Plus Jakarta Sans (woff2)
└── images/
    └── sprite.svg       # SVG-спрайт іконок
```

## Запуск локально

1. Клонуй репозиторій:
   ```bash
   git clone <repo-url>
   cd morent-car-rental
   ```
2. Відкрий `index.html` через **Live Server** (порт 5500).
3. Для роботи зі стилями встанови розширення **Live Sass Compiler** у VS Code — воно автоматично компілюватиме `scss/main.scss` у `css/main.min.css` при збереженні.

## Реалізовано

- [x] Header: логотип, search bar, action-іконки, аватар
- [x] Hero: дві промо-картки (`light` / `dark`) з фоновими зображеннями і CTA-кнопками
- [ ] Pick-Up / Drop-Off форма
- [ ] Popular Car секція
- [ ] Recommendation Car
- [ ] Footer

## Особливості реалізації

- **BEM** — для іменування класів (`block__element--modifier`)
- **CSS custom properties** — для кольорової палітри (`--primary-color-blue`, `--primary--white`)
- **Стейти кнопок** — `:hover`, `:active`, `:focus-visible`, `:disabled` для доступності
- **A11y** — `aria-label` на іконкових кнопках, `:focus-visible` для клавіатурної навігації

## Дизайн

[Car Rent Website Design — Pickolab Studio (Figma Community)](https://www.figma.com/community)
