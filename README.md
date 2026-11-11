# Shubham Singh — Portfolio

Source code for **[shubham-0707.github.io](https://shubham-0707.github.io/)**, the personal site of Shubham Singh, Android engineer at PhonePe.

It has a home page (experience, skills, recognition, writing, contact) and a blog with tag filtering. Every page is pre-rendered to static HTML so search engines can index it.

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4** + **daisyUI** (custom `paper` theme)
- **Headless UI** for the mobile menu, experience rows, blog tag filter and form fields
- **react-router-dom** for routing, **react-helmet-async** for SEO tags
- **Puppeteer** for pre-rendering at build time
- **Web3Forms** for the contact form

## Design

Black ink on cream paper with a light grain texture.

- **Fonts:** Fraunces for headings, Inter Tight for body text
- **Buttons:** raised, with a solid offset shadow that presses flat on click
- **Signal orange (`#FF5A1F`):** used only for the main actions (get in touch, send message, subscribe)
- **Motion:** hover and press transitions only, switched off when the visitor prefers reduced motion

All colours are tokens in `src/styles/index.css`.

## Project structure

```
src/
  data/personalData.js   All site content: bio, roles, skills, achievements, links
  components/            One file per section and page (Hero, Journey, Skills, …)
  styles/index.css       Theme tokens, button styles, blog typography
public/
  posts.json             Blog posts (title, date, tags, excerpt, markdown content)
  img/, *.pdf            Profile photo and resume
prerender.mjs            Renders each route to static HTML after the build
.github/workflows/       Auto-deploy workflow
```

## Editing content

- **Profile, experience, skills, achievements:** edit `src/data/personalData.js`.
- **Blog posts:** add an entry to `public/posts.json`. The `content` field is markdown, and `slug` sets the URL (`/blog/<slug>`). New posts are pre-rendered automatically.
- **Resume:** replace `public/Shubham_Singh_Resume.pdf`.

## Running locally

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build + pre-render into dist/
npm run preview   # serve the built dist/
npm run lint
```

Pre-rendering uses Google Chrome from `/Applications` when it's installed. To use a different browser, set `PUPPETEER_EXECUTABLE_PATH`.

## Deployment

The site is served by GitHub Pages from a separate repo, [`shubham-0707/shubham-0707.github.io`](https://github.com/shubham-0707/shubham-0707.github.io). That repo holds only the built files. This repo holds the source.

**Automatic:** every push to `master` runs `.github/workflows/deploy.yml`. It installs dependencies, builds, pre-renders and publishes `dist/` to the Pages repo. The site updates within a few minutes, and you can follow each run in the **Actions** tab. You can also start a run by hand from there.

The workflow uses an SSH deploy key:
- the public key is a deploy key **with write access** on `shubham-0707.github.io`
- the private key is the `PAGES_DEPLOY_KEY` Actions secret in this repo

**Manual:** `npm run deploy` builds locally and pushes `dist/` with `gh-pages`.

> Deploying publishes only the built site. Commit and push your source changes here too, or they won't be saved.
