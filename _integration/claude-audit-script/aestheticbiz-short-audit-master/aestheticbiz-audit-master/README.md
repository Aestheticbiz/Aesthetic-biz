# AestheticBiz Short Audit Master

This is a reusable static audit page for ordinary Linux/Apache hosting such as HostGator. The hosted page needs no database, PHP, Node.js or build step.

## Files uploaded to each audit subdomain folder

- `index.html`
- `styles.css`
- `audit-data.js`
- `app.js`
- `images/` containing that practice's desktop and mobile screenshots
- The generated PDF named in `audit-data.js`

The remaining files are production helpers and do not have to be uploaded.

## Create a new audit

1. Duplicate this folder and rename it for the practice.
2. Replace `images/audited-desktop.jpg` and `images/audited-mobile.jpg`.
3. Edit only `audit-data.js`. Claude should follow `CLAUDE-AUDIT-SCRIPT.md`.
4. Open `index.html` and verify the report at desktop and mobile sizes.
5. Generate the PDF using the exact filename entered in `audit-data.js`:
   - Windows Command Prompt: `generate-pdf.bat bella-med-spa-audit.pdf`
   - Linux/macOS: `bash generate-pdf.sh bella-med-spa-audit.pdf`
6. Confirm the PDF is four A4 pages or fewer.
7. Upload the required hosted files to the practice's subdomain document root.

## Important

The browser cannot silently overwrite a PDF on shared hosting. The supplied helper creates the PDF before upload using Chrome or Edge in headless mode. The hosted "Download PDF" button then serves that generated file. The "Print / Save PDF" link remains available as a fallback.

If the Windows helper cannot find Chrome or Edge, edit `generate-pdf.bat` and set `BROWSER` to the full browser executable path.
