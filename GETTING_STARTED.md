# 🚀 Next Steps for Your Emarat CMS Project

Your **Next.js + Sanity + Vercel** project is ready! Here's how to get started:

## 1. Set Up Sanity Project

```bash
cd emarat-cms
npm run studio
```

Follow the prompts to create a new Sanity project or connect to an existing one. You'll get:
- **Project ID**
- **Dataset name** (usually "production")

## 2. Configure Environment Variables

Create `.env.local` file:

```bash
cp .env.local.example .env.local
```

Fill in the variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-25
SANITY_API_TOKEN=your_token_here
```

Get your API token from: https://sanity.io/manage → Your Project → API → Tokens

## 3. Start Development

Terminal 1 - Next.js App:
```bash
npm run dev
```
Open: http://localhost:3000

Terminal 2 - Sanity Studio:
```bash
npm run studio
```
Open: http://localhost:3333

## 4. Create Your First Content

1. Go to Sanity Studio (http://localhost:3333)
2. Create a new **Author**
3. Create a new **Post** (link it to the author)
4. Your post will appear on the homepage!

## 5. Deploy to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/emarat-cms.git
git push -u origin main
```

2. Go to https://vercel.com
3. Import your repository
4. Add environment variables (same as `.env.local`)
5. Deploy!

## 📚 Key Files

- **[README.md](README.md)** - Full documentation
- **[sanity.config.ts](sanity.config.ts)** - Sanity configuration
- **[sanity/](sanity/)** - Schema definitions (Post, Author, BlockContent)
- **[src/lib/sanity.client.ts](src/lib/sanity.client.ts)** - Sanity queries
- **[src/app/page.tsx](src/app/page.tsx)** - Homepage that fetches posts
- **[vercel.json](vercel.json)** - Vercel deployment config

## 💡 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Visit [Sanity Docs](https://www.sanity.io/docs)
- Check [Next.js Docs](https://nextjs.org/docs)
- See [Vercel Docs](https://vercel.com/docs)

---

**Happy coding! 🎉**
