Deployment steps for CloudPanel / Apache static hosting

1) Build the frontend

```bash
cd revoapps-frontend
npm install
npm run build
```

2) Upload files to the site document root (CloudPanel `htdocs`)
- Copy everything inside `revoapps-frontend/build/` into the server `htdocs` directory.
- Ensure `index.html`, `static/`, and (if present) `admin/` are present at the site root.

3) Ensure the `.htaccess` file is present at the site root
- The repo includes `public/.htaccess`, which will be copied into `build/.htaccess` during `npm run build`.
- This file configures SPA fallbacks so client routes like `/login` and `/admin/login` load `index.html`.

4) Configure SSL and DNS
- Point the DNS A record (or CNAME) for `c` or `c.cimprints.com` to the server IP shown in CloudPanel (e.g., 91.108.120.175).
- In CloudPanel, enable/verify SSL (Let's Encrypt) for the domain.

5) Optional Nginx config (if CloudPanel uses Nginx instead of Apache)

Add or update the server `location /` block:

```
location / {
  try_files $uri $uri/ /index.html;
}

location /admin/ {
  try_files $uri $uri/ /admin/index.html;
}
```

6) Verify

```bash
curl -I https://c.cimprints.com/index.html
curl -I https://c.cimprints.com/login
curl -I https://c.cimprints.com/admin/login
```

All three should return HTTP 200 and `Content-Type: text/html`.
