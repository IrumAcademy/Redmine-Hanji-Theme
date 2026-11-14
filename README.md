# Hanji Redmine Theme

**English** | [한국어](README.ko.md)

A theme for [Redmine](https://www.redmine.org/) 6, named after hanji, traditional Korean paper.
It uses an ivory hanji page with faint mulberry fibers and uneven density, warm white cards with thin beige lines, ink-colored text and one deep teal accent.
Apart from the paper texture there is no decoration such as gradients or transparency; the goal is comfortable reading. It has light and dark modes.

## Screenshots

**Issue list — light mode**

![Issue list, light mode](screenshots/issues-light.png)

| **Issue — dark mode** | **Kanban (Issues Panel)** |
|---|---|
| ![Issue, dark mode](screenshots/issue-dark.png) | ![Kanban](screenshots/panel-light.png) |
| **Calendar** | **Wiki — dark mode** |
| ![Calendar](screenshots/calendar-light.png) | ![Wiki, dark mode](screenshots/wiki-dark.png) |
| **My page** | **Sign in** |
| ![My page](screenshots/my-light.png) | ![Sign in](screenshots/login-light.png) |
| **Phone — issue list, issue, menu** | |
| <img src="screenshots/issues-m-light.png" width="170" alt="Phone issue list"> <img src="screenshots/issue-m-dark.png" width="170" alt="Phone issue view"> <img src="screenshots/flyout-m-light.png" width="170" alt="Phone menu"> | |

The screenshots use a Korean interface. The projects, names and issues in them are fictional.

## Features

- **Hanji texture.** The page shows mulberry fibers and uneven paper density; the content card has a fainter grain. It is drawn with inline SVG in the stylesheet, with no image files.
- **A page of paper.** One content card sits on the page, and the sidebar sits on the left without a frame.
- **Underlined tabs.** The project menu is a single row of tabs; only the selected one gets a teal underline.
- **One accent color.** Primary buttons, selection, progress bars and links all use one teal (`#0F766E`).
- **Light and dark.** The theme follows the operating system at first. The sun/moon button at the top right switches it, and the choice is saved in the browser. Dark mode is a warm charcoal.
- **Phones.** The issue list turns into cards and form fields get bigger. Inputs use 16px text, so iPhones don't zoom in on them.
- **Plugins.** Issues Panel (kanban), Checklists (redmineup) and the web notifications bell follow the theme colors.
- **Lightweight.** No external fonts or images. It is one stylesheet and one short script that adds the sun/moon button. Printed pages come out on a white background.

## Install

From your Redmine directory, clone the theme as `themes/hanji`:

```bash
cd /path/to/redmine
git clone https://github.com/IrumAcademy/Redmine-Hanji-Theme.git themes/hanji
```

1. Restart Redmine. Redmine 6 and 7 rebuild theme assets at startup.
2. In **Administration → Settings → Display → Theme**, pick **Hanji** and save.

To update, run `git -C themes/hanji pull` and restart Redmine.

### Docker (official `redmine` image)

```yaml
services:
  redmine:
    image: redmine:6.0
    volumes:
      - ./themes/hanji:/usr/src/redmine/themes/hanji:ro
```

Recreate the container with `docker compose up -d`, then pick the theme as above.
After you change theme files, restart with `docker compose restart redmine` to apply them.

## Changing the colors

Edit the two token blocks at the top of `stylesheets/application.css`. `:root` is light mode and `html.hanji-dark` is dark mode.

| Token | Used for |
|---|---|
| `--hj-accent`, `--hj-accent-hover` | Primary buttons, selected tab underline, progress bars |
| `--hj-accent-text` | Links and icons |
| `--hj-accent-soft`, `--hj-accent-softer`, `--hj-accent-ring` | Selection backgrounds, row hover, input focus ring |
| `--hj-bg`, `--hj-card`, `--hj-card-border` | Page, content card, card border |

## Compatibility

- Checked on Redmine 6.0.11 and 7.0.3: issue list, issue view and new issue, kanban, calendar, Gantt, roadmap, wiki, projects, My page, admin settings and sign-in. Each was checked on desktop and phone (390px) in light and dark mode.
- Current Chrome, Edge, Safari and Firefox.
- On phones, the "assignee" and "updated" labels on issue cards only appear in the Korean interface.
- Pages from other plugins may still show some default colors. Please open an issue if you find one.

## Installing with an AI assistant

Copy the prompt below into an AI coding assistant (Claude Code, Codex and so on) that can run commands on your Redmine server.

```text
Install the "Hanji Redmine Theme" on this server's Redmine.

Repository: https://github.com/IrumAcademy/Redmine-Hanji-Theme

Steps:
1. Find out how Redmine is installed: directly (a Redmine folder with a themes/ directory) or with Docker
   (the official redmine image and a docker-compose.yml). If unsure, ask me. Check that it is Redmine 6 or 7.
2. Clone the repository as themes/hanji. For Docker, clone it next to the compose file and add the mount
   ./themes/hanji:/usr/src/redmine/themes/hanji:ro to the redmine service.
   Back up the compose file before you edit it.
3. Read stylesheets/application.css and javascripts/theme.js and check that they make no external network requests.
   (The hanji texture is an inline data: SVG in the CSS, not a request.)
4. Restart Redmine (for Docker: docker compose up -d <redmine service>). Leave other services alone.
5. Check the logs for asset errors.
6. Tell me to pick "Hanji" in Administration → Settings → Display → Theme, and how to undo it
   (set the theme back, then remove the mount and the folder).
```

## License

[MIT](LICENSE) © 2026 IrumAcademy
