# LeafGuard - Local Setup Guide
## Plant Disease Detection Application

---

## 📋 Prerequisites

Before starting, make sure you have:

### 1. **Node.js** (v18 or higher)
- **Download:** https://nodejs.org/
- **Verify installation:**
  ```bash
  node --version
  npm --version
  ```

### 2. **PNPM** (Package Manager - Recommended)
- **Install globally:**
  ```bash
  npm install -g pnpm
  ```
- **Verify installation:**
  ```bash
  pnpm --version
  ```

---

## 🚀 Step-by-Step Setup

### Step 1: Download the Project

1. **Download the ZIP file** or **Clone the repository**
   - If ZIP: Extract the folder to your desired location
   - If Git: 
     ```bash
     git clone <repository-url>
     ```

2. **Navigate to the project folder:**
   ```bash
   cd fusion-starter
   # or cd to your project folder name
   ```

### Step 2: Install Dependencies

In your terminal/command prompt, run:

```bash
pnpm install
```

**This will:**
- Download all required packages
- Install React, Express, TensorFlow.js, etc.
- Takes 2-5 minutes depending on internet speed

**Alternative if you use npm/yarn:**
```bash
npm install
# or
yarn install
```

### Step 3: Start the Development Server

Run the development server:

```bash
pnpm dev
```

**Output should look like:**
```
> fusion-starter@ dev
> vite

  VITE v7.1.2  ready in 314 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.x.x:8080/
```

### Step 4: Open in Browser

1. **Open your web browser**
2. **Go to:** `http://localhost:8080`
3. **You should see the LeafGuard homepage** ✅

---

## 🎯 Using the Application

### Homepage
- View features and information
- Click "Start Detection" button

### Detection Page (`/detect`)
- Click the upload area or drag-and-drop an image
- Supported formats: PNG, JPG, GIF (max 10MB)
- Click "Detect Disease" button

### Results Page (`/results`)
- View detection results
- See disease name and confidence score
- Read treatment recommendations
- View prevention tips
- Download report

---

## 🛠️ Useful Commands

### Development
```bash
# Start dev server (http://localhost:8080)
pnpm dev

# Type checking
pnpm typecheck

# Run tests
pnpm test

# Format code
pnpm format.fix
```

### Production Build
```bash
# Build for production
pnpm build

# Start production server (after building)
pnpm start
```

---

## 📁 Project Structure

```
project-folder/
├── client/                 # React frontend
│   ├── pages/
│   │   ├── Index.tsx      # Homepage
│   │   ├── Detect.tsx     # Image upload page
│   │   └── Results.tsx    # Results page
│   ├── components/
│   ├── global.css         # Styles
│   └── App.tsx            # Main app component
│
├── server/                # Node.js/Express backend
│   ├── ml/
│   │   └── plantClassifier.ts  # ML logic
│   ├── routes/
│   │   └── detect.ts      # API endpoint
│   └── index.ts           # Server setup
│
├── package.json           # Dependencies
├── tailwind.config.ts     # Styling config
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Build config
└── index.html             # HTML entry point
```

---

## 🔧 Troubleshooting

### Problem: "Port 8080 already in use"
**Solution:** The app will automatically use port 8081
```
Port 8080 is in use, trying another one...
➜  Local:   http://localhost:8081/
```
Just access `http://localhost:8081` instead.

### Problem: "Cannot find module 'multer'"
**Solution:** Reinstall dependencies
```bash
pnpm install
pnpm install multer @types/multer @tensorflow/tfjs sharp -S
```

### Problem: "EACCES: permission denied"
**Solution (Mac/Linux):** Use sudo or fix permissions
```bash
sudo pnpm install
# or
pnpm install --prefix /usr/local
```

### Problem: "Node version too old"
**Solution:** Update Node.js to v18+
```bash
# Download from https://nodejs.org/
# or use a version manager:
# For nvm (Mac/Linux):
nvm install 18
nvm use 18

# For Windows, download installer from nodejs.org
```

