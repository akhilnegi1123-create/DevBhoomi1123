require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const cors       = require('cors');
const session    = require('express-session');
const Contact    = require('./models/contact');
const { v4: uuidv4 } = require('uuid');
const passport   = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const rateLimit  = require('express-rate-limit');
const crypto     = require('crypto');
const nodemailer = require('nodemailer');
const http        = require('http');
const { Server }  = require('socket.io');
const compression = require('compression');
const Razorpay    = require('razorpay');

const app = express();
const START_TIME = Date.now();

// ── RAZORPAY INSTANCE ──
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID     || 'rzp_test_XXXXXXXX',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'XXXXXXXXXXXXXXXX'
});

// ── RATE LIMITERS ──
// Strict limiter for auth routes (login / register / forgot-password)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { success: false, message: 'Bahut zyada attempts. 15 minute baad try karein.' },
  standardHeaders: true,
  legacyHeaders: false
});

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Bahut zyada requests. Thodi der baad try karein.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply gzip compression to all responses
app.use(compression());

app.use(cors({ 
  origin: function(origin, callback) {
    const allowed = [
      'https://devbhoomi-travels.onrender.com',
      'http://localhost:5000',
      'http://localhost:3000',
      'http://127.0.0.1:5000'
    ];
    if (!origin || allowed.includes(origin)) return callback(null, true);
    return callback(new Error('CORS: Origin allowed nahi hai'));
  },
  methods: ['GET','POST','PUT','PATCH','DELETE'], 
  allowedHeaders: ['Content-Type','Authorization'] 
}));
const path = require("path");


mongoose.connect(process.env.MONGO_URI)
  .then(() => { console.log('✅ MongoDB Connected!'); seedAdmin(); })
  .catch(err => console.error('❌ MongoDB Error:', err));

  passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},

(accessToken, refreshToken, profile, done) => {
  return done(null, profile);
})); 

app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET || 'devbhoomi-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    res.redirect("/");
  }
);

// ✅ STATIC LAST
app.use(express.static(path.join(__dirname, "../")));

// ── SCHEMAS ──
const userSchema = new mongoose.Schema({
  id:                  { type: String, default: () => uuidv4() },
  name:                { type: String, required: true },
  email:               { type: String, required: true, unique: true },
  password:            { type: String, required: true },
  role:                { type: String, default: 'user' },
  phone:               { type: String, default: '' },
  initials:            { type: String, default: '' },
  isActive:            { type: Boolean, default: true },
  lastLogin:           { type: Date, default: null },
  // ── Forgot Password ──
  resetToken:          { type: String, default: null },
  resetTokenExpires:   { type: Date,   default: null },
  createdAt:           { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const bookingSchema = new mongoose.Schema({
  id:              { type: String, default: () => uuidv4() },
  bookingId:       { type: String, default: () => 'BK-' + Date.now().toString().slice(-6) },
  userId:          { type: String, default: 'guest' },
  packageKey:      { type: String, default: '' },
  packageName:     { type: String, default: '' },
  packagePrice:    { type: String, default: '' },
  name:            { type: String, required: true },
  phone:           { type: String, required: true },
  email:           { type: String, default: '' },
  travelDate:      { type: String },
  persons:         { type: Number, default: 1 },
  totalAmount:     { type: Number, default: 0 },
  gstAmount:       { type: Number, default: 0 },
  finalAmount:     { type: Number, default: 0 },
  specialRequests: { type: String, default: '' },
  source:          { type: String, default: 'website' },
  bookingType:     { type: String, default: 'Package' },
  status:          { type: String, default: 'Query Received' },
  // ── Payment (Razorpay) ──
  razorpayOrderId:   { type: String, default: null },
  razorpayPaymentId: { type: String, default: null },
  paymentStatus:     { type: String, default: 'pending', enum: ['pending', 'paid', 'failed', 'refunded'] },
  paidAt:            { type: Date, default: null },
  createdAt:         { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

// Contact model is imported from ./models/contact (full schema with ticketId, message, phone, etc.)

const reviewSchema = new mongoose.Schema({
  id:          { type: String, default: () => uuidv4() },
  name:        { type: String, required: true },
  city:        { type: String, default: '' },
  initials:    { type: String, default: '' },
  packageKey:  { type: String, default: '' },
  packageName: { type: String, default: '' },
  rating:      { type: Number, required: true, min: 1, max: 5 },
  text:        { type: String, required: true },
  approved:    { type: Boolean, default: false },
  createdAt:   { type: Date, default: Date.now }
});
const Review = mongoose.model('Review', reviewSchema);

const newsletterSchema = new mongoose.Schema({
  id:           { type: String, default: () => uuidv4() },
  email:        { type: String, required: true, unique: true },
  source:       { type: String, default: 'website' },
  isActive:     { type: Boolean, default: true },
  subscribedAt: { type: Date, default: Date.now },
  createdAt:    { type: Date, default: Date.now }
});
const Newsletter = mongoose.model('Newsletter', newsletterSchema);

// ── SEED ADMIN ──
async function seedAdmin() {
  try {
    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!existing) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASS, 10);
      await User.create({ name: 'Admin', email: process.env.ADMIN_EMAIL, password: hashed, role: 'admin', initials: 'AD' });
      console.log('✅ Admin created:', process.env.ADMIN_EMAIL);
    } else { console.log('ℹ️  Admin already exists'); }
  } catch (err) { console.error('Seed error:', err.message); }
}

// ── MIDDLEWARE ──
function authMiddleware(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Login karein pehle' });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ success: false, message: 'Session expire ho gaya' }); }
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access sirf admin ke liye hai' });
  }
  next();
}

// ── HEALTH CHECK ──
app.get('/api/health', (req, res) => {
  const uptime = Math.floor((Date.now() - START_TIME) / 1000);
  res.json({ success: true, data: {
    time: new Date().toLocaleString('en-IN'),
    uptime: `${Math.floor(uptime/60)}m ${uptime%60}s`,
    framework: 'Express.js', database: 'MongoDB Atlas',
    dbPath: process.env.MONGO_URI?.split('@')[1]?.split('/')[0] || 'Atlas',
    version: '2.1.0'
  }});
});

// ── STATS (admin panel: GET /stats) ──
app.get('/api/stats', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [totalUsers, totalBookings, pendingBookings, totalContacts,
           unreadContacts, totalReviews, pendingReviews, newsletterSubs] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'Query Received' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'New' }),
      Review.countDocuments(),
      Review.countDocuments({ approved: false }),
      Newsletter.countDocuments({ isActive: true })
    ]);
    res.json({ success: true, data: { totalUsers, totalBookings, pendingBookings, totalContacts, unreadContacts, totalReviews, pendingReviews, newsletterSubs } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── AUTH ──
app.post('/api/auth/register', authLimiter, async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'Naam, email aur password zaroori hai' });

    // ── Email format validation ──
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim()))
      return res.status(400).json({ success: false, message: 'Valid email address likhein (jaise: rahul@gmail.com)' });

    // ── Name validation ──
    if (name.trim().length < 2)
      return res.status(400).json({ success: false, message: 'Naam kam se kam 2 characters ka hona chahiye' });

    // ── Password strength validation ──
    if (password.length < 8)
      return res.status(400).json({ success: false, message: 'Password kam se kam 8 characters ka hona chahiye' });
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))
      return res.status(400).json({ success: false, message: 'Password mein letter aur number dono hone chahiye' });

    const exists = await User.findOne({ email: email.trim().toLowerCase() });
    if (exists) return res.status(400).json({ success: false, message: 'Yeh email pehle se registered hai' });
    const hashed  = await bcrypt.hash(password, 10);
    const cleanEmail = email.trim().toLowerCase();
    const initials = name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const user = await User.create({ name: name.trim(), email: cleanEmail, password: hashed, phone: phone || '', initials });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name, initials }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, message: 'Account ban gaya! Welcome ' + user.name, token, user: { name: user.name, email: user.email, role: user.role, initials } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.post('/api/auth/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email aur password likhein' });
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(400).json({ success: false, message: 'Email ya password galat hai' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ success: false, message: 'Email ya password galat hai' });
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
    const initials = user.initials || user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name, initials }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, message: 'Welcome back, ' + user.name + '!', token, user: { name: user.name, email: user.email, role: user.role, initials } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User nahi mila' });
    res.json({ success: true, user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});
