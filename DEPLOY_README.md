# DevBhoomi Travels — Render Deployment Guide

## ✅ Project Status: ALL FORMS WORKING

### Forms Connected to Server (All Booking Data → Admin Panel)
| Page | Form Type | Status |
|------|-----------|--------|
| All Tour Pages (16 pages) | Package Booking Query | ✅ Working |
| Hotel.html | Hotel Room Booking | ✅ Working |
| Vehicle.html | Vehicle/Cab Booking | ✅ Working |
| Contact.html | Contact Enquiry | ✅ Working |
| Index/Any Page | Login / Signup | ✅ Working |
| Any Page | Newsletter Subscribe | ✅ Working |
| Admin Panel | View All Bookings | ✅ Working |

### Admin Panel Access
- URL: `https://devbhoomi-travels.onrender.com/admin.html`
- Email: `admin@devbhoomi.in`
- Password: `admin@123`

---

## 🚀 Deploy to Render — Step by Step

### Step 1: GitHub pe Push karo
```bash
git init
git add .
git commit -m "DevBhoomi Travels - College Project"
git remote add origin https://github.com/YOUR_USERNAME/devbhoomi-travels.git
git push -u origin main
```

### Step 2: Render Account
- Jao: https://render.com
- Sign up with GitHub

### Step 3: New Web Service Create Karo
1. Click "New +" → "Web Service"
2. Apna GitHub repo connect karo
3. Yeh settings lagao:
   - **Name:** `devbhoomi-travels`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

### Step 4: Environment Variables Add Karo
Render dashboard → "Environment" tab pe yeh sab add karo:

```
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
ADMIN_EMAIL = your_admin_email
ADMIN_PASS = your_admin_password
GOOGLE_CLIENT_ID = your_google_client_id
GOOGLE_CLIENT_SECRET = your_google_client_secret
FRONTEND_URL = https://your-app.onrender.com
NODE_ENV = production
```

### Step 5: Deploy!
- "Create Web Service" click karo
- 5-10 minute wait karo
- URL milegi: `https://devbhoomi-travels.onrender.com`

---

## 📋 How Bookings Flow

1. User kisi bhi page pe booking form bharta hai
2. Data directly MongoDB Atlas database mein jata hai
3. Admin panel pe saari bookings dikhti hain:
   - 🏔️ Package bookings
   - 🏨 Hotel bookings  
   - 🚗 Vehicle bookings
4. Admin status update kar sakta hai: Query Received → Confirmed → Completed

## ⚠️ Important Notes

- **Render Free Plan:** Server 15 minute inactivity ke baad sleep hoga
- **Pehli baar open karne pe 30-60 sec lag sakta hai** (cold start)
- MongoDB Atlas already connected hai — data save hoga!
