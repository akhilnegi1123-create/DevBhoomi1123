/* ═══════════════════════════════════════════════════════════
   DevBhoomi Travels — File-Based JSON Database Engine
   
   Ye module Node.js built-in 'fs' se JSON files mein data
   save karta hai. Server restart ke baad bhi data rehta hai.
   
   Collections (tables):
     users, bookings, contacts, reviews, newsletter, sessions
   
   Har collection ek alag .json file hai:
     backend/db/users.json
     backend/db/bookings.json
     ...
═══════════════════════════════════════════════════════════ */

const fs   = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname);

/* ── Collections config ── */
const COLLECTIONS = ['users','bookings','contacts','reviews','newsletter','sessions'];

/* ── Default seed data ── */
const SEEDS = {
  reviews: [
    {
      id: 'seed-rev-1',
      name: 'Priya Sharma', city: 'Mumbai',
      packageKey: 'chardham', packageName: 'Char Dham Yatra',
      rating: 5,
      text: 'Char Dham trip was beyond spiritual — every detail was perfect. Our guide Ramesh knew every story.',
      initials: 'PS', approved: true,
      createdAt: new Date('2025-03-01').toISOString()
    },
    {
      id: 'seed-rev-2',
      name: 'Arjun Mehta', city: 'Bangalore',
      packageKey: 'rishikesh', packageName: 'Rishikesh Adventure Rush',
      rating: 5,
      text: 'Rishikesh Adventure Rush was the best 5 days of my life. Grade-4 rafting was both safe and absolutely thrilling!',
      initials: 'AM', approved: true,
      createdAt: new Date('2025-02-15').toISOString()
    },
    {
      id: 'seed-rev-3',
      name: 'Sneha Gupta', city: 'Delhi',
      packageKey: 'vof', packageName: 'Valley of Flowers Trek',
      rating: 5,
      text: 'Valley of Flowers in August — I didn\'t know India had something this magical. Zero hassle, flawless planning.',
      initials: 'SG', approved: true,
      createdAt: new Date('2025-02-10').toISOString()
    }
  ]
};

/* ══════════════════════════════════════
   CORE ENGINE
══════════════════════════════════════ */

class JsonDB {
  constructor() {
    this._cache = {};
    this._init();
  }

  /* ── Initialize all collection files ── */
  _init() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    COLLECTIONS.forEach(col => {
      const file = this._file(col);
      if (!fs.existsSync(file)) {
        const seed = SEEDS[col] || [];
        fs.writeFileSync(file, JSON.stringify(seed, null, 2), 'utf8');
        console.log(`📁 Created: db/${col}.json ${seed.length ? `(${seed.length} seed records)` : ''}`);
      }
    });

    console.log('✅ Database initialized — all collections ready');
  }

  /* ── File path helper ── */
  _file(col) {
    return path.join(DB_DIR, `${col}.json`);
  }

  /* ── Read collection from disk ── */
  _read(col) {
    try {
      const raw = fs.readFileSync(this._file(col), 'utf8');
      return JSON.parse(raw);
    } catch (e) {
      console.error(`DB read error [${col}]:`, e.message);
      return [];
    }
  }

  /* ── Write collection to disk ── */
  _write(col, data) {
    try {
      fs.writeFileSync(this._file(col), JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (e) {
      console.error(`DB write error [${col}]:`, e.message);
      return false;
    }
  }

  /* ══════════════════════════════════════
     PUBLIC API — CRUD Operations
  ══════════════════════════════════════ */

  /* ── Find all (with optional filter) ── */
  findAll(col, filter = null) {
    let data = this._read(col);
    if (filter && typeof filter === 'object') {
      data = data.filter(item => {
        return Object.keys(filter).every(key => item[key] === filter[key]);
      });
    }
    return data;
  }

  /* ── Find one by any field ── */
  findOne(col, filter) {
    const data = this._read(col);
    return data.find(item => {
      return Object.keys(filter).every(key => item[key] === filter[key]);
    }) || null;
  }

  /* ── Find by ID ── */
  findById(col, id) {
    return this.findOne(col, { id });
  }

  /* ── Insert one record ── */
  insert(col, record) {
    const data = this._read(col);
    data.unshift(record); // newest first
    this._write(col, data);
    return record;
  }

  /* ── Update one record by ID ── */
  updateById(col, id, updates) {
    const data = this._read(col);
    const idx  = data.findIndex(item => item.id === id);
    if (idx === -1) return null;
    data[idx] = { ...data[idx], ...updates, updatedAt: new Date().toISOString() };
    this._write(col, data);
    return data[idx];
  }

  /* ── Update one by any field ── */
  updateOne(col, filter, updates) {
    const data = this._read(col);
    const idx  = data.findIndex(item =>
      Object.keys(filter).every(key => item[key] === filter[key])
    );
    if (idx === -1) return null;
    data[idx] = { ...data[idx], ...updates, updatedAt: new Date().toISOString() };
    this._write(col, data);
    return data[idx];
  }

  /* ── Delete by ID ── */
  deleteById(col, id) {
    const data   = this._read(col);
    const before = data.length;
    const after  = data.filter(item => item.id !== id);
    if (after.length === before) return false;
    this._write(col, after);
    return true;
  }

  /* ── Count records ── */
  count(col, filter = null) {
    return this.findAll(col, filter).length;
  }

  /* ── Sort records ── */
  findSorted(col, sortKey = 'createdAt', order = 'desc', filter = null) {
    let data = this.findAll(col, filter);
    data.sort((a, b) => {
      const va = a[sortKey] || '';
      const vb = b[sortKey] || '';
      const cmp = va > vb ? 1 : va < vb ? -1 : 0;
      return order === 'desc' ? -cmp : cmp;
    });
    return data;
  }

  /* ── Paginate ── */
  paginate(col, page = 1, limit = 20, filter = null, sortKey = 'createdAt') {
    const all   = this.findSorted(col, sortKey, 'desc', filter);
    const total = all.length;
    const start = (page - 1) * limit;
    const data  = all.slice(start, start + limit);
    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
      hasMore: start + limit < total
    };
  }

  /* ── Get stats ── */
  getStats() {
    const reviews  = this._read('reviews');
    const approved = reviews.filter(r => r.approved);
    const avgRating = approved.length
      ? (approved.reduce((s, r) => s + (r.rating || 0), 0) / approved.length).toFixed(1)
      : '4.9';

    return {
      totalUsers:      this.count('users'),
      totalBookings:   this.count('bookings'),
      totalContacts:   this.count('contacts'),
      totalReviews:    reviews.length,
      approvedReviews: approved.length,
      pendingReviews:  reviews.filter(r => !r.approved).length,
      newsletterSubs:  this.count('newsletter'),
      totalPackages:   13,
      avgRating:       parseFloat(avgRating),
      yearsExperience: 7,
      happyTravelers:  '8K+',
      destinations:    '50+'
    };
  }

  /* ── Backup all data ── */
  backup() {
    const backup = {};
    COLLECTIONS.forEach(col => { backup[col] = this._read(col); });
    const filename = path.join(DB_DIR, `backup_${Date.now()}.json`);
    fs.writeFileSync(filename, JSON.stringify(backup, null, 2), 'utf8');
    return filename;
  }

  /* ── Wipe a collection (for testing) ── */
  clear(col) {
    this._write(col, []);
  }
}

/* ── Export singleton instance ── */
module.exports = new JsonDB();
