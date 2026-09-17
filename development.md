# Development Guide: MY_PORTFOLIO_SITE

Welcome to the development documentation for this portfolio application. This document details the folder structure, where to make specific changes, and best practices for developing and maintaining the site.

---

## 📂 Folder Structure & Architecture

This application is built with **React**, **TypeScript**, and **Vite**, utilizing **Tailwind CSS** for styling. 

```text
MY_PORTFOLIO_SITE/
├── public/                    # Static assets that don't need compilation
│   ├── images/                # Images like profile pictures and project screenshots (.webp)
│   ├── 404.html               # Custom 404 redirect for GitHub Pages
│   ├── robots.txt             # SEO crawler instructions
│   ├── sitemap.xml            # SEO sitemap for indexing
│   ├── JACK_CV_V1.pdf         # Your downloadable CV
│   └── JK_RESUME_V2.pdf       # Your downloadable resume
├── src/                       # Source code for the application
│   ├── components/            # Reusable UI components
│   │   ├── Accordion.tsx      # Accordion component used in Services and FAQ
│   │   ├── ErrorBoundary.tsx  # React error boundary for graceful error handling
│   │   └── ThemeSelector.tsx  # Multi-theme selector with 6 color themes
│   ├── main.tsx               # Entry point for React (mounts App to the DOM)
│   ├── App.tsx                # Main application component, layout, and sections
│   ├── index.css              # Global CSS styles, Tailwind imports, and theme definitions
│   ├── constants.ts           # All text content, lists, skills, and links live here
├── index.html                 # The HTML template for the whole app
├── package.json               # Defines dependencies (React, tailwind) and npm scripts
├── vite.config.ts             # Configuration for the Vite bundler
├── tsconfig.json              # TypeScript compilation rules
├── CUSTOM_IMAGES_GUIDE.md     # Comprehensive guide for replacing online images with custom ones
└── development.md             # This file - development documentation
```

### Purpose of Key Files

- **`index.html`**: Contains the root `<div>` for React, fallback `<noscript>` information for basic SEO, and comprehensive `<meta>` tags (Open Graph, Twitter Cards, Schema.org). Includes analytics placeholder.
- **`src/App.tsx`**: Contains the core logic for the single-page application. Features scroll-spy, FormSubmit email routing, multi-theme support with localStorage persistence, and section rendering (Hero, About, Projects, etc.).
- **`src/constants.ts`**: The single source of truth for text data. If you want to update text without touching React code, do it here. Now uses local image paths instead of online URLs.
- **`src/index.css`**: Configures Tailwind, `@fontsource` font imports, and comprehensive theme system with 6 color themes (Default Green, Ocean Blue, Sunset Red, Forest Green, Purple Dream, Golden Hour) plus light/dark mode variants.
- **`src/components/ErrorBoundary.tsx`**: Catches React errors gracefully and displays a user-friendly error message.
- **`src/components/ThemeSelector.tsx`**: Interactive theme picker allowing users to switch between 6 different color themes and toggle light/dark mode.

---

## 🛠️ How to Make Changes

### 1. Updating Projects, Blogs, and Skills
All structural lists pull their data directly from `src/constants.ts`.
1. Open `src/constants.ts`.
2. Add, remove, or modify items inside the `PROJECTS`, `BLOGS`, or `SKILLS` arrays.
3. Example of adding a new project:
   ```ts
   {
     title: 'NEW PROJECT NAME',
     category: 'Deep Learning',
     description: 'A brief description of what you built and the tools used.',
     image: 'images/your-new-image.webp', // Add this image to public/images/
     link: 'https://huggingface.co/your-link',
     section: 'github' // or 'huggingface'
   }
   ```

### 2. Using Custom Images
**Important:** The portfolio now uses local images instead of online URLs for better performance and customization.

**Quick Steps:**
1. Place your images in `public/images/` directory
2. Update image paths in `src/constants.ts` from URLs to local paths like `'images/my-image.webp'`
3. Run `npm run convert-images` to optimize images to WebP format

**Detailed Guide:** See [`CUSTOM_IMAGES_GUIDE.md`](./CUSTOM_IMAGES_GUIDE.md) for comprehensive instructions on:
- Image preparation and optimization
- File naming conventions
- Step-by-step replacement process
- Troubleshooting common issues

### 3. Contact Form (FormSubmit)
The contact form posts enquiries to `kimothojackson1125@gmail.com` through FormSubmit.
* The first real submission may require activating the address through the confirmation email sent by FormSubmit.
* If you prefer Formspree or a private serverless endpoint, replace the fetch URL in `src/App.tsx`; never commit API keys or SMTP credentials.

