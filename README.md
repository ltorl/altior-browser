![animation](https://raw.githubusercontent.com/ltorl/readme-images/refs/heads/main/altior-browser.svg)

<h1> Altior Browser </h1>
<h2> A simplistic proxy browser </h2>

A super simple self-hosted web proxy with a full tabbed-browser interface, using
The [Scramjet](https://github.com/MercuryWorkshop/scramjet) or
[Ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet) Proxy. It serves a single-page
"browser" UI that renders proxied sites in real tabs, complete with bookmarks, search suggestions, and a games sidebar.

<br>

## Demo
### [https://altior-browser.vercel.app](https://altior-browser.vercel.app)
### [https://altior-browser.onrender.com](https://altior-browser.onrender.com)
### [https://altior-browser.up.railway.app](https://altior-browser.up.railway.app) 

Most will down because of limits unless it is toward the start of the month. If you want to host this on a real domain, create a pull request to add the link.

#### If all these are down you can demo with `Code -> Codespaces -> Create Codespace on main`. You may have to wait ~2 mins for the Codespace to set up. 

<br>

## Features

- **Tabbed browsing** — open, close, pin, reorder (drag), and duplicate tabs.
  Each tab is its own isolated proxy frame.
- **Switchable proxy engine** — Scramjet (default) or Ultraviolet, chosen from the
  settings page. Sites that break under one often work under the other.
- **Search suggestions** — live Google autocomplete in both the omnibox and the
  new-tab page, fetched same-origin through the proxy.
- **Bookmarks bar** — add, edit, and organize bookmarks into folders.
- **Games sidebar** — a one-click panel (icon to the right of the URL bar) with a
  curated list of game sites.
- **Settings page** — `altior://settings`, opened with the gear icon to the right
  of the games icon. Choose a browser theme, pick the proxy engine, check whether
  it started cleanly, and manage the sites allowed to open new windows.
- **Browser themes** — choose Graphite, Ocean, Forest, or Violet in Settings.
  Your choice is saved on this device and applies to the browser interface.
- **Proxied favicons** — site icons load through the proxy so they aren't blocked
  by the page's cross-origin isolation policy.
- **Collapsible chrome** — hide the whole toolbar/tab strip for a fullscreen view.
  <h3>v1.1 updates by ItsNotme5218</h3>
- **Themes** — 3 new themes on top of the classic one.
- **Update Games** — added new links and a custom scroll bar

<br>

## Blocked? Not a problem. (chromebooks only)

### Webview Oobee steps (Out of box enviroment expolit)

1. Press **↻ + ⏻** at the same time
2. Press **Ctrl + Shift + Alt + r** to powerwash chromebook (BACKUP ANY IMPORTANT FILES OR PHOTOS BEFORE POWERWASH)
3. After powerwash, do the steps until it says "Enterprise Enrollment"
4. Turn wifi off in "Enterprise Enrollment"
5. Click **Use as a personal device**
6. In the email area **type in "google@d11.org"**
7. Click **More sign-in options**
8. Click **Sign-in with github**
9. Scroll down to the very bottom and click on **docs**
10. then scroll down again and click **ask the github community** 
11. Go to search bar and type in **altior-browser**
12. Click on first repo (should be this one)
13. Click on the link on the side or under demo

<br>

## Run Localy

### Requirements

- **[Node.js](https://nodejs.org/en/download/current)** (22) 
- **[pnpm](https://pnpm.io/)** (10)

<br>

```bash
git clone https://github.com/ltorl/altior-browser.git && cd altior-browser
```

```bash
pnpm install --dangerously-allow-all-builds
```

```bash
pnpm start
```
<br>

### Restart Later:

```bash
cd altior-browser && pnpm start
```

<br>
<br>

### Omniline
```bash
git clone https://github.com/ltorl/altior-browser.git && cd altior-browser && pnpm install --dangerously-allow-all-builds && pnpm start & open http://localhost:8080
```

<br>

## Server Deployments:

| Service | Button |
| :--- | :--- |
| **Render** | [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/web/new?repo=https%3A%2F%2Fgithub.com%2Fltorl%2Faltior-browser) |
| **Railway** | [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/ltorl/altior-browser) |
| **Replit** | [![Run on Replit](https://replit.com/badge/github/ltorl/altior-browser)](https://replit.com/github/ltorl/altior-browser) |
| **Glitch** | [![Remix on Glitch](https://raw.githubusercontent.com/BinBashBanana/deploy-buttons/refs/heads/main/buttons/remade/glitch.svg)](https://glitch.com/edit/#!/import/github/ltorl/altior-browser) |

<br>

## Dependencies used:

- [@mercuryworkshop](https://github.com/MercuryWorkshop)/[scramjet](https://github.com/MercuryWorkshop/scramjet)
- [@mercuryworkshop](https://github.com/MercuryWorkshop)/[bare-mux](https://github.com/MercuryWorkshop/bare-mux)
- [@mercuryworkshop](https://github.com/MercuryWorkshop)/[libcurl-transport](https://github.com/MercuryWorkshop/libcurl-transport)
- [@mercuryworkshop](https://github.com/MercuryWorkshop)/[wisp-js](https://github.com/MercuryWorkshop/wisp-js)
- [@titaniumnetwork-dev](https://github.com/titaniumnetwork-dev)/[ultraviolet](https://github.com/titaniumnetwork-dev/ultraviolet)

<br>
<br>

## SEO:

<h1>Proxy Browser</h1>
<h1>Proxy Unblocker</h1>
<h1>Website Unblocker</h1>


## Install from npm

Altior can also be installed as a globally available command:

```bash
npm install -g @itsnotme5218/altior-browser
altior-browser
```

Requires Node.js 22 or newer. The server listens on port 8080 by default; set the `PORT` environment variable to change it. This package runs the complete server and browser interface. A CDN such as jsDelivr can distribute static files, but it cannot run the proxy server or its WebSocket backend.
