import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

const { theme, problems } = makeColors({
  label: 'Starfield',
  only: 'dark',
  roles: { accent: '#9ec1ff', danger: '#e0625c', success: '#5fbf8f', warning: '#d9a441', pro: '#b6a2ff' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#070b18',
        'surface-1': '#0c1222',
        'surface-2': '#111a2e',
        'surface-3': '#151f36',
        'text-primary': '#e8edfa',
        'text-secondary': '#c3cde6',
        'text-muted': '#97a4c4',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'starfield', glass: { blur: 4, tint: '#070b18', opacity: 0.45 } },
}

function buildScene(): string {
  let seed = 20261115
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  const tints = ['#ffffff', '#ffffff', '#dfe8ff', '#fff3dc']
  let stars = ''

  for (let i = 0; i < 220; i++) {
    const x = (rand() * 1600).toFixed(1)
    const y = (rand() * 1000).toFixed(1)
    const big = rand() < 0.12
    const r = (big ? 1.4 + rand() * 0.9 : 0.5 + rand() * 0.7).toFixed(2)
    const fill = tints[Math.floor(rand() * tints.length)]
    const dur = (3 + rand() * 5).toFixed(1)
    const delay = (rand() * 6).toFixed(1)
    stars += `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" style="animation:tw ${dur}s ${delay}s ease-in-out infinite"/>`
  }

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">' +
    '<style>@keyframes tw{0%,100%{opacity:.25}50%{opacity:1}}' +
    '@media (prefers-reduced-motion: reduce){circle{animation:none!important;opacity:.7}}</style>' +
    '<defs><radialGradient id="sky" cx="50%" cy="0%" r="110%">' +
    '<stop offset="0" stop-color="#101a3a"/><stop offset="1" stop-color="#070b18"/></radialGradient></defs>' +
    '<rect width="1600" height="1000" fill="url(#sky)"/>' +
    stars +
    '</svg>'
  )
}

const SCENE = buildScene()

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    await $.theme.set(LOOK)

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    if (e.props.scene !== 'starfield') {
      return next(e)
    }

    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="A night sky with slowly twinkling stars" />
  })
}
