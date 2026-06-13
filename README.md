# ✦ TaskFlow — To-Do App

A clean, dark-themed to-do app built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies.

---

## 📁 File Structure

```
taskflow/
├── index.html   # App structure and markup
├── style.css    # Dark theme styling and animations
├── script.js    # App logic and localStorage
└── README.md    # You are here
```

---

## ✨ Features

- **Add tasks** — Type and press Enter or click Add
- **Complete tasks** — Click the circle to mark done/pending
- **Edit tasks** — Click Edit, change text, click Save
- **Delete tasks** — Click ✕ to remove a task
- **Filter tasks** — View All, Pending, or Done tasks
- **Clear done** — Remove all completed tasks at once
- **Live counter** — Pending task count updates in real time
- **Persistent storage** — Tasks saved in browser via localStorage
- **Empty state** — Friendly message when no tasks exist
- **Shake on empty** — Input shakes instead of showing an alert
- **Animations** — Smooth entrance and exit for each task

---

## 🚀 How to Run

No build step needed. Just open the file:

```
index.html  →  Open in any browser
```

Or use VS Code Live Server for auto-reload during development.

---

## 🛠️ Tech Stack

| Layer      | Tech                        |
|------------|-----------------------------|
| Markup     | HTML5 (semantic tags)       |
| Styling    | CSS3 (variables, animations)|
| Logic      | Vanilla JavaScript (ES6+)   |
| Storage    | localStorage API            |
| Fonts      | Google Fonts (Inter + Syne) |

---

## 🎨 Design Tokens

| Token      | Value     | Usage              |
|------------|-----------|--------------------|
| `--bg`     | `#0d1117` | Page background    |
| `--surface`| `#161b22` | Card background    |
| `--accent` | `#00e5a0` | Buttons, highlights|
| `--danger` | `#ff4d6a` | Delete button      |
| `--text-1` | `#e6edf3` | Primary text       |
| `--text-2` | `#8b949e` | Secondary text     |

To change the theme, edit these variables at the top of `style.css`.

---

## ♿ Accessibility

- `aria-label` on icon-only buttons
- Keyboard navigation supported (Enter to add, Tab to navigate)
- `prefers-reduced-motion` respected — animations disabled for users who prefer it

---

## 🔮 Possible Improvements

- Drag to reorder tasks
- Due dates and reminders
- Multiple lists / categories
- Cloud sync (Firebase or Supabase)
- PWA support (installable on mobile)

---

## 📄 License

Free to use for personal and educational projects.