// ── CHANGE PASSWORD (any logged-in user: POST /auth/change-password) ──
app.post('/api/auth/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ success: false, message: 'Current aur new password dono likhein' });
    if (newPassword.length < 6)
      return res.status(400).json({ success: false, message: 'New password kam se kam 6 characters ka hona chahiye' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User nahi mila' });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ success: false, message: 'Current password galat hai' });
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.json({ success: true, message: 'Password successfully update ho gaya! Dobara login karein.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── BOOKINGS ──
app.post('/api/bookings', async (req, res) => {
  try {
    const { packageKey, packageName, packagePrice, name, phone, email,
            travelDate, persons, totalAmount, gstAmount, finalAmount, specialRequests, source, bookingType } = req.body;
    if (!name || name.length < 2) return res.status(400).json({ success: false, message: 'Naam likhein' });
    if (!phone) return res.status(400).json({ success: false, message: 'Phone number likhein' });
    let userId = 'guest';
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) { try { userId = jwt.verify(token, process.env.JWT_SECRET).id; } catch {} }
    const booking = await Booking.create({ userId, packageKey, packageName, packagePrice, name, phone, email: email || '', travelDate, persons: persons || 1, totalAmount, gstAmount, finalAmount, specialRequests: specialRequests || '', source: source || 'website', bookingType: req.body.bookingType || 'Package' });
    res.json({ success: true, message: 'Booking query submit ho gayi!', bookingId: booking.bookingId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — all bookings (admin panel: GET /bookings/all)
app.get('/api/bookings/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/bookings/my', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — update status (admin panel: PUT /bookings/:id/status)
app.put('/api/bookings/:id/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const query = req.params.id.length === 24 ? { _id: req.params.id } : { id: req.params.id };
    const booking = await Booking.findOneAndUpdate(query, { status: req.body.status }, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking nahi mili' });
    res.json({ success: true, message: 'Status update ho gaya', booking });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── CONTACTS ──
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, name, email, phone, package: pkg, travelDate, travelers, message } = req.body;
    const fullName = name || (firstName ? (firstName + ' ' + (lastName || '')).trim() : '');
    if (!fullName || fullName.length < 2) return res.status(400).json({ success: false, message: 'Naam likhein' });
    if (!email || !email.includes('@')) return res.status(400).json({ success: false, message: 'Valid email likhein' });
    if (!message || message.length < 5) return res.status(400).json({ success: false, message: 'Message likhein' });
    const contact = await Contact.create({ firstName: firstName || fullName, lastName: lastName || '', name: fullName, email, phone: phone || '', package: pkg || '', travelDate: travelDate || null, travelers: travelers || 1, message });
    res.json({ success: true, message: 'Message mil gaya! Hum 24 ghante mein reply karenge.', ticketId: contact.ticketId });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — all contacts (admin panel: GET /contacts/all)
app.get('/api/contacts/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — update status (admin panel: PUT /contacts/:ticketId/status)
app.put('/api/contacts/:ticketId/status', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate({ ticketId: req.params.ticketId }, { status: req.body.status }, { new: true });
    if (!contact) {
      // Fallback: try by custom id
      const c2 = await Contact.findOneAndUpdate({ id: req.params.ticketId }, { status: req.body.status }, { new: true });
      if (!c2) return res.status(404).json({ success: false, message: 'Contact nahi mila' });
      return res.json({ success: true, message: 'Status update ho gaya', contact: c2 });
    }
    res.json({ success: true, message: 'Status update ho gaya', contact });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — log reply (admin panel: POST /contacts/:ticketId/reply)
app.post('/api/contacts/:ticketId/reply', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const replied = await Contact.findOneAndUpdate(
      { $or: [{ ticketId: req.params.ticketId }, { id: req.params.ticketId }] },
      { status: 'Replied' },
      { new: true }
    );
    res.json({ success: true, message: 'Reply logged!' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── REVIEWS ──
app.post('/api/reviews', async (req, res) => {
  try {
    const { packageKey, packageName, name, city, rating, text } = req.body;
    if (!name || name.length < 2) return res.status(400).json({ success: false, message: 'Naam likhein' });
    if (!rating) return res.status(400).json({ success: false, message: 'Rating select karein' });
    if (!text || text.length < 10) return res.status(400).json({ success: false, message: 'Review thodi lambi likhein' });
    const initials = name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    await Review.create({ name, city: city || '', initials, packageKey: packageKey || '', packageName: packageName || '', rating: parseInt(rating), text });
    res.json({ success: true, message: 'Review submit ho gayi! Approve hone ke baad dikhai degi.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const limit   = parseInt(req.query.limit) || 20;
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(limit);
    const all     = await Review.find({ approved: true });
    const avgRating = all.length ? (all.reduce((s, r) => s + r.rating, 0) / all.length).toFixed(1) : '4.9';
    res.json({ success: true, data: reviews, avgRating: parseFloat(avgRating), total: all.length });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — all reviews (admin panel: GET /reviews/all)
app.get('/api/reviews/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — approve (admin panel: PUT /reviews/:id/approve)
app.put('/api/reviews/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const q2 = req.params.id.length === 24 ? { _id: req.params.id } : { id: req.params.id };
    const review = await Review.findOneAndUpdate(q2, { approved: true }, { new: true });
    if (!review) return res.status(404).json({ success: false, message: 'Review nahi mili' });
    res.json({ success: true, message: 'Review approve ho gayi ✅', review });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — delete (admin panel: DELETE /reviews/:id/delete)
app.delete('/api/reviews/:id/delete', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const qd = req.params.id.length === 24 ? { _id: req.params.id } : { id: req.params.id };
    await Review.findOneAndDelete(qd);
    res.json({ success: true, message: 'Review delete ho gayi' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── USERS ──
// Admin — all users (admin panel: GET /users/all)
app.get('/api/users/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — toggle active (admin panel: PUT /users/:id/toggle)
app.put('/api/users/:id/toggle', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const uq = req.params.id.length === 24 ? { _id: req.params.id } : { id: req.params.id };
    const user = await User.findOne(uq);
    if (!user) return res.status(404).json({ success: false, message: 'User nahi mila' });
    await User.findOneAndUpdate(uq, { isActive: !user.isActive });
    res.json({ success: true, message: 'User ' + (!user.isActive ? 'enabled' : 'disabled') });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── NEWSLETTER ──
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, source } = req.body;
    if (!email || !email.includes('@')) return res.status(400).json({ success: false, message: 'Valid email likhein' });
    const exists = await Newsletter.findOne({ email });
    if (exists) return res.json({ success: true, message: 'Aap pehle se subscribe hain!' });
    await Newsletter.create({ email, source: source || 'website' });
    res.json({ success: true, message: 'Subscribe ho gaye! Travel updates milenge.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Admin — all subscribers (admin panel: GET /newsletter/all)
app.get('/api/newsletter/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const subs = await Newsletter.find().sort({ createdAt: -1 });
    res.json({ success: true, data: subs });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── BACKUP (admin panel: POST /admin/backup) ──
app.post('/api/admin/backup', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const [users, bookings, contacts, reviews, newsletter] = await Promise.all([
      User.find().select('-password'), Booking.find(), Contact.find(), Review.find(), Newsletter.find()
    ]);
    res.json({ success: true, message: 'Backup ready!', file: 'backup_' + Date.now() + '.json', data: { exportedAt: new Date(), users, bookings, contacts, reviews, newsletter } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// ── PACKAGES & DESTINATIONS (admin panel tabs) ──
app.get('/api/packages', (req, res) => {
  res.json({ success: true, data: [
    { key: 'chardham',  title: 'Char Dham Yatra',          category: 'Pilgrimage', price: '₹18,999', nights: 10, rating: 4.9, reviews: 892,  region: 'Uttarakhand' },
    { key: 'rishikesh', title: 'Rishikesh Adventure Rush', category: 'Adventure',  price: '₹8,499',  nights: 4,  rating: 4.8, reviews: 1243, region: 'Rishikesh' },
    { key: 'vof',       title: 'Valley of Flowers Trek',   category: 'Trek',       price: '₹12,999', nights: 7,  rating: 4.9, reviews: 567,  region: 'Chamoli' },
    { key: 'kedarnath', title: 'Kedarnath Yatra',          category: 'Pilgrimage', price: '₹11,499', nights: 5,  rating: 4.9, reviews: 1087, region: 'Rudraprayag' },
    { key: 'mussoorie', title: 'Mussoorie Weekend Escape', category: 'Leisure',    price: '₹5,999',  nights: 2,  rating: 4.7, reviews: 743,  region: 'Mussoorie' },
    { key: 'auli',      title: 'Auli Ski & Snow',          category: 'Adventure',  price: '₹14,999', nights: 5,  rating: 4.8, reviews: 389,  region: 'Chamoli' },
    { key: 'nainital',  title: 'Nainital Lake Retreat',    category: 'Leisure',    price: '₹6,499',  nights: 3,  rating: 4.7, reviews: 921,  region: 'Nainital' },
    { key: 'hemkund',   title: 'Hemkund Sahib Yatra',      category: 'Pilgrimage', price: '₹9,999',  nights: 4,  rating: 4.9, reviews: 312,  region: 'Chamoli' },
    { key: 'corbett',   title: 'Jim Corbett Safari',       category: 'Wildlife',   price: '₹13,499', nights: 3,  rating: 4.8, reviews: 678,  region: 'Corbett' },
    { key: 'dehradun',  title: 'Dehradun City & Hills',    category: 'Leisure',    price: '₹4,999',  nights: 2,  rating: 4.6, reviews: 445,  region: 'Dehradun' },
    { key: 'haridwar',  title: 'Haridwar Ganga Aarti',     category: 'Pilgrimage', price: '₹3,999',  nights: 2,  rating: 4.8, reviews: 1120, region: 'Haridwar' },
    { key: 'chopta',    title: 'Chopta Tungnath Trek',     category: 'Trek',       price: '₹7,999',  nights: 3,  rating: 4.9, reviews: 298,  region: 'Rudraprayag' },
    { key: 'gangotri',  title: 'Gangotri Yamunotri',       category: 'Pilgrimage', price: '₹13,999', nights: 6,  rating: 4.8, reviews: 534,  region: 'Uttarkashi' }
  ]});
});

app.get('/api/destinations', (req, res) => {
  res.json({ success: true, data: [
    { name: 'Rishikesh',   region: 'Garhwal', type: 'Adventure & Spiritual' },
    { name: 'Mussoorie',   region: 'Garhwal', type: 'Hill Station' },
    { name: 'Nainital',    region: 'Kumaon',  type: 'Lake & Leisure' },
    { name: 'Kedarnath',   region: 'Garhwal', type: 'Pilgrimage' },
    { name: 'Auli',        region: 'Garhwal', type: 'Ski & Snow' },
    { name: 'Jim Corbett', region: 'Kumaon',  type: 'Wildlife Safari' },
    { name: 'Haridwar',    region: 'Garhwal', type: 'Pilgrimage & Ganga Aarti' },
    { name: 'Dehradun',    region: 'Garhwal', type: 'City & Hills' },
    { name: 'Chopta',      region: 'Garhwal', type: 'Trek & Meadows' }
  ]});
});

// ══════════════════════════════════════════════
// ── FEATURE 1: FORGOT PASSWORD / RESET PASSWORD ──
// ══════════════════════════════════════════════

// Email transporter (configure SMTP_* env vars for production)
const emailTransporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.ethereal.email',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

// POST /api/auth/forgot-password
// Body: { email }
// Generates a secure reset token (expires in 1 hour) and sends reset link
app.post('/api/auth/forgot-password', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email likhein' });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    // Always return success to prevent email enumeration attacks
    if (!user) return res.json({ success: true, message: 'Agar yeh email registered hai, toh reset link bhej diya gaya hai.' });

    // Generate cryptographically secure token
    const rawToken    = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiry      = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await User.findByIdAndUpdate(user._id, {
      resetToken:        hashedToken,
      resetTokenExpires: expiry
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5000';
    const resetLink   = `${frontendUrl}/reset-password.html?token=${rawToken}&email=${encodeURIComponent(user.email)}`;

    // Send email (in development, link is logged to console)
    if (process.env.SMTP_USER) {
      await emailTransporter.sendMail({
        from:    `"DevBhoomi Travels" <${process.env.SMTP_USER}>`,
        to:      user.email,
        subject: 'Password Reset — DevBhoomi Travels',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:24px;border:1px solid #e0e0e0;border-radius:8px;">
            <h2 style="color:#2e7d32;">DevBhoomi Travels</h2>
            <p>Namaste <strong>${user.name}</strong>,</p>
            <p>Aapne password reset request ki thi. Neeche button par click karein:</p>
            <a href="${resetLink}" style="display:inline-block;padding:12px 24px;background:#2e7d32;color:#fff;text-decoration:none;border-radius:6px;margin:16px 0;">Password Reset Karein</a>
            <p style="color:#666;font-size:13px;">Yeh link 1 ghante mein expire ho jayega. Agar aapne yeh request nahi ki, toh ignore karein.</p>
          </div>`
      });
    } else {
      // Development fallback — print reset link to server console
      console.log('\n🔑 PASSWORD RESET LINK (dev only):', resetLink, '\n');
    }

    res.json({ success: true, message: 'Agar yeh email registered hai, toh reset link bhej diya gaya hai.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// POST /api/auth/reset-password
// Body: { email, token, newPassword }
app.post('/api/auth/reset-password', authLimiter, async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    if (!email || !token || !newPassword)
      return res.status(400).json({ success: false, message: 'Email, token aur new password required hai' });
    if (newPassword.length < 8)
      return res.status(400).json({ success: false, message: 'Password kam se kam 8 characters ka hona chahiye' });
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword))
      return res.status(400).json({ success: false, message: 'Password mein letter aur number dono hone chahiye' });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      email:             email.trim().toLowerCase(),
      resetToken:        hashedToken,
      resetTokenExpires: { $gt: new Date() }  // token still valid
    });

    if (!user) return res.status(400).json({ success: false, message: 'Reset link invalid ya expire ho gaya hai. Dobara try karein.' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(user._id, {
      password:          hashed,
      resetToken:        null,
      resetTokenExpires: null
    });

    res.json({ success: true, message: 'Password successfully reset ho gaya! Ab login karein.' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 2: RAZORPAY / UPI PAYMENT GATEWAY ──
// ══════════════════════════════════════════════

// POST /api/payment/create-order
// Body: { bookingId, amount }   — amount in INR (will be converted to paise)
// Creates a Razorpay order linked to a booking
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    if (!bookingId || !amount)
      return res.status(400).json({ success: false, message: 'bookingId aur amount required hai' });

    const booking = await Booking.findOne({ bookingId });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking nahi mili' });
    if (booking.paymentStatus === 'paid')
      return res.status(400).json({ success: false, message: 'Is booking ka payment already ho chuka hai' });

    const amountPaise = Math.round(parseFloat(amount) * 100); // Razorpay uses paise
    if (amountPaise < 100)
      return res.status(400).json({ success: false, message: 'Minimum amount ₹1 hona chahiye' });

    const order = await razorpay.orders.create({
      amount:   amountPaise,
      currency: 'INR',
      receipt:  bookingId,
      notes:    { bookingId, packageName: booking.packageName, customerName: booking.name }
    });

    // Save order ID to booking
    await Booking.findOneAndUpdate({ bookingId }, { razorpayOrderId: order.id });

    res.json({
      success: true,
      message: 'Order create ho gaya',
      order: {
        id:       order.id,
        amount:   order.amount,
        currency: order.currency,
        receipt:  order.receipt
      },
      // Return key for frontend Razorpay checkout
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXX'
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// POST /api/payment/verify
// Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId }
// Verifies Razorpay HMAC signature and marks booking as paid
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId)
      return res.status(400).json({ success: false, message: 'Sabhi payment fields required hain' });

    // HMAC-SHA256 signature verification
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'XXXXXXXXXXXXXXXX')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature)
      return res.status(400).json({ success: false, message: 'Payment verification failed. Signature match nahi hui.' });

    // Update booking as paid
    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      {
        razorpayPaymentId: razorpay_payment_id,
        paymentStatus:     'paid',
        status:            'Confirmed',
        paidAt:            new Date()
      },
      { new: true }
    );

    if (!booking) return res.status(404).json({ success: false, message: 'Booking nahi mili' });

    res.json({
      success: true,
      message: `Payment successful! Booking ${bookingId} confirm ho gayi.`,
      booking: { bookingId: booking.bookingId, paymentStatus: booking.paymentStatus, status: booking.status }
    });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// GET /api/payment/status/:bookingId — check payment status of a booking
app.get('/api/payment/status/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId })
      .select('bookingId paymentStatus razorpayOrderId razorpayPaymentId paidAt status');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking nahi mili' });
    res.json({ success: true, data: booking });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 3: SEO — SITEMAP.XML + ROBOTS.TXT ──
// ══════════════════════════════════════════════

const SEO_BASE_URL = process.env.FRONTEND_URL || 'https://devbhoomi-travels.onrender.com';

// All static pages with priority + changefreq
const STATIC_PAGES = [
  { url: '/',                           priority: '1.0', changefreq: 'weekly'  },
  { url: '/packages.html',              priority: '0.9', changefreq: 'weekly'  },
  { url: '/Destination.html',           priority: '0.9', changefreq: 'weekly'  },
  { url: '/activities.html',            priority: '0.8', changefreq: 'monthly' },
  { url: '/Hotel.html',                 priority: '0.8', changefreq: 'weekly'  },
  { url: '/Vehicle.html',               priority: '0.7', changefreq: 'monthly' },
  { url: '/contact.html',               priority: '0.7', changefreq: 'monthly' },
  { url: '/About.html',                 priority: '0.6', changefreq: 'monthly' },
  { url: '/gallery.html',               priority: '0.6', changefreq: 'monthly' },
  // Destination pages
  { url: '/kedarnath-yatra.html',       priority: '0.8', changefreq: 'monthly' },
  { url: '/chardham-tour.html',         priority: '0.8', changefreq: 'monthly' },
  { url: '/rishikesh-adventure.html',   priority: '0.8', changefreq: 'monthly' },
  { url: '/mussoorie-honeymoon.html',   priority: '0.8', changefreq: 'monthly' },
  { url: '/auli-ski-snow.html',         priority: '0.8', changefreq: 'monthly' },
  { url: '/valley-of-flowers.html',     priority: '0.8', changefreq: 'monthly' },
  { url: '/nainital-family.html',       priority: '0.7', changefreq: 'monthly' },
  { url: '/jim-corbett-safari.html',    priority: '0.7', changefreq: 'monthly' },
  { url: '/haridwar-ganga-aarti.html',  priority: '0.7', changefreq: 'monthly' },
  { url: '/chopta-tungnath.html',       priority: '0.7', changefreq: 'monthly' },
  { url: '/gangotri-dayara.html',       priority: '0.7', changefreq: 'monthly' },
  { url: '/gangotri-dayara.html',       priority: '0.7', changefreq: 'monthly' },
  { url: '/munsiyari-milam.html',       priority: '0.7', changefreq: 'monthly' },
  { url: '/binsar-jageshwar.html',      priority: '0.7', changefreq: 'monthly' },
  { url: '/lansdowne-khirsu.html',      priority: '0.6', changefreq: 'monthly' },
  { url: '/tehri-dhanaulti.html',       priority: '0.6', changefreq: 'monthly' },
  { url: '/kausani-pindari.html',       priority: '0.6', changefreq: 'monthly' },
  { url: '/abbott-mount.html',          priority: '0.6', changefreq: 'monthly' },
  { url: '/paragliding-bir-billing.html', priority: '0.6', changefreq: 'monthly' },
  { url: '/himalayan-mountain-biking.html', priority: '0.6', changefreq: 'monthly' },
  { url: '/bungee-zipline.html',        priority: '0.6', changefreq: 'monthly' },
  { url: '/Kadarnath.html',             priority: '0.7', changefreq: 'monthly' }
];

// GET /sitemap.xml — Dynamic XML sitemap
app.get('/sitemap.xml', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const urlEntries = STATIC_PAGES.map(page => `
  <url>
    <loc>${SEO_BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${urlEntries}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.header('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
  res.send(xml);
});

// GET /robots.txt — Allow all crawlers, link sitemap
app.get('/robots.txt', (req, res) => {
  const robots = `User-agent: *
Allow: /

# Disallow admin and API routes from crawling
Disallow: /admin.html
Disallow: /api/

# Sitemap location
Sitemap: ${SEO_BASE_URL}/sitemap.xml`;

  res.header('Content-Type', 'text/plain');
  res.send(robots);
});

// GET /api/seo/meta/:pageKey — Structured meta tags for frontend pages
// Returns title, description, keywords, og tags, and JSON-LD schema
const PAGE_META = {
  home: {
    title:       'DevBhoomi Travels — Uttarakhand Tour Packages | Pilgrimage, Adventure, Trekking',
    description: 'Uttarakhand ke best tour packages — Char Dham, Kedarnath, Rishikesh, Valley of Flowers, Auli. Budget se luxury tak, sab milega DevBhoomi Travels mein.',
    keywords:    'uttarakhand tour packages, char dham yatra, kedarnath yatra, rishikesh adventure, valley of flowers trek, auli ski, nainital tour',
    type:        'website'
  },
  chardham: {
    title:       'Char Dham Yatra Package 2025 — ₹18,999 | DevBhoomi Travels',
    description: '10 raat 11 din ka Char Dham Yatra package: Yamunotri, Gangotri, Kedarnath, Badrinath. Comfortable stay, experienced guide, group & private tours available.',
    keywords:    'char dham yatra 2025, char dham package price, kedarnath badrinath yatra, chardham tour uttarakhand',
    type:        'product',
    price:       '18999',
    currency:    'INR'
  },
  rishikesh: {
    title:       'Rishikesh Adventure Package — Rafting, Bungee, Camping | ₹8,499',
    description: 'Rishikesh adventure rush package: white water rafting, bungee jumping, camping by Ganga. 4 nights / 5 days from ₹8,499 per person.',
    keywords:    'rishikesh adventure package, rishikesh rafting, bungee jumping rishikesh, camping rishikesh, rishikesh tour 2025',
    type:        'product',
    price:       '8499',
    currency:    'INR'
  },
  kedarnath: {
    title:       'Kedarnath Yatra Package 2025 — ₹11,499 | DevBhoomi Travels',
    description: 'Kedarnath Yatra 5 din ka package. Helicopter option available. Comfortable stay at base camps. Experienced guide ke saath safe yatra.',
    keywords:    'kedarnath yatra 2025, kedarnath package, kedarnath helicopter, kedarnath tour from delhi',
    type:        'product',
    price:       '11499',
    currency:    'INR'
  }
};

app.get('/api/seo/meta/:pageKey', (req, res) => {
  const meta = PAGE_META[req.params.pageKey] || PAGE_META.home;
  const pageUrl = `${SEO_BASE_URL}/${req.params.pageKey === 'home' ? '' : req.params.pageKey + '.html'}`;

  // JSON-LD TravelAgency schema (shown on every page)
  const orgSchema = {
    '@context':  'https://schema.org',
    '@type':     'TravelAgency',
    name:        'DevBhoomi Travels',
    url:         SEO_BASE_URL,
    logo:        `${SEO_BASE_URL}/IMG/logo.png`,
    description: 'Uttarakhand ki best travel agency — pilgrimage, adventure, honeymoon, trekking packages.',
    address: {
      '@type':           'PostalAddress',
      addressLocality:   'Dehradun',
      addressRegion:     'Uttarakhand',
      addressCountry:    'IN'
    },
    telephone: '+91-XXXXXXXXXX',
    priceRange: '₹₹'
  };

  // Product schema if it's a package page
  let productSchema = null;
  if (meta.type === 'product') {
    productSchema = {
      '@context': 'https://schema.org',
      '@type':    'Product',
      name:       meta.title,
      description: meta.description,
      offers: {
        '@type':         'Offer',
        price:           meta.price,
        priceCurrency:   meta.currency,
        availability:    'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'DevBhoomi Travels' }
      }
    };
  }

  res.json({
    success: true,
    meta: {
      title:       meta.title,
      description: meta.description,
      keywords:    meta.keywords,
      canonical:   pageUrl,
      og: {
        title:       meta.title,
        description: meta.description,
        url:         pageUrl,
        type:        meta.type === 'product' ? 'product' : 'website',
        siteName:    'DevBhoomi Travels',
        image:       `${SEO_BASE_URL}/IMG/og-banner.jpg`
      },
      twitter: {
        card:        'summary_large_image',
        title:       meta.title,
        description: meta.description,
        image:       `${SEO_BASE_URL}/IMG/og-banner.jpg`
      }
    },
    schema: {
      organization: orgSchema,
      ...(productSchema && { product: productSchema })
    }
  });
});


// ══════════════════════════════════════════════
// ── FEATURE 4: USER DASHBOARD — PROFILE EDIT ──
// ══════════════════════════════════════════════

app.put('/api/auth/profile', authMiddleware, async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (name && name.trim().length < 2)
      return res.status(400).json({ success: false, message: 'Naam kam se kam 2 characters ka hona chahiye' });
    const update = {};
    if (name) { update.name = name.trim(); update.initials = name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2); }
    if (phone !== undefined) update.phone = phone;
    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User nahi mila' });
    res.json({ success: true, message: 'Profile update ho gayi!', user });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 5: PERSISTENT WISHLIST ──
// ══════════════════════════════════════════════

const wishlistSchema = new mongoose.Schema({
  userId:       { type: String, required: true },
  packageKey:   { type: String, required: true },
  packageName:  { type: String, default: '' },
  packagePrice: { type: String, default: '' },
  addedAt:      { type: Date, default: Date.now }
});
wishlistSchema.index({ userId: 1, packageKey: 1 }, { unique: true });
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

app.get('/api/wishlist', authMiddleware, async (req, res) => {
  try {
    const items = await Wishlist.find({ userId: req.user.id }).sort({ addedAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.post('/api/wishlist', authMiddleware, async (req, res) => {
  try {
    const { packageKey, packageName, packagePrice } = req.body;
    if (!packageKey) return res.status(400).json({ success: false, message: 'packageKey required hai' });
    const item = await Wishlist.findOneAndUpdate(
      { userId: req.user.id, packageKey },
      { packageName: packageName || '', packagePrice: packagePrice || '', addedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Wishlist mein add ho gaya!', item });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.delete('/api/wishlist/:packageKey', authMiddleware, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ userId: req.user.id, packageKey: req.params.packageKey });
    res.json({ success: true, message: 'Wishlist se remove ho gaya' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 6: WHATSAPP AUTOMATION (TWILIO) ──
// ══════════════════════════════════════════════

async function sendWhatsApp(to, message) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.log('📱 WhatsApp (dev):', to, '|', message.slice(0, 80));
    return;
  }
  try {
    const twilio  = require('twilio');
    const client  = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const cleaned = to.replace(/\D/g, '');
    const phone   = cleaned.startsWith('91') ? `+${cleaned}` : `+91${cleaned}`;
    await client.messages.create({ from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'}`, to: `whatsapp:${phone}`, body: message });
  } catch (err) { console.error('❌ WhatsApp error:', err.message); }
}


// ══════════════════════════════════════════════
// ── FEATURE 7: EMAIL SYSTEM (Booking + OTP) ──
// ══════════════════════════════════════════════

async function sendEmail({ to, subject, html }) {
  if (!process.env.SMTP_USER) { console.log('📧 Email (dev):', to, '|', subject); return; }
  try {
    await emailTransporter.sendMail({ from: `"DevBhoomi Travels" <${process.env.SMTP_USER}>`, to, subject, html });
  } catch (err) { console.error('❌ Email error:', err.message); }
}

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp:   { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used:  { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const OTP = mongoose.model('OTP', otpSchema);

app.post('/api/auth/send-otp', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email required hai' });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await OTP.findOneAndDelete({ email });
    await OTP.create({ email, otp: code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
    await sendEmail({ to: email, subject: 'DevBhoomi OTP Verification', html: `<div style="font-family:Arial;padding:24px;max-width:400px;border:1px solid #ddd;border-radius:8px;"><h3 style="color:#2e7d32;">DevBhoomi Travels</h3><p>Aapka OTP:</p><h1 style="letter-spacing:8px;color:#1b5e20;">${code}</h1><p style="color:#888;font-size:12px;">10 minutes mein expire hoga.</p></div>` });
    res.json({ success: true, message: 'OTP bhej diya gaya' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await OTP.findOne({ email, otp, used: false, expiresAt: { $gt: new Date() } });
    if (!record) return res.status(400).json({ success: false, message: 'OTP galat ya expire ho gaya' });
    await OTP.findByIdAndUpdate(record._id, { used: true });
    res.json({ success: true, message: 'Email verify ho gayi!' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// Booking confirmation — email + WhatsApp
app.post('/api/bookings/confirm-notify', async (req, res) => {
  try {
    const { bookingId } = req.body;
    const b = await Booking.findOne({ bookingId });
    if (!b) return res.status(404).json({ success: false, message: 'Booking nahi mili' });
    if (b.email) await sendEmail({ to: b.email, subject: `Booking Confirmed — ${b.bookingId}`, html: `<div style="font-family:Arial;padding:24px;max-width:560px;border:1px solid #ddd;border-radius:10px;"><h2 style="color:#2e7d32;">✅ Booking Confirm</h2><p>Namaste <b>${b.name}</b>,</p><table style="width:100%;border-collapse:collapse;margin:16px 0;"><tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Booking ID</td><td>${b.bookingId}</td></tr><tr><td style="padding:8px;font-weight:bold;">Package</td><td>${b.packageName}</td></tr><tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Date</td><td>${b.travelDate||'TBD'}</td></tr><tr><td style="padding:8px;font-weight:bold;">Persons</td><td>${b.persons}</td></tr><tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Amount</td><td>₹${b.finalAmount}</td></tr></table><p>Hum jald contact karenge. 🙏</p></div>` });
    if (b.phone) await sendWhatsApp(b.phone, `🏔 DevBhoomi Travels\n\nNamaste ${b.name}!\nBooking confirm: ${b.bookingId}\nPackage: ${b.packageName}\nDate: ${b.travelDate||'TBD'} | ${b.persons} persons\nAmount: ₹${b.finalAmount}\n\nHum jald contact karenge. 🙏`);
    res.json({ success: true, message: 'Notification bhej diya gaya' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 9: PROMO CODES ──
// ══════════════════════════════════════════════

const promoSchema = new mongoose.Schema({
  id:            { type: String, default: () => uuidv4() },
  code:          { type: String, required: true, unique: true, uppercase: true },
  discountType:  { type: String, enum: ['percent','flat'], default: 'percent' },
  discountValue: { type: Number, required: true },
  maxDiscount:   { type: Number, default: null },
  minOrderValue: { type: Number, default: 0 },
  usageLimit:    { type: Number, default: null },
  usedCount:     { type: Number, default: 0 },
  validFrom:     { type: Date, default: Date.now },
  validUntil:    { type: Date, default: null },
  isActive:      { type: Boolean, default: true },
  description:   { type: String, default: '' },
  createdAt:     { type: Date, default: Date.now }
});
const Promo = mongoose.model('Promo', promoSchema);

app.post('/api/promo/validate', async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    if (!code) return res.status(400).json({ success: false, message: 'Promo code likhein' });
    const promo = await Promo.findOne({ code: code.trim().toUpperCase(), isActive: true });
    if (!promo) return res.status(400).json({ success: false, message: 'Promo code invalid hai' });
    const now = new Date();
    if (promo.validFrom > now) return res.status(400).json({ success: false, message: 'Promo abhi active nahi hai' });
    if (promo.validUntil && promo.validUntil < now) return res.status(400).json({ success: false, message: 'Promo code expire ho gaya' });
    if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) return res.status(400).json({ success: false, message: 'Limit khatam ho gayi' });
    const amount   = parseFloat(orderAmount) || 0;
    if (amount < promo.minOrderValue) return res.status(400).json({ success: false, message: `Minimum order ₹${promo.minOrderValue} hona chahiye` });
    let discount = promo.discountType === 'percent'
      ? Math.min(Math.round(amount * promo.discountValue / 100), promo.maxDiscount || Infinity)
      : Math.min(promo.discountValue, amount);
    res.json({ success: true, message: `₹${discount} discount mili!`, promo: { code: promo.code, discountType: promo.discountType, discountValue: promo.discountValue, discount, description: promo.description } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.post('/api/promo/use', async (req, res) => {
  try {
    await Promo.findOneAndUpdate({ code: (req.body.code||'').toUpperCase() }, { $inc: { usedCount: 1 } });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.post('/api/promo/create', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { code, discountType, discountValue, maxDiscount, minOrderValue, usageLimit, validUntil, description } = req.body;
    if (!code || !discountValue) return res.status(400).json({ success: false, message: 'Code aur discount value required' });
    const promo = await Promo.create({ code: code.trim().toUpperCase(), discountType: discountType||'percent', discountValue, maxDiscount: maxDiscount||null, minOrderValue: minOrderValue||0, usageLimit: usageLimit||null, validUntil: validUntil||null, description: description||'' });
    res.json({ success: true, message: 'Promo code ban gaya!', promo });
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ success: false, message: 'Yeh code already exist karta hai' });
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/promo/all', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 });
    res.json({ success: true, data: promos });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.put('/api/promo/:id/toggle', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const promo = await Promo.findById(req.params.id);
    if (!promo) return res.status(404).json({ success: false, message: 'Promo nahi mila' });
    await Promo.findByIdAndUpdate(req.params.id, { isActive: !promo.isActive });
    res.json({ success: true, message: `Promo ${!promo.isActive ? 'active' : 'inactive'} ho gaya` });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 10: REVIEWS UPGRADE ──
// ══════════════════════════════════════════════

app.put('/api/reviews/:id/reply', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { reply } = req.body;
    if (!reply || reply.trim().length < 2) return res.status(400).json({ success: false, message: 'Reply likhein' });
    const q = req.params.id.length === 24 ? { _id: req.params.id } : { id: req.params.id };
    const review = await Review.findOneAndUpdate(q, { adminReply: reply.trim(), adminRepliedAt: new Date() }, { new: true });
    if (!review) return res.status(404).json({ success: false, message: 'Review nahi mili' });
    res.json({ success: true, message: 'Reply add ho gayi!', review });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.put('/api/reviews/:id/verify', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const q = req.params.id.length === 24 ? { _id: req.params.id } : { id: req.params.id };
    const review = await Review.findOneAndUpdate(q, { verified: true }, { new: true });
    if (!review) return res.status(404).json({ success: false, message: 'Review nahi mili' });
    res.json({ success: true, message: 'Review verified ✅', review });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 13: AVAILABILITY CALENDAR ──
// ══════════════════════════════════════════════

const availabilitySchema = new mongoose.Schema({
  packageKey:  { type: String, required: true },
  date:        { type: String, required: true },
  totalSlots:  { type: Number, default: 20 },
  bookedSlots: { type: Number, default: 0 },
  isBlocked:   { type: Boolean, default: false },
  blockReason: { type: String, default: '' },
  createdAt:   { type: Date, default: Date.now }
});
availabilitySchema.index({ packageKey: 1, date: 1 }, { unique: true });
const Availability = mongoose.model('Availability', availabilitySchema);

app.get('/api/availability/:packageKey', async (req, res) => {
  try {
    const filter = { packageKey: req.params.packageKey };
    if (req.query.month) filter.date = { $regex: `^${req.query.month}` };
    const slots = await Availability.find(filter).sort({ date: 1 });
    res.json({ success: true, data: slots });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/availability/check', async (req, res) => {
  try {
    const { packageKey, date, persons } = req.query;
    if (!packageKey || !date) return res.status(400).json({ success: false, message: 'packageKey aur date required' });
    const slot = await Availability.findOne({ packageKey, date });
    if (!slot) return res.json({ success: true, available: true, freeSlots: 20, message: 'Date available hai' });
    if (slot.isBlocked) return res.json({ success: true, available: false, freeSlots: 0, message: slot.blockReason || 'Yeh date blocked hai' });
    const free = slot.totalSlots - slot.bookedSlots;
    const need = parseInt(persons) || 1;
    res.json({ success: true, available: free >= need, freeSlots: free, message: free >= need ? `${free} slots available` : `Sirf ${free} slots baaki hain` });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.post('/api/availability/block', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { packageKey, date, isBlocked, blockReason, totalSlots } = req.body;
    if (!packageKey || !date) return res.status(400).json({ success: false, message: 'packageKey aur date required' });
    const slot = await Availability.findOneAndUpdate(
      { packageKey, date },
      { isBlocked: isBlocked !== false, blockReason: blockReason||'', ...(totalSlots && { totalSlots }) },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: isBlocked !== false ? 'Date block ho gayi' : 'Date unblock ho gayi', slot });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 14: ANALYTICS DASHBOARD ──
// ══════════════════════════════════════════════

const analyticsSchema = new mongoose.Schema({
  event:      { type: String, required: true },
  page:       { type: String, default: '' },
  packageKey: { type: String, default: '' },
  userId:     { type: String, default: 'anonymous' },
  sessionId:  { type: String, default: '' },
  meta:       { type: mongoose.Schema.Types.Mixed, default: {} },
  createdAt:  { type: Date, default: Date.now }
});
const AnalyticsEvent = mongoose.model('AnalyticsEvent', analyticsSchema);

app.post('/api/analytics/track', async (req, res) => {
  try {
    const { event, page, packageKey, sessionId, meta } = req.body;
    if (!event) return res.status(400).json({ success: false, message: 'Event required' });
    let userId = 'anonymous';
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) { try { userId = jwt.verify(token, process.env.JWT_SECRET).id; } catch {} }
    await AnalyticsEvent.create({ event, page: page||'', packageKey: packageKey||'', userId, sessionId: sessionId||'', meta: meta||{} });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

app.get('/api/analytics/summary', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const days  = parseInt(req.query.days) || 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const [totalEvents, pageViews, bookingAttempts, bookingSuccess, topPages, topPackages] = await Promise.all([
      AnalyticsEvent.countDocuments({ createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'page_view', createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'booking_attempt', createdAt: { $gte: since } }),
      AnalyticsEvent.countDocuments({ event: 'booking_success', createdAt: { $gte: since } }),
      AnalyticsEvent.aggregate([{ $match: { event: 'page_view', createdAt: { $gte: since } } }, { $group: { _id: '$page', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }]),
      AnalyticsEvent.aggregate([{ $match: { packageKey: { $ne: '' }, createdAt: { $gte: since } } }, { $group: { _id: '$packageKey', count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 10 }])
    ]);
    const conversionRate = bookingAttempts > 0 ? ((bookingSuccess / bookingAttempts) * 100).toFixed(1) : '0.0';
    res.json({ success: true, data: { period: `Last ${days} days`, totalEvents, pageViews, bookingAttempts, bookingSuccess, conversionRate: `${conversionRate}%`, topPages, topPackages } });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});


// ══════════════════════════════════════════════
// ── FEATURE 8: ERROR HANDLING ──
// ══════════════════════════════════════════════

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/'))
    return res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} exist nahi karta` });
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err.stack);
  if (req.path.startsWith('/api/'))
    return res.status(500).json({ success: false, message: 'Server mein kuch gadbad hui. Thodi der baad try karein.' });
  res.status(500).sendFile(path.join(__dirname, '../index.html'));
});


// ══════════════════════════════════════════════
// ── FEATURE 11: LIVE CHAT (SOCKET.IO) ──
// ══════════════════════════════════════════════

const httpServer  = http.createServer(app);
const io          = new Server(httpServer, { cors: { origin: '*', methods: ['GET','POST'] } });
const chatRooms   = new Map();

io.on('connection', (socket) => {
  socket.on('join_room', ({ sessionId, name }) => {
    socket.join(sessionId);
    socket.data.name      = name || 'Guest';
    socket.data.sessionId = sessionId;
    socket.emit('chat_history', chatRooms.get(sessionId) || []);
    io.to('admin_room').emit('new_session', { sessionId, name: socket.data.name, time: new Date() });
  });

  socket.on('user_message', ({ sessionId, message }) => {
    const msg = { from: 'user', name: socket.data.name || 'Guest', message, time: new Date() };
    if (!chatRooms.has(sessionId)) chatRooms.set(sessionId, []);
    chatRooms.get(sessionId).push(msg);
    socket.to(sessionId).emit('message', msg);
    io.to('admin_room').emit('message', { ...msg, sessionId });
  });

  socket.on('admin_join', () => {
    socket.join('admin_room');
    const sessions = [];
    chatRooms.forEach((msgs, id) => sessions.push({ sessionId: id, lastMessage: msgs[msgs.length - 1] }));
    socket.emit('all_sessions', sessions);
  });

  socket.on('admin_reply', ({ sessionId, message }) => {
    const msg = { from: 'admin', name: 'DevBhoomi Support', message, time: new Date() };
    if (chatRooms.has(sessionId)) chatRooms.get(sessionId).push(msg);
    io.to(sessionId).emit('message', msg);
  });
});


// ── START SERVER ──
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DevBhoomi Backend: http://localhost:${PORT}`);
  console.log(`✅ Health:            http://localhost:${PORT}/api/health`);
  console.log(`💬 Live Chat:         Socket.io active`);
  console.log(`📊 Analytics:         http://localhost:${PORT}/api/analytics/summary`);
  console.log(`🗺️  Sitemap:           http://localhost:${PORT}/sitemap.xml`);
});
