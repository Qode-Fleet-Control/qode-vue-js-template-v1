# Vue (JavaScript) template

Provisioned from [`Qode-Fleet-Control/fleet-template-v1`](https://github.com/Qode-Fleet-Control/fleet-template-v1) — the fleet
lifecycle contract (`bin/`, `fleet.conf`, deploy workflows, `compose.yaml`) with a Vue 3 single-page app in plain JavaScript (Vue Router, Pinia, ESLint + Oxlint), built with Vite laid on top.

Listens on `0.0.0.0:$PORT` (default `3000`) and serves at the root (`/`) of its own hostname
(`https://<hash>.<FLEET_APP_DOMAIN>/`); the health check hits `/`. In the container: the static build (`dist/`) behind nginx.

## Origin

    npx create-vue@latest --router --pinia --eslint qode-vue-js-template-v1

Generated 2026-10-05 with create-vue 3.24.0 (host Node v22.12.0 / npm 10.9.0).

## Run it

### On the fleet

The fleet clones the repo, injects `PORT` (and the workspace's `DATABASE_URL`, `REDIS_URL`, ...) and runs
`bin/run`, which uses the docker runtime from `fleet.conf`: `docker compose build`, then `docker compose up --remove-orphans` in the foreground.

### With docker

    PORT=3000 bin/run                  # what the fleet does
    docker compose up --build        # or plain compose

### Without docker

`FLEET_RUNTIME=process bin/run` runs the plain commands from `fleet.conf`:

| step | command |
|---|---|
| install | `npm install` |
| build | `npm run build` |
| start | `npx vite preview --host 0.0.0.0 --port $PORT` |

    ./bin/run       # install, build, start in the foreground
    ./bin/start     # start from existing build artifacts
    ./bin/restart   # rebuild and restart
    ./bin/stop      # stop whatever holds the port

See `docs/fleet-lifecycle.md` for the full contract.

## Deviations from the generator output

- No `--ts` flag, so the generator emits JavaScript (`--default` alone now produces TypeScript).
- `vite.config.js` sets `server.allowedHosts` / `preview.allowedHosts` from `FLEET_APP_HOST` (any host when unset): Vite otherwise answers the fleet hostname with "Blocked request" in `vite dev` / `vite preview`.
- `package-lock.json` added (`npm install --package-lock-only`) so the image build can use `npm ci`.
- Added the fleet files: `bin/` (lifecycle scripts), `fleet.conf`, `Dockerfile`, `compose.yaml`, `.dockerignore`, `.env.example`, `.github/workflows/`, `docs/fleet-lifecycle.md`; fleet entries (`.fleet/`, `*.log`, ...) prepended to `.gitignore`.

## Verified

Verified 2026-10-05 against the fleet's docker runtime, on docker 29.8:

- `migrate.py audit` (the coordinator's own refusal checks): **READY**.
- `verify.sh <repo> 46012` — `bin/run` in the background, probe `HEALTH_PATH`, `bin/restart`, probe again,
  `bin/stop`: `run=200 restart=200 containers_after_stop=0`. Locally the image was built with `npm ci` from the committed lockfile.

---

# qode-vue-js-template-v1

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
