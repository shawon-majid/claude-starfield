# Starfield

A look for the Claude desktop and mobile apps. It gives the app a dark navy color theme and draws a night sky behind the conversation, with about 220 stars that twinkle slowly. The stars stop moving if your system is set to reduce motion.

The terminal and editor extensions do not draw looks, so nothing changes there. Permission prompts keep the app's standard look.

## Install

At the prompt of a terminal session:

```
/plugin install starfield --marketplace shawon-majid/claude-starfield
```

Answer `y` to add the marketplace, then choose a scope. The user scope applies the look to every session.

From a shell:

```
claude plugin install starfield --marketplace shawon-majid/claude-starfield
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `shawon-majid/claude-starfield`, then Add plugin.

## Remove

```
claude plugin uninstall starfield
```

## Change the look

The colors and the star count are in `hooks/register.tsx`. `hooks/make-colors.js` builds the full color theme from the few colors named there.
