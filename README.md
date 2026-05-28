# Emarat CMS - Next.js + Sanity + Vercel

A modern full-stack application combining Next.js for the frontend, Sanity CMS for content management, and Vercel for deployment.

## 🚀 Features

- **Next.js 15+** with App Router for optimal performance
- **TypeScript** for type-safe development
- **Sanity CMS** for headless content management
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **Ready for Vercel** deployment with environment configuration

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn package manager
- Sanity account (free at [sanity.io](https://sanity.io))

## 🛠️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd emarat-cms
npm install
```

### 2. Create Sanity Project

If you don't have a Sanity project yet:

```bash
npm run studio
```

This will guide you through creating a new Sanity project. Follow the prompts and note your:
- Project ID
- Dataset name (usually "production")

### 3. Set Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-05-25
SANITY_API_TOKEN=your_api_token_here
```

To get your API token:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Navigate to API → Tokens
4. Create a new token with Editor permissions

## 🏃 Development

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

### Start Sanity Studio

In a separate terminal:

```bash
npm run studio
```

Sanity Studio will be available at [http://localhost:3333](http://localhost:3333)

### Build for Production

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Lint Code

```bash
npm run lint
```

## 📁 Project Structure

```
emarat-cms/
├── src/
│   ├── app/              # Next.js app routes
│   ├── components/       # Reusable React components
│   ├── lib/
│   │   └── sanity.client.ts  # Sanity client configuration
│   └── styles/           # Global styles
├── sanity/
│   ├── schemaTypes/      # Sanity schema definitions
│   │   ├── postType.ts      # Blog post schema
│   │   ├── authorType.ts    # Author schema
│   │   └── blockContentType.ts  # Portable Text blocks
│   └── desk/             # Desk configuration
├── public/               # Static assets
├── sanity.config.ts      # Sanity studio configuration
├── next.config.ts        # Next.js configuration
├── vercel.json           # Vercel deployment config
└── .env.local            # Environment variables (create from .env.local.example)
```

## 🗄️ Schema Overview

### Post Type
- Title (required)
- Slug (auto-generated from title)
- Author (reference to Author type)
- Main Image
- Published Date
- Body (Portable Text with formatting options)

### Author Type
- Name (required)
- Slug
- Image
- Bio

### Block Content
Reusable Portable Text blocks with:
- Headings (H1-H4)
- Lists
- Bold, italic, code formatting
- Links

## 🔗 API Routes

The project includes GROQ query functions in `src/lib/sanity.client.ts`:

- `getAllPosts()` - Fetch all posts
- `getPostBySlug(slug)` - Fetch a specific post
- `getAllAuthors()` - Fetch all authors

## 🚀 Deploying to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/emarat-cms.git
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Vercel will auto-detect Next.js settings
6. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`

### 3. Deploy

Click "Deploy" and wait for deployment to complete. Your site will be live at a Vercel URL.

## 🔐 Security Best Practices

- **API Tokens**: Never commit `.env.local` to git (it's in `.gitignore`)
- **CORS Configuration**: Configure CORS in Sanity if querying from different domains
- **Published vs Draft**: Use appropriate query filters for draft content
- **Rate Limiting**: Consider implementing rate limiting for API routes

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
npm run dev -- -p 3001
```

### Sanity Connection Issues

- Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that your Sanity project exists
- Ensure API token has proper permissions

### Build Errors

Clear cache and reinstall:

```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions:
- Check the [Next.js docs](https://nextjs.org/docs)
- Visit [Sanity community](https://www.sanity.io/community)
- Report issues on GitHub

---

Happy coding! 🎉
