# NovaMind — AI Agent Agency Website

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

## ☁️ Deploy to Cloudflare Pages

### Method A: Connect GitHub (Recommended — Auto-deploy on every push)

1. Push this project to a GitHub repository
2. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create**
3. Select **Pages** → **Connect to Git**
4. Select your GitHub repo
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version (Environment variable):** Add `NODE_VERSION` = `18`
6. Click **Save and Deploy**
7. Done! Your site is live at `https://your-project.pages.dev`

### Method B: Direct Upload (No GitHub needed)

```bash
# 1. Build the project
npm run build

# 2. Install Wrangler CLI
npm install -g wrangler

# 3. Login to Cloudflare
wrangler login

# 4. Deploy the dist folder
wrangler pages deploy dist --project-name=novamind
```

## 🌐 Connect Your Custom Domain

1. In Cloudflare Dashboard → **Workers & Pages** → your project
2. Go to **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain (e.g. `novamind.agency`)
5. Cloudflare will auto-configure DNS since your domain is already on Cloudflare
6. SSL certificate is automatic — done!

## 📧 Set Up Contact Form Backend

The contact form needs a backend to receive submissions. Easy options:

### Option 1: Formspree (Easiest)
1. Sign up at https://formspree.io (free tier: 50 submissions/month)
2. Create a form, get your endpoint URL
3. In `src/App.jsx`, update the `handleSubmit` function:
```javascript
const handleSubmit = async () => {
  const res = await fetch("https://formspree.io/f/YOUR_ID", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (res.ok) setSent(true);
};
```

### Option 2: Resend (For email delivery)
1. Sign up at https://resend.com
2. Use their API to send form data to your email

### Option 3: Google Sheets (Free, visual)
Use a Google Apps Script to receive form submissions into a spreadsheet.

## 📁 Project Structure

```
novamind-deploy/
├── index.html          # HTML entry point + SEO meta tags
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite build configuration
├── .gitignore
├── README.md
└── src/
    ├── main.jsx        # React entry point
    └── App.jsx         # Main website component
```

## ✏️ Customization Checklist

- [ ] Replace "NovaMind" with your brand name
- [ ] Update contact email (`hello@novamind.agency`)
- [ ] Add real WhatsApp number link
- [ ] Add real LinkedIn & X profile URLs
- [ ] Update pricing to match your actual rates
- [ ] Replace testimonials with real client quotes
- [ ] Add your actual logo/favicon
- [ ] Update meta tags in `index.html` for SEO
- [ ] Set up form backend (see above)
- [ ] Add Google Analytics or Plausible for tracking
