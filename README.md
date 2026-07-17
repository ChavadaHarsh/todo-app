This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## GitHub CI/CD

This repo includes a GitHub Actions workflow at `.github/workflows/ci-cd.yml`.

What it does:

- Runs `npm ci`, `npm run lint`, and `npm run build` on every pull request to `main`
- Deploys to your EC2 server on every push to `main`
- Verifies the app is reachable on the EC2 instance after deployment

Required GitHub Actions secrets:

- `EC2_HOST`: your EC2 public IP or domain
- `EC2_PORT`: SSH port, usually `22`
- `EC2_USER`: SSH user, for example `ubuntu`
- `EC2_SSH_KEY`: private SSH key used by GitHub Actions
- `APP_DIR`: absolute path to the app on the server, for example `/home/ubuntu/todo-app`
- `APP_PORT`: app port, for example `3000`

Server expectations:

- The repo is already cloned on the EC2 instance inside `APP_DIR`
- Node.js 20 and npm are installed on the server
- The server can run `npm ci` and `npm run build`
- `.env.local` is already present on the server if your app needs environment variables
- Port `3000` is either exposed or proxied through nginx

For production, using nginx in front of `next start` is recommended for safer self-hosting and better request handling.
