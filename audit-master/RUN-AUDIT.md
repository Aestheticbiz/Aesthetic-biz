# Running one audit

Everything for one practice lives in one folder. Nothing depends on the Next.js
site, a database or a build step — the audit is four static files plus images.

## 1. Start the folder

```bash
node audit-master/new-audit.mjs bella-med-spa
```

Creates `audits-short/bella-med-spa/`.

## 2. Review the site and write the data

Follow `audit-master/CLAUDE-AUDIT-SCRIPT.md`. It is the instruction set for the
review: exactly three leaks, one genuine strength, evidence quoted from pages
actually opened, no scores, no revenue estimates.

Edit **only** `audit-data.js`. Fill in the `outreach` block too — that is what
the email is built from:

| Field | What it is |
|---|---|
| `outreach.firstName` | Who the email greets |
| `outreach.toEmail` | Where it goes |
| `outreach.auditUrl` | The live report URL once uploaded |
| `outreach.subject` | Subject line |
| `report.pdfFile` | Filename for the PDF, e.g. `bella-med-spa-audit.pdf` |

## 3. Replace the screenshots

`images/audited-desktop.jpg` at 1366×768 and `images/audited-mobile.jpg` at
390×844, both of the practice being audited.

## 4. Build

```bash
cd audits-short/bella-med-spa
node build.mjs
```

Produces the PDF (and checks it is four pages or fewer), plus `email.html` and
`email.txt`. It warns if any sample value from the template is still in place.

## 5. Read both before sending

Open `index.html` and `email.html`. The email reveals **one** leak on purpose —
the report is what shows the other two. If the email gives away all three, there
is no reason to click.

## 6. Upload

To the practice's subdomain document root:

```
index.html  styles.css  app.js  audit-data.js  images/  <the PDF>
```

`build.mjs`, `README.md`, `CLAUDE-AUDIT-SCRIPT.md` and this file stay local.

## 7. Send

Paste from `email.html` (or `email.txt` for plain text). Then set
`outreach.auditUrl` if it changed and re-run `build.mjs` so the two never drift.

---

## If the PDF does not appear

Headless printing is unreliable while a normal Edge or Chrome window is open —
the launch can attach to the running browser and ignore the print request.
`build.mjs` works around it with a private profile, a wait, and up to three
attempts. If all three fail, close your browser windows and run it again, or
open `index.html` and use the **Print / Save PDF** button.

## Note on the older audit system

`scripts/render-audit.mjs` and the `audits/` folder are the previous, longer
report format. This short three-leak format supersedes it for outreach. The old
generator still exists and still works; nothing has been deleted.
