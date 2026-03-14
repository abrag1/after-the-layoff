# How to Deploy "After the Layoff" MVP

This guide will walk you through launching this local MVP to the public internet for free, and setting up real email collection.

## 1. Set Up Email Collection (Formspree)
Currently, the "Join early list" and "Feedback" buttons just pretend to work locally. To actually receive these emails:

1. Go to [Formspree.io](https://formspree.io/) and create a free account.
2. Click **New Form** and name it "After the Layoff Waitlist".
3. Formspree will give you an **Endpoint URL** that looks like this: `https://formspree.io/f/xabcdefg`
4. Open the file `src/services/api.js` in this project.
5. Replace the mock `setTimeout` code with a simple fetch request to your new URL:

```javascript
// Example of what api.js should look like with Formspree:
export const submitEmailSignup = async (email, topic = 'general') => {
  try {
    const response = await fetch('YOUR_FORMSPREE_URL_HERE', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, topic, source: 'waitlist' })
    });
    return { success: true, message: "Thank you. You've been added to the early list." };
  } catch (error) {
    return { success: false, message: "Something went wrong. Please try again." };
  }
};
```

## 2. Put Your Code on GitHub
To deploy the site, the code needs to live on GitHub.

1. Go to [GitHub.com](https://github.com/) and create a free account.
2. Click **New Repository** (name it `after-the-layoff`). Do NOT initialize it with a README.
3. Open your computer's terminal (or PowerShell), navigate to your `after-the-layoff` folder, and run these commands exactly as shown on the GitHub setup page:
   ```bash
   git init
   git add .
   git commit -m "Initial MVP commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/after-the-layoff.git
   git push -u origin main
   ```

## 3. Deploy to Vercel (Free & Instant)
Vercel is the best place to host React/Vite apps for free.

1. Go to [Vercel.com](https://vercel.com/) and create a free account.
2. Click **Add New Project**.
3. Connect your GitHub account and select the `after-the-layoff` repository you just created.
4. Leave all the default settings as they are (Vercel automatically detects it's a Vite app).
5. Click **Deploy**.

In about 60 seconds, your site will be live! Vercel will give you a temporary URL (like `after-the-layoff.vercel.app`). 

*(Optional: You can buy a custom domain like `afterthelayoff.com` from a registrar like Namecheap and plug it directly into your Vercel project settings for free).*