### 4. Search Engine Visibility
* Add the `google-site-verification` meta tag content from Google Search Console to `index.html`.
* Add the Bing Webmaster verification meta tag content to the same file, then submit `https://Jack-ki1.github.io/MY_PORTFOLIO_SITE/sitemap.xml` in both dashboards.
* Request indexing for `https://Jack-ki1.github.io/MY_PORTFOLIO_SITE/` after deployment. Search engines decide when to crawl; verification does not guarantee a ranking or immediate indexing.
* Analytics placeholder is included in `index.html` - uncomment and add your tracking ID when ready.

### 5. Customizing Themes
The portfolio now supports **6 different color themes** with light/dark mode variants:

**Available Themes:**
1. **Default Green** (#D4F06D) - Original lime green
2. **Ocean Blue** (#00D9FF) - Cool cyan/blue tones
3. **Sunset Red** (#FF6B6B) - Warm coral/pink tones
4. **Forest Green** (#10B981) - Natural emerald green
5. **Purple Dream** (#A855F7) - Vibrant purple
6. **Golden Hour** (#F59E0B) - Warm amber/gold

**How Users Switch Themes:**
- Click the palette icon in the navbar (replaces the old sun/moon toggle)
- Select from the dropdown menu
- Toggle between light and dark mode within the dropdown
- Preferences are saved to localStorage automatically

**Adding New Themes (Developer):**
1. Open `src/index.css`
2. Add a new theme block following the pattern:
   ```css
   .theme-yourname {
     --accent: #YOUR_COLOR;
     --bg: #BACKGROUND_COLOR;
     --card: #CARD_COLOR;
     --text: #TEXT_COLOR;
     --border-color: rgba(...);
     --muted: rgba(...);
     --semi: rgba(...);
     --nav-bg: rgba(...);
   }
   
   .light.theme-yourname {
     /* Light mode variant */
   }
   ```
3. Update `src/components/ThemeSelector.tsx` to include your new theme in the `themes` array

**Customizing Existing Themes:**
Modify the CSS variables in `src/index.css` under each theme block to adjust colors.

### 6. Resumes and CV Links
* Upload updated PDF versions to the `/public` folder with the exact names: `JACK_CV_V1.pdf` and `JK_RESUME_V2.pdf`.
* If you rename them, make sure to update the `onClick` window open handlers in `src/App.tsx` around the **About** section layout.

### 7. Error Handling
The app now includes an ErrorBoundary component that:
- Catches unhandled React errors
- Displays a user-friendly error message
- Provides a "Refresh Page" button
- Logs errors to console for debugging

To customize error handling, edit `src/components/ErrorBoundary.tsx`.

---

## 🚀 Deployment (GitHub Pages)

This project has been pre-configured to deploy seamlessly to GitHub Pages.

1. Ensure all your changes look good locally: 
   ```bash
   npm run dev
   ```
2. Build and push your code to the `master` branch.
3. GitHub Actions runs `npm ci`, builds `dist`, and deploys through GitHub Pages.

**Note:** After deployment, verify that:
- The URL is `https://Jack-ki1.github.io/MY_PORTFOLIO_SITE/` (not jack_portfolio)
- All images load correctly
- Theme switching works
- Contact form functions properly

---

## 💡 Good Practices

* **Keep `App.tsx` organized**: If it grows too large, move sections (like Contact or Hero) into `src/components/`.
* **Version Control**: Commit your changes frequently with descriptive messages.
* **SEO**: When modifying `App.tsx` and adding logic, try to ensure elements are readable for screen readers (using standard semantic HTML or accessible links).
* **Performance**: Use WebP images, lazy loading, and optimized bundle sizes.
* **Accessibility**: Test with keyboard navigation and screen readers. The app includes skip-to-content link and ARIA labels.
* **Testing**: Consider adding unit tests for components as the project grows.
* **Documentation**: Update this file when making significant changes to the architecture.

---

## 🔧 Recent Improvements

The following enhancements have been implemented:

✅ **Multi-Theme System**: 6 color themes with light/dark variants  
✅ **Error Boundary**: Graceful error handling  
✅ **Enhanced SEO**: Better meta tags, Open Graph, Schema.org  
✅ **Analytics Ready**: Placeholder for Google Analytics  
✅ **Local Images**: Replaced online URLs with local image paths  
✅ **Theme Persistence**: Saves user preferences to localStorage  
✅ **Updated Branding**: All references changed from "jack_portfolio" to "MY_PORTFOLIO_SITE"  
✅ **Improved Documentation**: Comprehensive guides for customization  

---

## 📞 Support

For questions or issues:
- Check the browser console for errors
- Review this documentation
- See `CUSTOM_IMAGES_GUIDE.md` for image-related questions
- Test locally before deploying

Happy coding! 🎨🚀
