A responsive, dark-mode-ready HTML email template for my Etsy shop’s order confirmation, with a small Node.js preview generator.

| Light mode | Dark mode | Mobile |
| :---: | :---: | :---: |
| <img src="docs/email-light.png" alt="Email in light mode" width="250" /> | <img src="docs/email-dark.png" alt="Email in dark mode" width="250" /> | <img src="docs/email-mobile.png" alt="Email on a mobile screen" width="250" /> |

## Features

- Table-based, 600px layout with inline CSS for broad email client support
- Responsive: shrinks to full width on small screens (`@media`, 20px side padding)
- Dark mode through `prefers-color-scheme`, with its own color palette
- Outlook-friendly button: VML for classic Outlook, a standard button everywhere else
- Accessibility basics: `role="presentation"` on layout tables, `lang` attribute, alt text, text contrast designed for WCAG AA (4.5:1)
- `{{placeholder}}` variables, filled in by a small Node.js script with HTML escaping
- Preview generator with three test customers (short name, long name, special characters)
- Script that sends the rendered email to a real inbox over SMTP
- `colors.js` helper that lists every color used in the template, to plan the dark mode palette