### Problem: App loads but detection doesn't work
**Solution:** Clear browser cache and restart
```bash
# Stop the dev server (Ctrl+C)
# Clear node_modules (optional)
rm -rf node_modules
pnpm install
pnpm dev
```

---

## 🌐 Accessing from Other Devices

### From Same WiFi Network
1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```
   Look for something like `192.168.x.x` or `10.0.x.x`

2. On another device, access:
   ```
   http://YOUR_IP:8080
   # Example: http://192.168.1.100:8080
   ```

---

## 📦 Building for Production

### Step 1: Create Production Build
```bash
pnpm build
```

This creates:
- `dist/spa/` - Frontend (React)
- `dist/server/` - Backend (Express)

### Step 2: Start Production Server
```bash
pnpm start
```

### Step 3: Deploy
The app is ready to deploy to:
- **Netlify** (frontend + serverless functions)
- **Vercel** (frontend + API routes)
- **Heroku** (full stack)
- **AWS, Google Cloud, Azure** (full stack)
- **Any Node.js hosting** (full stack)

---

## 🧪 Testing Image Detection

### Sample Test Images
The app works with any plant images. Try these:
1. **Healthy leaves** - Should show "Healthy Leaf" (LOW severity)
2. **Brown spots** - Should show "Early Blight" or "Late Blight" (HIGH severity)
3. **Yellow leaves** - Should show "Powdery Mildew" or "Rust" (MEDIUM severity)

### How to Get Sample Images
- Use your phone camera to take plant photos
- Download from:
  - Unsplash.com (search "plant disease")
  - Pexels.com (search "plant leaf")
  - PlantVillage.org (plant disease images)

---

## 💡 Tips & Best Practices

### For Development
1. **Use VS Code** with extensions:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin

2. **Keep terminal open** while developing
   - Terminal shows any errors in real-time
   - Hot reload happens automatically

3. **Edit files freely**
   - Changes save instantly
   - Browser refreshes automatically

### For Testing
1. **Use different browsers** (Chrome, Firefox, Safari)
2. **Test on mobile** using the Network IP
3. **Test with different image sizes**
4. **Check console** for errors (F12 → Console)

---

## 📚 Next Steps

### After Getting It Running
1. **Explore the code:**
   - Open `client/pages/Index.tsx` (homepage)
   - Open `server/ml/plantClassifier.ts` (ML logic)
   - Open `client/pages/Detect.tsx` (upload page)

2. **Customize:**
   - Change colors in `client/global.css`
   - Edit text in the React components
   - Modify ML thresholds in `plantClassifier.ts`

3. **Deploy:**
   - Follow deployment guides for your platform
   - Use Netlify or Vercel for easiest setup

4. **Improve:**
   - Add database (Supabase, Neon)
   - Add user authentication
   - Add upload history
   - Fine-tune ML model

---

## 🆘 Getting Help

### Common Resources
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Express Docs:** https://expressjs.com
- **TensorFlow.js Docs:** https://www.tensorflow.org/js

### Check the Code Documentation
- **ML_IMPLEMENTATION_REPORT.md** - Detailed ML explanation
- **AGENTS.md** - Project architecture
- **Code comments** - In each file

---

## ✅ Checklist

After setup, verify:
- [ ] Node.js installed (v18+)
- [ ] PNPM installed
- [ ] Dependencies installed (`pnpm install`)
- [ ] Dev server running (`pnpm dev`)
- [ ] Browser opens to `http://localhost:8080`
- [ ] Homepage loads with LeafGuard title
- [ ] Can navigate to `/detect` page
- [ ] Can upload an image
- [ ] Can see detection results

---

## 🎉 Success!

If you see:
1. ✅ LeafGuard homepage
2. ✅ Can upload images
3. ✅ Get detection results
4. ✅ See treatment recommendations

**You're all set!** The application is working perfectly. 🌱

---

## 📞 Quick Reference

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Run production server |
| `pnpm test` | Run tests |
| `pnpm typecheck` | Check TypeScript errors |
| `pnpm format.fix` | Format code |

---

**Last Updated:** January 2024
**Version:** 1.0
