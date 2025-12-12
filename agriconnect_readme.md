# 🌾 AgriConnect Pro - Farm-to-Market Ecosystem

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Feature Implementation Details](#feature-implementation-details)
- [Testing](#testing)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Project Overview

**AgriConnect Pro** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to bridge the gap between farmers and buyers while promoting sustainable agriculture, food technology innovation, and rural empowerment.

### 🎯 Project Goals
1. **Sustainable Agriculture**: Promote organic farming and eco-friendly practices
2. **Food Technology**: Digital marketplace connecting farm to table
3. **Rural Empowerment**: Eliminate middlemen, ensure fair pricing for farmers

### 👥 Target Audience
- **Farmers**: Sell crops directly to buyers
- **Buyers**: Purchase fresh produce directly from farms
- **Experts**: Share agricultural knowledge
- **Admins**: Manage platform operations

---

## 🔍 Problem Statement

### Current Agricultural Challenges:
1. **Middlemen Exploitation**: Farmers receive only 20-30% of final retail price
2. **Information Gap**: Lack of market price transparency
3. **Limited Reach**: Farmers struggle to find buyers beyond local markets
4. **Quality Concerns**: Buyers can't verify organic/sustainable practices
5. **Knowledge Deficit**: Limited access to modern farming techniques
6. **Trust Issues**: No direct communication between farmers and buyers

---

## 💡 Solution

AgriConnect Pro provides a **digital platform** that:

✅ **Connects** farmers directly with buyers (B2B and B2C)  
✅ **Empowers** farmers with fair pricing and market access  
✅ **Ensures** transparency through reviews and ratings  
✅ **Educates** through knowledge-sharing community  
✅ **Tracks** orders from farm to delivery  
✅ **Promotes** sustainable and organic farming practices  
✅ **Facilitates** real-time communication via chat  
✅ **Provides** data-driven insights through analytics  

---

## ✨ Features

### 1️⃣ **Advanced Authentication & Security** 🔐
- User registration with email verification
- JWT-based authentication with refresh tokens
- Password reset via OTP (One-Time Password)
- Role-based access control (Farmer/Buyer/Admin)
- Secure password hashing with bcrypt
- Session management
- Protected routes

**User Stories:**
- As a user, I can register with my email and verify my account
- As a user, I can securely log in and stay logged in
- As a user, I can reset my password if forgotten
- As an admin, I can manage user permissions

### 2️⃣ **Multi-Role Dashboard System** 👥

#### Farmer Dashboard:
- Manage crop listings (Add/Edit/Delete)
- View and manage orders
- Track sales analytics
- View earnings and revenue trends
- Manage profile and farm details
- Access knowledge hub

#### Buyer Dashboard:
- Browse available crops
- Search and filter products
- View order history
- Manage cart and wishlist
- Access chat with farmers
- View saved searches

#### Admin Dashboard:
- User management (approve/suspend users)
- Platform analytics and statistics
- Content moderation
- Order oversight
- Generate reports
- Manage categories and regions

**User Stories:**
- As a farmer, I can manage all my crops from one dashboard
- As a buyer, I can track all my purchases
- As an admin, I can monitor platform health

### 3️⃣ **Advanced Search & Filtering Engine** 🔍

**Features:**
- Full-text search with MongoDB text indexes
- Multi-parameter filtering:
  - Location/Region
  - Price range
  - Organic vs Conventional
  - Crop category
  - Availability status
  - Rating
- Autocomplete suggestions
- Search history
- Fuzzy search (typo-tolerant)
- Sort options (price, rating, distance, newest)

**Technical Implementation:**
- MongoDB text indexes for fast searching
- Debounced search input (300ms delay)
- Pagination for search results
- Query optimization with indexing

**User Stories:**
- As a buyer, I can search for "organic tomatoes near me"
- As a buyer, I can filter by price range and location
- As a buyer, I can see search suggestions as I type

### 4️⃣ **Real-Time Features with Socket.io** 🔴

**Features:**
- Live one-on-one chat between farmers and buyers
- Real-time notifications (orders, messages, reviews)
- Online/offline status indicators
- Typing indicators in chat
- Message read receipts
- Real-time marketplace updates

**Technical Implementation:**
- Socket.io for WebSocket connections
- Event-based communication
- Room-based chat architecture
- Connection state management
- Reconnection handling

**User Stories:**
- As a buyer, I can chat with farmers in real-time
- As a farmer, I receive instant notifications for new orders
- As a user, I can see when someone is typing

### 5️⃣ **Sophisticated Order Management System** 📦

**Order Workflow:**
```
Cart → Place Order → Pending → Confirmed → Packed → Shipped → Delivered
                                                              ↓
                                                          Cancelled
```

**Features:**
- Multi-step order tracking
- Order timeline with timestamps
- Order status updates
- Order cancellation with reason
- Bulk order support
- Order filtering and search
- Invoice generation (PDF)
- Order notifications at each stage

**Order Details Include:**
- Crop details with images
- Quantity and pricing
- Farmer information
- Delivery address
- Payment status
- Delivery estimates

**User Stories:**
- As a buyer, I can track my order status in real-time
- As a farmer, I can update order status as I process it
- As a buyer, I can download invoice for my orders

### 6️⃣ **Advanced Analytics Dashboard** 📊

#### Farmer Analytics:
- Total revenue (daily/weekly/monthly/yearly)
- Best-selling crops
- Order statistics
- Buyer demographics
- Sales trends with line charts
- Crop performance comparison
- Seasonal analysis

#### Buyer Analytics:
- Purchase history overview
- Spending patterns
- Favorite categories
- Order frequency

#### Admin Analytics:
- Total users (farmers, buyers)
- Platform revenue
- Total orders and transactions
- User growth over time
- Regional distribution
- Most popular crops
- Active users statistics

**Technical Implementation:**
- MongoDB aggregation pipelines
- Chart.js/Recharts for visualizations
- Date range filters
- Export to CSV/PDF
- Real-time data updates

**Chart Types:**
- Line charts (revenue trends)
- Bar charts (crop comparison)
- Pie charts (category distribution)
- Area charts (cumulative data)

**User Stories:**
- As a farmer, I can see which crops sell best
- As an admin, I can track platform growth
- As a user, I can export my data

### 7️⃣ **Comprehensive Review & Rating System** ⭐

**Features:**
- 5-star rating system
- Multi-criteria ratings:
  - Product Quality
  - Delivery Speed
  - Communication
  - Overall Experience
- Written reviews with character limit
- Image uploads in reviews (up to 5 images)
- Verified purchase badge
- Helpful votes on reviews
- Farmer responses to reviews
- Sort reviews (newest, highest rated, most helpful)
- Review moderation by admin

**Review Display:**
- Average rating calculation
- Rating distribution graph
- Total review count
- Verified vs unverified reviews

**User Stories:**
- As a buyer, I can rate and review my purchase
- As a farmer, I can respond to reviews
- As a buyer, I can see verified reviews before purchasing

### 8️⃣ **Advanced File Management** 📁

**Features:**
- Multiple image uploads (up to 10 per crop)
- Image compression and optimization
- Cloudinary integration for storage
- Image gallery with carousel
- Profile picture upload
- Document uploads (certifications, licenses)
- File type validation (jpg, png, pdf)
- File size limits (5MB per image)
- Drag-and-drop upload
- Image preview before upload

**Technical Implementation:**
- Multer for file handling
- Sharp for image compression
- Cloudinary SDK for cloud storage
- Base64 encoding for small images
- Lazy loading for images

**User Stories:**
- As a farmer, I can upload multiple crop images
- As a user, I can see high-quality images in gallery
- As a farmer, I can upload organic certification

### 9️⃣ **Geolocation & Distance-Based Features** 🗺️

**Features:**
- Store farmer locations (latitude/longitude)
- "Find farmers near me" functionality
- Distance calculation from buyer to farmer
- Sort results by proximity
- Regional filtering (state/district/village)
- Delivery radius settings for farmers
- Map view of farmer locations (optional)
- Location-based search

**Technical Implementation:**
- MongoDB geospatial queries ($near, $geoWithin)
- Haversine formula for distance calculation
- Geolocation indexes in database
- Browser Geolocation API
- Coordinates stored as GeoJSON

**Distance Calculation:**
```javascript
// Haversine formula
distance = 2 * R * arcsin(sqrt(sin²(Δφ/2) + cos φ1 * cos φ2 * sin²(Δλ/2)))
```

**User Stories:**
- As a buyer, I can find farmers within 50km radius
- As a buyer, I can see distance to each farmer
- As a farmer, I can set my delivery radius

### 🔟 **Content Management System (Knowledge Hub)** 📝

**Features:**
- Create, read, update, delete posts
- Rich text editor (formatting, lists, links)
- Image/video embeds
- Post categories (Organic Farming, Pest Control, Irrigation, etc.)
- Tags for better discoverability
- Like/bookmark posts
- Comment system with nested replies
- Share posts
- Post analytics (views, likes, comments)
- Draft saving
- Search within knowledge hub

**Post Types:**
- Farming tips and tricks
- Success stories
- Seasonal advisories
- Problem-solving threads
- Q&A format

**User Stories:**
- As a farmer, I can share my organic farming techniques
- As a user, I can learn from expert posts
- As a user, I can bookmark useful articles

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.2.0 | UI Library |
| React Router DOM | 6.x | Routing |
| Axios | 1.x | HTTP Client |
| Socket.io Client | 4.x | Real-time Communication |
| Context API | Built-in | State Management |
| React Hook Form | 7.x | Form Handling |
| Chart.js | 4.x | Data Visualization |
| React-Chartjs-2 | 5.x | Chart.js wrapper |
| Tailwind CSS | 3.x | Styling |
| React Icons | 4.x | Icons |
| React Toastify | 9.x | Notifications |
| Date-fns | 2.x | Date Manipulation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x+ | Runtime Environment |
| Express.js | 4.x | Web Framework |
| MongoDB | 6.x | Database |
| Mongoose | 7.x | ODM |
| Socket.io | 4.x | WebSocket Server |
| JWT | 9.x | Authentication |
| Bcrypt.js | 2.x | Password Hashing |
| Nodemailer | 6.x | Email Service |
| Multer | 1.x | File Upload |
| Cloudinary | 1.x | Image Storage |
| Express-validator | 7.x | Validation |
| Dotenv | 16.x | Environment Variables |
| Cors | 2.x | CORS Handling |

### Development Tools
| Tool | Purpose |
|------|---------|
| Nodemon | Auto-restart server |
| Postman | API Testing |
| MongoDB Compass | Database GUI |
| VS Code | Code Editor |
| Git | Version Control |

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
├─────────────────────────────────────────────────────────────┤
│  React Components → Context API → Axios → REST API          │
│                                                               │
│  Socket.io Client ←─────────────────→ Socket.io Server      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         SERVER SIDE                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐   ┌──────────────┐   │
│  │   Routes     │───→│ Controllers  │───→│   Services   │   │
│  └──────────────┘    └──────────────┘   └──────────────┘   │
│         ↓                    ↓                    ↓          │
│  ┌──────────────┐    ┌──────────────┐   ┌──────────────┐   │
│  │ Middleware   │    │ Validation   │   │    Models    │   │
│  └──────────────┘    └──────────────┘   └──────────────┘   │
│                                                   ↓          │
└───────────────────────────────────────────────────┼──────────┘
                                                    ↓
┌─────────────────────────────────────────────────────────────┐
│                        DATABASE LAYER                        │
├─────────────────────────────────────────────────────────────┤
│                       MongoDB                                │
│  Collections: users, crops, orders, reviews, chats,         │
│              notifications, posts, comments                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     EXTERNAL SERVICES                        │
├─────────────────────────────────────────────────────────────┤
│  Cloudinary (Images) | Nodemailer (Emails)                  │
└─────────────────────────────────────────────────────────────┘
```

### Request Flow:
1. **User Action** → React Component
2. **Component** → Context API (State Management)
3. **API Call** → Axios HTTP Request
4. **Backend** → Route → Middleware (Auth) → Controller
5. **Controller** → Service Layer (Business Logic)
6. **Service** → Model (Database Operations)
7. **Database** → MongoDB Query Execution
8. **Response** → Controller → Client
9. **Update UI** → React Re-render

---

## 🗄️ Database Schema

### 1. User Schema
```javascript
{
  _id: ObjectId,
  name: String (required, trim),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  role: String (enum: ['farmer', 'buyer', 'admin'], default: 'buyer'),
  phone: String (required),
  profilePicture: String (URL),
  
  // For Farmers
  farmDetails: {
    farmName: String,
    farmSize: Number, // in acres
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number], // [longitude, latitude]
      address: String,
      district: String,
      state: String,
      pincode: String
    },
    certifications: [String], // URLs to certificates
    description: String
  },
  
  // For Buyers
  shippingAddresses: [{
    label: String, // 'Home', 'Office'
    address: String,
    city: String,
    state: String,
    pincode: String,
    phone: String,
    isDefault: Boolean
  }],
  
  // Authentication
  isEmailVerified: Boolean (default: false),
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  refreshToken: String,
  
  // Status
  isActive: Boolean (default: true),
  lastLogin: Date,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
index: { email: 1 } (unique)
index: { 'farmDetails.location': '2dsphere' } (geospatial)
```

### 2. Crop Schema
```javascript
{
  _id: ObjectId,
  farmer: ObjectId (ref: 'User', required),
  
  // Basic Info
  name: String (required),
  category: String (enum: ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices']),
  variety: String, // e.g., 'Cherry Tomato', 'Alphonso Mango'
  description: String (required),
  
  // Pricing
  price: Number (required), // per unit
  unit: String (enum: ['kg', 'quintal', 'ton', 'piece', 'dozen']),
  minimumOrder: Number (default: 1),
  
  // Stock
  availableQuantity: Number (required),
  harvestDate: Date,
  expiryDate: Date,
  
  // Attributes
  isOrganic: Boolean (default: false),
  isCertified: Boolean (default: false),
  certificationDetails: String,
  
  // Media
  images: [String], // Cloudinary URLs
  
  // Location (inherited from farmer but cached)
  location: {
    type: { type: String, enum: ['Point'] },
    coordinates: [Number],
    district: String,
    state: String
  },
  
  // Stats
  viewCount: Number (default: 0),
  orderCount: Number (default: 0),
  averageRating: Number (default: 0),
  totalReviews: Number (default: 0),
  
  // Status
  status: String (enum: ['available', 'out_of_stock', 'discontinued'], default: 'available'),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
index: { farmer: 1 }
index: { name: 'text', description: 'text' } (for search)
index: { category: 1, isOrganic: 1 }
index: { location: '2dsphere' }
```

### 3. Order Schema
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique, auto-generated), // ORD-20240115-001
  
  // Parties
  buyer: ObjectId (ref: 'User', required),
  farmer: ObjectId (ref: 'User', required),
  
  // Items
  items: [{
    crop: ObjectId (ref: 'Crop'),
    name: String, // cached
    quantity: Number,
    unit: String,
    pricePerUnit: Number,
    totalPrice: Number,
    image: String // first image cached
  }],
  
  // Pricing
  subtotal: Number,
  deliveryCharge: Number (default: 0),
  tax: Number (default: 0),
  discount: Number (default: 0),
  totalAmount: Number (required),
  
  // Delivery
  shippingAddress: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    phone: String
  },
  
  // Status Management
  status: String (enum: [
    'pending',
    'confirmed',
    'packed',
    'shipped',
    'delivered',
    'cancelled'
  ], default: 'pending'),
  
  statusHistory: [{
    status: String,
    timestamp: Date,
    note: String
  }],
  
  // Additional Info
  deliveryDate: Date,
  expectedDeliveryDate: Date,
  cancellationReason: String,
  specialInstructions: String,
  
  // Payment
  paymentMethod: String (enum: ['cod', 'online'], default: 'cod'),
  paymentStatus: String (enum: ['pending', 'completed', 'refunded'], default: 'pending'),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
index: { buyer: 1, createdAt: -1 }
index: { farmer: 1, createdAt: -1 }
index: { orderNumber: 1 } (unique)
index: { status: 1 }
```

### 4. Review Schema
```javascript
{
  _id: ObjectId,
  
  // References
  crop: ObjectId (ref: 'Crop', required),
  order: ObjectId (ref: 'Order', required),
  buyer: ObjectId (ref: 'User', required),
  farmer: ObjectId (ref: 'User', required),
  
  // Ratings (1-5)
  overallRating: Number (required, min: 1, max: 5),
  qualityRating: Number (min: 1, max: 5),
  deliveryRating: Number (min: 1, max: 5),
  communicationRating: Number (min: 1, max: 5),
  
  // Review Content
  title: String,
  comment: String (required, maxlength: 1000),
  images: [String], // Up to 5 images
  
  // Verification
  isVerifiedPurchase: Boolean (default: true),
  
  // Engagement
  helpfulCount: Number (default: 0),
  helpfulBy: [ObjectId] (ref: 'User'),
  
  // Farmer Response
  farmerResponse: {
    comment: String,
    respondedAt: Date
  },
  
  // Moderation
  isApproved: Boolean (default: true),
  moderatedBy: ObjectId (ref: 'User'),
  moderationNote: String,
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
index: { crop: 1, createdAt: -1 }
index: { farmer: 1 }
index: { buyer: 1 }
index: { order: 1 } (unique)
```

### 5. Chat Schema
```javascript
{
  _id: ObjectId,
  
  // Participants
  participants: [ObjectId] (ref: 'User', required),
  farmer: ObjectId (ref: 'User', required),
  buyer: ObjectId (ref: 'User', required),
  
  // Messages
  messages: [{
    sender: ObjectId (ref: 'User'),
    content: String (required),
    timestamp: Date (default: Date.now),
    isRead: Boolean (default: false),
    readAt: Date
  }],
  
  // Last Message Info (for chat list)
  lastMessage: {
    content: String,
    sender: ObjectId,
    timestamp: Date
  },
  
  // Unread Counts
  unreadCount: {
    farmer: Number (default: 0),
    buyer: Number (default: 0)
  },
  
  // Status
  isActive: Boolean (default: true),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
index: { participants: 1 }
index: { farmer: 1, buyer: 1 } (unique)
```

### 6. Notification Schema
```javascript
{
  _id: ObjectId,
  
  // Recipient
  user: ObjectId (ref: 'User', required),
  
  // Content
  type: String (enum: [
    'order_placed',
    'order_confirmed',
    'order_shipped',
    'order_delivered',
    'order_cancelled',
    'new_message',
    'new_review',
    'review_response',
    'system'
  ]),
  title: String (required),
  message: String (required),
  
  // Links
  link: String, // URL to relevant page
  relatedId: ObjectId, // Order ID, Review ID, etc.
  
  // Status
  isRead: Boolean (default: false),
  readAt: Date,
  
  // Timestamps
  createdAt: Date
}

// Indexes
index: { user: 1, createdAt: -1 }
index: { isRead: 1 }
```

### 7. Post Schema (Knowledge Hub)
```javascript
{
  _id: ObjectId,
  
  // Author
  author: ObjectId (ref: 'User', required),
  
  // Content
  title: String (required, maxlength: 200),
  content: String (required), // Rich text HTML
  excerpt: String (maxlength: 300),
  
  // Categorization
  category: String (enum: [
    'Organic Farming',
    'Pest Control',
    'Irrigation',
    'Soil Management',
    'Crop Rotation',
    'Success Stories',
    'General Tips'
  ]),
  tags: [String],
  
  // Media
  featuredImage: String,
  images: [String],
  
  // Engagement
  likes: [ObjectId] (ref: 'User'),
  likeCount: Number (default: 0),
  bookmarks: [ObjectId] (ref: 'User'),
  bookmarkCount: Number (default: 0),
  viewCount: Number (default: 0),
  commentCount: Number (default: 0),
  
  // Status
  status: String (enum: ['draft', 'published'], default: 'published'),
  isApproved: Boolean (default: true),
  
  // SEO
  slug: String (unique),
  
  // Timestamps
  publishedAt: Date,
  createdAt: Date,
  updatedAt: Date
}

// Indexes
index: { author: 1 }
index: { title: 'text', content: 'text', tags: 'text' }
index: { slug: 1 } (unique)
index: { category: 1, publishedAt: -1 }
```

### 8. Comment Schema
```javascript
{
  _id: ObjectId,
  
  // References
  post: ObjectId (ref: 'Post', required),
  author: ObjectId (ref: 'User', required),
  
  // Content
  content: String (required, maxlength: 500),
  
  // Nested Comments
  parentComment: ObjectId (ref: 'Comment'), // For replies
  
  // Engagement
  likes: [ObjectId] (ref: 'User'),
  likeCount: Number (default: 0),
  
  // Moderation
  isApproved: Boolean (default: true),
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}

// Indexes
index: { post: 1, createdAt: -1 }
index: { author: 1 }
index: { parentComment: 1 }
```

---

## 📡 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+911234567890",
  "role": "farmer",
  "farmDetails": {
    "farmName": "Green Valley Farm",
    "farmSize": 5,
    "location": {
      "address": "123 Farm Road",
      "district": "Pune",
      "state": "Maharashtra",
      "pincode": "411001",
      "coordinates": [73.8567, 18.5204]
    }
  }
}

Response (201):
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "farmer"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  }
}
```

#### 2. Get All Crops (with Search & Filters)
```http
GET /api/crops?search=tomato&category=Vegetables&isOrganic=true&minPrice=50&maxPrice=100&location=Pune&sortBy=price&order=asc&page=1&limit=10
Authorization: Bearer {token} (optional)

Query Parameters:
- search: string (search in name and description)
- category: string
- isOrganic: boolean
- minPrice: number
- maxPrice: number
- location: string (district/state)
- sortBy: string (price, rating, createdAt, distance)
- order: string (asc, desc)
- page: number (default: 1)
- limit: number (default: 10)
- lat: number (user latitude for distance sort)
- lng: number (user longitude for distance sort)

Response (200):
{
  "success": true,
  "data": {
    "crops": [
      {
        "_id": "crop_id",
        "name": "Organic Tomatoes",
        "category": "Vegetables",
        "price": 60,
        "unit": "kg",
        "images": ["url1", "url2"],
        "farmer": {
          "_id": "farmer_id",
          "name": "John Doe",
          "farmDetails": {
            "farmName": "Green Valley"
          }
        },
        "averageRating": 4.5,
        "totalReviews": 10,
        "distance": 12.5, // if lat/lng provided
        "isOrganic": true
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCrops": 48,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### 3. Get Crop by ID
```http
GET /api/crops/:id
Authorization: Bearer {token} (optional)

Response (200):
{
  "success": true,
  "data": {
    "crop": {
      "_id": "crop_id",
      "name": "Organic Tomatoes",
      "category": "Vegetables",
      "variety": "Cherry Tomato",
      "description": "Fresh organic tomatoes",
      "price": 60,
      "unit": "kg",
      "minimumOrder": 5,
      "availableQuantity": 100,
      "isOrganic": true,
      "images": ["url1", "url2", "url3"],
      "farmer": {
        "_id": "farmer_id",
        "name": "John Doe",
        "profilePicture": "url",
        "farmDetails": {
          "farmName": "Green Valley Farm",
          "location": { /* location object */ }
        }
      },
      "averageRating": 4.5,
      "totalReviews": 10,
      "viewCount": 150,
      "createdAt": "2024-01-15T10:00:00Z"
    },
    "relatedCrops": [ /* similar crops */ ]
  }
}
```

#### 4. Update Crop
```http
PUT /api/crops/:id
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "price": 65,
  "availableQuantity": 80,
  "description": "Updated description"
}

Response (200):
{
  "success": true,
  "message": "Crop updated successfully",
  "data": {
    "crop": { /* updated crop object */ }
  }
}
```

#### 5. Delete Crop
```http
DELETE /api/crops/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Crop deleted successfully"
}
```

#### 6. Get My Crops (Farmer)
```http
GET /api/crops/my-crops?status=available&page=1&limit=10
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "crops": [ /* farmer's crops */ ],
    "pagination": { /* pagination info */ }
  }
}
```

### Order Endpoints

#### 1. Create Order
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "items": [
    {
      "crop": "crop_id",
      "quantity": 10
    }
  ],
  "shippingAddress": {
    "address": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "phone": "+919876543210"
  },
  "paymentMethod": "cod",
  "specialInstructions": "Please deliver before 5 PM"
}

Response (201):
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "order": {
      "_id": "order_id",
      "orderNumber": "ORD-20240115-001",
      "items": [ /* order items */ ],
      "totalAmount": 600,
      "status": "pending",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}
```

#### 2. Get All Orders (Buyer)
```http
GET /api/orders/my-orders?status=pending&page=1&limit=10
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "orders": [
      {
        "_id": "order_id",
        "orderNumber": "ORD-20240115-001",
        "farmer": {
          "name": "John Doe",
          "farmDetails": { "farmName": "Green Valley" }
        },
        "items": [ /* items */ ],
        "totalAmount": 600,
        "status": "pending",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": { /* pagination */ }
  }
}
```

#### 3. Get Farmer Orders
```http
GET /api/orders/farmer-orders?status=confirmed&page=1
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "orders": [ /* farmer's orders */ ],
    "pagination": { /* pagination */ }
  }
}
```

#### 4. Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "order": {
      "_id": "order_id",
      "orderNumber": "ORD-20240115-001",
      "buyer": { /* buyer details */ },
      "farmer": { /* farmer details */ },
      "items": [ /* detailed items */ ],
      "totalAmount": 600,
      "status": "shipped",
      "statusHistory": [
        {
          "status": "pending",
          "timestamp": "2024-01-15T10:00:00Z"
        },
        {
          "status": "confirmed",
          "timestamp": "2024-01-15T11:00:00Z",
          "note": "Order confirmed by farmer"
        }
      ],
      "shippingAddress": { /* address */ },
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}
```

#### 5. Update Order Status
```http
PUT /api/orders/:id/status
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "status": "confirmed",
  "note": "Order confirmed and will be packed soon"
}

Response (200):
{
  "success": true,
  "message": "Order status updated",
  "data": {
    "order": { /* updated order */ }
  }
}
```

#### 6. Cancel Order
```http
PUT /api/orders/:id/cancel
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "reason": "Changed my mind"
}

Response (200):
{
  "success": true,
  "message": "Order cancelled successfully"
}
```

### Review Endpoints

#### 1. Create Review
```http
POST /api/reviews
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request Body:
{
  "order": "order_id",
  "crop": "crop_id",
  "overallRating": 5,
  "qualityRating": 5,
  "deliveryRating": 4,
  "communicationRating": 5,
  "title": "Excellent quality!",
  "comment": "Fresh and organic tomatoes. Highly recommended!",
  "images": [File, File]
}

Response (201):
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "review": { /* review object */ }
  }
}
```

#### 2. Get Crop Reviews
```http
GET /api/reviews/crop/:cropId?page=1&limit=10&sortBy=newest
Authorization: Bearer {token} (optional)

Response (200):
{
  "success": true,
  "data": {
    "reviews": [
      {
        "_id": "review_id",
        "buyer": {
          "name": "Jane Smith",
          "profilePicture": "url"
        },
        "overallRating": 5,
        "qualityRating": 5,
        "comment": "Excellent quality!",
        "images": ["url1", "url2"],
        "isVerifiedPurchase": true,
        "helpfulCount": 5,
        "farmerResponse": {
          "comment": "Thank you for your feedback!",
          "respondedAt": "2024-01-16T10:00:00Z"
        },
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "stats": {
      "averageRating": 4.5,
      "totalReviews": 10,
      "ratingDistribution": {
        "5": 6,
        "4": 3,
        "3": 1,
        "2": 0,
        "1": 0
      }
    },
    "pagination": { /* pagination */ }
  }
}
```

#### 3. Mark Review Helpful
```http
POST /api/reviews/:id/helpful
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Marked as helpful"
}
```

#### 4. Respond to Review (Farmer)
```http
POST /api/reviews/:id/respond
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "comment": "Thank you for your kind words!"
}

Response (200):
{
  "success": true,
  "message": "Response added successfully"
}
```

### Chat Endpoints

#### 1. Get or Create Chat
```http
POST /api/chats/get-or-create
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "participantId": "farmer_id_or_buyer_id"
}

Response (200):
{
  "success": true,
  "data": {
    "chat": {
      "_id": "chat_id",
      "participants": ["user1_id", "user2_id"],
      "messages": [ /* recent messages */ ],
      "lastMessage": { /* last message */ }
    }
  }
}
```

#### 2. Get All Chats
```http
GET /api/chats
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "chats": [
      {
        "_id": "chat_id",
        "participant": {
          "name": "John Doe",
          "profilePicture": "url",
          "role": "farmer"
        },
        "lastMessage": {
          "content": "Hello",
          "timestamp": "2024-01-15T10:00:00Z"
        },
        "unreadCount": 3
      }
    ]
  }
}
```

#### 3. Send Message (via Socket.io)
```javascript
// Socket event
socket.emit('send_message', {
  chatId: 'chat_id',
  content: 'Hello, I want to order tomatoes'
});

// Socket listener
socket.on('receive_message', (data) => {
  // data contains new message
});
```

#### 4. Mark Messages as Read
```http
PUT /api/chats/:chatId/read
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Messages marked as read"
}
```

### Analytics Endpoints

#### 1. Get Farmer Analytics
```http
GET /api/analytics/farmer?period=month&year=2024&month=1
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "overview": {
      "totalRevenue": 50000,
      "totalOrders": 120,
      "totalCrops": 15,
      "averageRating": 4.5
    },
    "revenueData": [
      { "date": "2024-01-01", "revenue": 1500 },
      { "date": "2024-01-02", "revenue": 2000 }
    ],
    "topCrops": [
      {
        "crop": { "name": "Organic Tomatoes", "image": "url" },
        "totalOrders": 45,
        "revenue": 15000
      }
    ],
    "orderStats": {
      "pending": 5,
      "confirmed": 10,
      "delivered": 100,
      "cancelled": 5
    }
  }
}
```

#### 2. Get Admin Analytics
```http
GET /api/analytics/admin
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "overview": {
      "totalUsers": 1000,
      "totalFarmers": 250,
      "totalBuyers": 750,
      "totalOrders": 5000,
      "totalRevenue": 500000
    },
    "userGrowth": [
      { "month": "Jan", "users": 100 },
      { "month": "Feb", "users": 150 }
    ],
    "topCategories": [ /* category stats */ ],
    "regionalData": [ /* region-wise stats */ ]
  }
}
```

### Post Endpoints (Knowledge Hub)

#### 1. Create Post
```http
POST /api/posts
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request Body:
{
  "title": "10 Tips for Organic Farming",
  "content": "<p>Rich text content...</p>",
  "category": "Organic Farming",
  "tags": ["organic", "tips", "sustainable"],
  "featuredImage": File,
  "status": "published"
}

Response (201):
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "post": { /* post object */ }
  }
}
```

#### 2. Get All Posts
```http
GET /api/posts?category=Organic Farming&search=tips&page=1&limit=10
Authorization: Bearer {token} (optional)

Response (200):
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "post_id",
        "title": "10 Tips for Organic Farming",
        "excerpt": "Learn the best practices...",
        "featuredImage": "url",
        "author": {
          "name": "John Doe",
          "profilePicture": "url"
        },
        "category": "Organic Farming",
        "tags": ["organic", "tips"],
        "likeCount": 45,
        "commentCount": 12,
        "viewCount": 500,
        "publishedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": { /* pagination */ }
  }
}
```

#### 3. Get Post by ID
```http
GET /api/posts/:id
Authorization: Bearer {token} (optional)

Response (200):
{
  "success": true,
  "data": {
    "post": {
      /* full post details */
      "isLiked": true, // if user is logged in
      "isBookmarked": false
    },
    "relatedPosts": [ /* similar posts */ ]
  }
}
```

#### 4. Like/Unlike Post
```http
POST /api/posts/:id/like
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Post liked",
  "data": {
    "likeCount": 46
  }
}
```

#### 5. Add Comment
```http
POST /api/posts/:id/comments
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "content": "Great tips! Thank you for sharing.",
  "parentComment": "comment_id" // optional, for replies
}

Response (201):
{
  "success": true,
  "message": "Comment added",
  "data": {
    "comment": { /* comment object */ }
  }
}
```

### Notification Endpoints

#### 1. Get All Notifications
```http
GET /api/notifications?page=1&limit=20
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "notifications": [
      {
        "_id": "notif_id",
        "type": "order_placed",
        "title": "New Order",
        "message": "You have a new order #ORD-001",
        "link": "/orders/order_id",
        "isRead": false,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "unreadCount": 5
  }
}
```

#### 2. Mark as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Notification marked as read"
}
```

#### 3. Mark All as Read
```http
PUT /api/notifications/read-all
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## 🚀 Installation Guide

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher)
- **npm** or **yarn**
- **Git**
- **Cloudinary Account** (free tier)
- **Gmail Account** (for sending emails)

### Step 1: Clone Repository
```bash
# Clone the repository
git clone https://github.com/yourusername/agriconnect-pro.git

# Navigate to project directory
cd agriconnect-pro
```

### Step 2: Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations
nano .env
```

### Step 3: Frontend Setup
```bash
# Navigate to frontend folder (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configurations
nano .env
```

### Step 4: Database Setup
```bash
# Make sure MongoDB is running
# If using local MongoDB:
mongod

# If using MongoDB Atlas:
# Just use the connection string in .env
```

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

### Step 6: Create Admin Account (Optional)
```bash
# Run seed script
cd backend
npm run seed:admin

# Or manually create via MongoDB:
# Set role: "admin" for any user
```

---

## 🔐 Environment Variables

### Backend (.env)
```bash
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/agriconnect
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agriconnect

# JWT Secrets
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long
JWT_REFRESH_SECRET=your_refresh_token_secret_key_min_32_chars
JWT_EXPIRE=1d
JWT_REFRESH_EXPIRE=7d

# Cloudinary (Get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password
EMAIL_FROM=AgriConnect <noreply@agriconnect.com>

# Frontend URL
FRONTEND_URL=http://localhost:3000

# OTP Configuration
OTP_EXPIRE_MINUTES=10

# File Upload
MAX_FILE_SIZE=5242880
# 5MB in bytes

# Rate Limiting
RATE_LIMIT_WINDOW=15
# minutes
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```bash
# API URL
REACT_APP_API_URL=http://localhost:5000/api

# Socket URL
REACT_APP_SOCKET_URL=http://localhost:5000

# Google Maps API Key (optional)
REACT_APP_GOOGLE_MAPS_KEY=your_google_maps_api_key

# App Configuration
REACT_APP_NAME=AgriConnect Pro
REACT_APP_VERSION=1.0.0
```

### How to Get Cloudinary Credentials:
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard
4. Copy: Cloud Name, API Key, API Secret

### How to Get Gmail App Password:
1. Go to Google Account Settings
2. Security → 2-Step Verification (enable it)
3. App Passwords
4. Generate new app password
5. Copy the 16-character password

---

## 📁 Project Structure

```
agriconnect-pro/
│
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   ├── cloudinary.js         # Cloudinary configuration
│   │   └── email.js              # Nodemailer configuration
│   │
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── userController.js     # User management
│   │   ├── cropController.js     # Crop CRUD operations
│   │   ├── orderController.js    # Order management
│   │   ├── reviewController.js   # Review system
│   │   ├── chatController.js     # Chat functionality
│   │   ├── notificationController.js
│   │   ├── analyticsController.js
│   │   └── postController.js     # Knowledge Hub
│   │
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Crop.js               # Crop schema
│   │   ├── Order.js              # Order schema
│   │   ├── Review.js             # Review schema
│   │   ├── Chat.js               # Chat schema
│   │   ├── Notification.js       # Notification schema
│   │   ├── Post.js               # Post schema
│   │   └── Comment.js            # Comment schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── cropRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── analyticsRoutes.js
│   │   └── postRoutes.js
│   │
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   ├── roleCheck.js          # Role-based access
│   │   ├── errorHandler.js       # Global error handler
│   │   ├── validation.js         # Input validation
│   │   ├── upload.js             # Multer configuration
│   │   └── rateLimiter.js        # Rate limiting
│   │
│   ├── utils/
│   │   ├── jwt.js                # JWT helpers
│   │   ├── email.js              # Email templates
│   │   ├── otp.js                # OTP generation
│   │   ├── validators.js         # Custom validators
│   │   ├── helpers.js            # Utility functions
│   │   └── constants.js          # App constants
│   │
│   ├── services/
│   │   ├── emailService.js       # Email sending logic
│   │   ├── uploadService.js      # File upload logic
│   │   ├── notificationService.js
│   │   └── analyticsService.js   # Analytics calculations
│   │
│   ├── socket/
│   │   ├── socketHandler.js      # Socket.io logic
│   │   └── socketEvents.js       # Socket event handlers
│   │
│   ├── .env                      # Environment variables
│   ├── .env.example              # Example env file
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                 # Entry point
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── ProtectedRoute.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   ├── FilterPanel.jsx
│   │   │   │   ├── Pagination.jsx
│   │   │   │   ├── ImageGallery.jsx
│   │   │   │   ├── RatingStars.jsx
│   │   │   │   └── Modal.jsx
│   │   │   │
│   │   │   ├── farmer/
│   │   │   │   ├── FarmerDashboard.jsx
│   │   │   │   ├── CropList.jsx
│   │   │   │   ├── AddCropForm.jsx
│   │   │   │   ├── EditCropForm.jsx
│   │   │   │   ├── FarmerOrders.jsx
│   │   │   │   ├── FarmerAnalytics.jsx
│   │   │   │   └── FarmerProfile.jsx
│   │   │   │
│   │   │   ├── buyer/
│   │   │   │   ├── BuyerDashboard.jsx
│   │   │   │   ├── Marketplace.jsx
│   │   │   │   ├── CropCard.jsx
│   │   │   │   ├── CropDetails.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── OrderHistory.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   └── BuyerProfile.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── UserManagement.jsx
│   │   │   │   ├── OrderManagement.jsx
│   │   │   │   ├── ContentModeration.jsx
│   │   │   │   └── AdminAnalytics.jsx
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── ResetPassword.jsx
│   │   │   │   └── VerifyEmail.jsx
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   ├── ChatList.jsx
│   │   │   │   ├── ChatWindow.jsx
│   │   │   │   └── MessageBubble.jsx
│   │   │   │
│   │   │   ├── reviews/
│   │   │   │   ├── ReviewList.jsx
│   │   │   │   ├── ReviewCard.jsx
│   │   │   │   ├── AddReview.jsx
│   │   │   │   └── RatingDistribution.jsx
│   │   │   │
│   │   │   ├── posts/
│   │   │   │   ├── PostList.jsx
│   │   │   │   ├── PostCard.jsx
│   │   │   │   ├── PostDetails.jsx
│   │   │   │   ├── CreatePost.jsx
│   │   │   │   └── CommentSection.jsx
│   │   │   │
│   │   │   └── analytics/
│   │   │       ├── RevenueChart.jsx
│   │   │       ├── OrderStats.jsx
│   │   │       ├── CropPerformance.jsx
│   │   │       └── UserGrowth.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Auth state
│   │   │   ├── CartContext.jsx      # Cart state
│   │   │   ├── SocketContext.jsx    # Socket connection
│   │   │   └── NotificationContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useSocket.js
│   │   │   ├── useDebounce.js
│   │   │   ├── useInfiniteScroll.js
│   │   │   └── useGeolocation.js
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── cropService.js
│   │   │   ├── orderService.js
│   │   │   ├── reviewService.js
│   │   │   ├── chatService.js
│   │   │   ├── postService.js
│   │   │   └── analyticsService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.js        # Date, price formatters
│   │   │   ├── validators.js        # Form validators
│   │   │   ├── constants.js         # App constants
│   │   │   └── helpers.js           # Utility functions
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── tailwind.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css
│   │   ├── index.js                 # Entry point
│   │   └── index.css
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
├── .gitignore
├── README.md
└── package.json (root - optional)
```

---

## 👥 User Roles

### 1. **Farmer** 🌾
**Capabilities:**
- Register with farm details
- Add/Edit/Delete crop listings
- Upload multiple crop images
- Manage inventory and pricing
- View and manage orders
- Update order status
- Chat with buyers
- Respond to reviews
- Create knowledge posts
- View analytics (revenue, sales, trends)
- Update farm profile

**Dashboard Features:**
- Total revenue
- Active orders
- Low stock alerts
- Recent orders
- Best-selling crops
- Revenue charts

### 2. **Buyer** 🛒
**Capabilities:**
- Browse marketplace
- Search and filter crops
- View crop details
- Add to cart
- Place orders
- Track order status
- Chat with farmers
- Write reviews with images
- Like/bookmark posts
- Manage profile and addresses
- View purchase history

**Dashboard Features:**
- Recent orders
- Favorite farmers
- Saved searches
- Spending overview
- Recommended products

### 3. **Admin** 👨‍💼
**Capabilities:**
- View platform analytics
- Manage users (approve/suspend)
- Monitor all orders
- Moderate content (posts, reviews)
- Generate reports
- View system statistics
- Manage categories
- Handle disputes
- Send platform notifications

**Dashboard Features:**
- Total users (farmers, buyers)
- Total revenue
- Total orders
- User growth charts
- Regional statistics
- Most popular crops
- Platform health metrics

---

## 🔧 Feature Implementation Details

### 1. Authentication Flow

#### Registration:
```javascript
// Backend - authController.js
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, farmDetails } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      farmDetails: role === 'farmer' ? farmDetails : undefined,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
    
    // Send verification email
    await sendVerificationEmail(email, verificationToken);
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    
    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        tokens: { accessToken, refreshToken }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
```

#### Frontend - Login Component:
```javascript
// Login.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login(formData);
      setUser(response.data.user);
      setToken(response.data.tokens.accessToken);
      localStorage.setItem('refreshToken', response.data.tokens.refreshToken);
      // Redirect based on role
      if (response.data.user.role === 'farmer') {
        navigate('/farmer/dashboard');
      } else if (response.data.user.role === 'buyer') {
        navigate('/buyer/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    // JSX for login form
  );
};
```

### 2. Real-time Chat Implementation

#### Backend - Socket Handler:
```javascript
// socket/socketHandler.js
import Chat from '../models/Chat.js';

export const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // User joins their room
    socket.on('join', (userId) => {
      socket.join(userId);
      socket.userId = userId;
    });
    
    // Send message
    socket.on('send_message', async (data) => {
      try {
        const { chatId, senderId, receiverId, content } = data;
        
        // Find or create chat
        let chat = await Chat.findById(chatId);
        if (!chat) {
          chat = await Chat.create({
            participants: [senderId, receiverId],
            farmer: /* determine farmer */,
            buyer: /* determine buyer */,
            messages: []
          });
        }
        
        // Add message
        const newMessage = {
          sender: senderId,
          content,
          timestamp: new Date(),
          isRead: false
        };
        
        chat.messages.push(newMessage);
        chat.lastMessage = {
          content,
          sender: senderId,
          timestamp: new Date()
        };
        
        // Update unread count
        if (receiverId === chat.farmer.toString()) {
          chat.unreadCount.farmer += 1;
        } else {
          chat.unreadCount.buyer += 1;
        }
        
        await chat.save();
        
        // Emit to both users
        io.to(receiverId).emit('receive_message', {
          chatId: chat._id,
          message: newMessage
        });
        
        socket.emit('message_sent', {
          chatId: chat._id,
          message: newMessage
        });
        
        // Send notification
        // Create notification in DB and emit
        
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });
    
    // Typing indicator
    socket.on('typing', ({ chatId, userId }) => {
      socket.to(chatId).emit('user_typing', { userId });
    });
    
    socket.on('stop_typing', ({ chatId, userId }) => {
      socket.to(chatId).emit('user_stop_typing', { userId });
    });
    
    // Disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
```

#### Frontend - Chat Component:
```javascript
// ChatWindow.jsx
import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const ChatWindow = ({ chatId, participant }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    // Load existing messages
    loadMessages();
    
    // Listen for new messages
    socket.on('receive_message', (data) => {
      if (data.chatId === chatId) {
        setMessages(prev => [...prev, data.message]);
      }
    });
    
    // Listen for typing
    socket.on('user_typing', () => {
      setIsTyping(true);
    });
    
    socket.on('user_stop_typing', () => {
      setIsTyping(false);
    });
    
    return () => {
      socket.off('receive_message');
      socket.off('user_typing');
      socket.off('user_stop_typing');
    };
  }, [chatId]);
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.emit('send_message', {
        chatId,
        senderId: user._id,
        receiverId: participant._id,
        content: newMessage
      });
      setNewMessage('');
    }
  };
  
  const handleTyping = () => {
    socket.emit('typing', { chatId, userId: user._id });
    // Debounce stop typing
    setTimeout(() => {
      socket.emit('stop_typing', { chatId, userId: user._id });
    }, 1000);
  };
  
  return (
    // JSX for chat interface
  );
};
```

### 3. Search & Filter Implementation

#### Backend - Crop Search:
```javascript
// cropController.js
export const searchCrops = async (req, res) => {
  try {
    const {
      search,
      category,
      isOrganic,
      minPrice,
      maxPrice,
      location,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 10,
      lat,
      lng
    } = req.query;
    
    // Build query
    let query = { status: 'available' };
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Filters
    if (category) query.category = category;
    if (isOrganic !== undefined) query.isOrganic = isOrganic === 'true';
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (location) {
      query.$or = [
        { 'location.district': new RegExp(location, 'i') },
        { 'location.state': new RegExp(location, 'i') }
      ];
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Sort
    let sortOption = {};
    if (sortBy === 'distance' && lat && lng) {
      // Geospatial query
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [Number(lng), Number(lat)]
          },
          $maxDistance: 100000 // 100km
        }
      };
    } else {
      sortOption[sortBy] = order === 'asc' ? 1 : -1;
    }
    
    // Execute query
    const crops = await Crop.find(query)
      .populate('farmer', 'name profilePicture farmDetails')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));
    
    // Calculate distance if lat/lng provided
    if (lat && lng) {
      crops.forEach(crop => {
        if (crop.location && crop.location.coordinates) {
          crop.distance = calculateDistance(
            lat, lng,
            crop.location.coordinates[1],
            crop.location.coordinates[0]
          );
        }
      });
    }
    
    const total = await Crop.countDocuments(query);
    
    res.json({
      success: true,
      data: {
        crops,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          totalCrops: total,
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Haversine formula for distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};
```

#### Frontend - Search Component:
```javascript
// SearchBar.jsx with debounce
import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    if (debouncedSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search crops..."
    />
  );
};

// useDebounce.js
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

export default useDebounce;
```

### 4. Order Management Workflow

#### Backend - Order Status Update:
```javascript
// orderController.js
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;
    const userId = req.user._id;
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }
    
    // Check permissions
    if (order.farmer.toString() !== userId.toString() && 
        req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Unauthorized' 
      });
    }
    
    // Validate status transition
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['packed', 'cancelled'],
      packed: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: []
    };
    
    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from ${order.status} to ${status}`
      });
    }
    
    // Update status
    order.status = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || `Order ${status}`
    });
    
    if (status === 'delivered') {
      order.deliveryDate = new Date();
    }
    
    await order.save();
    
    // Create notification for buyer
    await Notification.create({
      user: order.buyer,
      type: `order_${status}`,
      title: `Order ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: `Your order #${order.orderNumber} has been ${status}`,
      link: `/orders/${order._id}`,
      relatedId: order._id
    });
    
    // Emit socket event
    io.to(order.buyer.toString()).emit('order_updated', {
      orderId: order._id,
      status
    });
    
    res.json({
      success: true,
      message: 'Order status updated',
      data: { order }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

### 5. Analytics Implementation

#### Backend - Farmer Analytics:
```javascript
// analyticsController.js
export const getFarmerAnalytics = async (req, res) => {
  try {
    const farmerId = req.user._id;
    const { period = 'month', year, month } = req.query;
    
    // Date range
    let startDate, endDate;
    if (period === 'month' && year && month) {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else {
      // Default to current month
      startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      endDate = new Date();
    }
    
    // Overview stats
    const overview = await Order.aggregate([
      {
        $match: {
          farmer: mongoose.Types.ObjectId(farmerId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);
    
    // Revenue by day
    const revenueData = await Order.aggregate([
      {
        $match: {
          farmer: mongoose.Types.ObjectId(farmerId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' }
        }
      },
      {
        $sort: { _id: 1 }
      },
      {
        $project: {
          date: '$_id',
          revenue: 1,
          _id: 0
        }
      }
    ]);
    
    // Top crops
    const topCrops = await Order.aggregate([
      {
        $match: {
          farmer: mongoose.Types.ObjectId(farmerId),
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.crop',
          totalOrders: { $sum: 1 },
          revenue: { $sum: '$items.totalPrice' }
        }
      },
      {
        $lookup: {
          from: 'crops',
          localField: '_id',
          foreignField: '_id',
          as: 'crop'
        }
      },
      { $unwind: '$crop' },
      {
        $project: {
          crop: {
            name: '$crop.name',
            image: { $arrayElemAt: ['$crop.images', 0] }
          },
          totalOrders: 1,
          revenue: 1
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 5 }
    ]);
    
    // Order stats by status
    const orderStats = await Order.aggregate([
      {
        $match: {
          farmer: mongoose.Types.ObjectId(farmerId)
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const orderStatsObj = {};
    orderStats.forEach(stat => {
      orderStatsObj[stat._id] = stat.count;
    });
    
    // Total crops
    const totalCrops = await Crop.countDocuments({ farmer: farmerId });
    
    // Average rating
    const ratingData = await Crop.aggregate([
      {
        $match: { farmer: mongoose.Types.ObjectId(farmerId) }
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$averageRating' }
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        overview: {
          totalRevenue: overview[0]?.totalRevenue || 0,
          totalOrders: overview[0]?.totalOrders || 0,
          totalCrops,
          averageRating: ratingData[0]?.averageRating || 0
        },
        revenueData,
        topCrops,
        orderStats: orderStatsObj
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

#### Frontend - Analytics Chart:
```javascript
// RevenueChart.jsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Revenue (₹)',
        data: data.map(item => item.revenue),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4
      }
    ]
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Revenue Trend'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '₹' + value
        }
      }
    }
  };
  
  return <Line data={chartData} options={options} />;
};
```

---

## 🧪 Testing

### Unit Testing (Backend)

#### Setup Jest:
```bash
npm install --save-dev jest supertest
```

#### Example Test - Auth Controller:
```javascript
// __tests__/auth.test.js
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

describe('Authentication', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_TEST_URI);
  });
  
  afterAll(async () => {
    // Clean up and close connection
    await User.deleteMany({});
    await mongoose.connection.close();
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Test123!',
          role: 'buyer',
          phone: '+911234567890'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('test@example.com');
    });
    
    it('should not register with existing email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Test123!',
          role: 'buyer',
          phone: '+911234567890'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
  
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'Test123!'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.tokens).toHaveProperty('accessToken');
    });
  });
});
```

### Frontend Testing

#### Setup React Testing Library:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

#### Example Test - Login Component:
```javascript
// __tests__/Login.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import { AuthContext } from '../context/AuthContext';

describe('Login Component', () => {
  const mockSetUser = jest.fn();
  const mockSetToken = jest.fn();
  
  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ setUser: mockSetUser, setToken: mockSetToken }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };
  
  it('renders login form', () => {
    renderLogin();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
  
  it('shows error on invalid credentials', async () => {
    renderLogin();
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'wrong@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong' }
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
```

---

## 🚀 Deployment

### Backend Deployment (Render/Railway)

#### 1. Prepare for Deployment:
```javascript
// server.js - Add this
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### 2. Create build script in package.json:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "npm install"
  }
}
```

#### 3. Deploy to Render:
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create New Web Service
4. Connect GitHub repository
5. Add environment variables
6. Deploy

### Frontend Deployment (Vercel/Netlify)

#### 1. Build for production:
```bash
npm run build
```

#### 2. Deploy to Vercel:
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

#### 3. Environment Variables:
Add all REACT_APP_* variables in Vercel dashboard

### MongoDB Atlas Setup:
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all)
5. Get connection string
6. Add to environment variables

### Domain Setup:
1. Purchase domain (Namecheap, GoDaddy)
2. Add DNS records:
   - Frontend: Point to Vercel
   - Backend: Point to Render
3. Update CORS settings in backend

---

## 🔮 Future Enhancements

### Phase 2 Features:
1. **Payment Integration**
   - Razorpay/Stripe for online payments
   - Wallet system
   - Payment history

2. **Advanced Notifications**
   - SMS notifications via Twilio
   - Push notifications (FCM)
   - Email templates

3. **AI Features**
   - Crop disease detection
   - Price prediction
   - Demand forecasting

4. **Mobile App**
   - React Native app
   - Offline support
   - Camera integration

5. **Blockchain**
   - Supply chain tracking
   - Smart contracts
   - Token rewards

6. **Social Features**
   - Farmer community
   - Live streaming
   - Events/workshops

7. **Advanced Analytics**
   - Predictive analytics
   - Market insights
   - Weather integration

8. **Multi-language**
   - Hindi, Tamil, Telugu support
   - RTL languages
   - Voice commands

---

## 🤝 Contributing

### How to Contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines:
- Use ESLint for JavaScript
- Follow Airbnb style guide
- Write meaningful commit messages
- Add comments for complex logic
- Write unit tests for new features

### Reporting Bugs:
- Use GitHub Issues
- Provide detailed description
- Include steps to reproduce
- Add screenshots if applicable
- Mention environment details

---

## 📝 Common Issues & Solutions

### Issue 1: MongoDB Connection Error
```
Error: MongooseServerSelectionError: connect ECONNREFUSED
```
**Solution:**
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- For Atlas: Whitelist your IP address

### Issue 2: CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Issue 3: JWT Token Expired
```
Error: jwt expired
```
**Solution:**
- Implement refresh token mechanism
- Check token expiry time in .env
- Add token refresh logic in frontend

### Issue 4: Image Upload Fails
```
Error: File too large
```
**Solution:**
- Check MAX_FILE_SIZE in .env
- Compress images before upload
- Verify Cloudinary credentials

### Issue 5: Socket.io Connection Issues
```
WebSocket connection failed
```
**Solution:**
```javascript
// frontend - Update socket URL
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  transports: ['websocket', 'polling']
});
```

### Issue 6: Email Not Sending
```
Error: Invalid login: 535-5.7.8 Username and Password not accepted
```
**Solution:**
- Use App-Specific Password for Gmail
- Enable 2-Factor Authentication
- Check EMAIL_USER and EMAIL_PASSWORD in .env

---

## 🔒 Security Best Practices

### 1. Environment Variables
```bash
# Never commit .env files
# Add to .gitignore
.env
.env.local
.env.production
```

### 2. Password Security
```javascript
// Always hash passwords
const bcrypt = require('bcryptjs');
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

### 3. JWT Security
```javascript
// Use strong secrets (32+ characters)
// Store refresh tokens securely
// Implement token rotation
// Set appropriate expiry times
```

### 4. Input Validation
```javascript
// Backend validation
const { body, validationResult } = require('express-validator');

app.post('/api/crops', [
  body('name').trim().isLength({ min: 3, max: 100 }),
  body('price').isNumeric().isFloat({ min: 0 }),
  body('email').isEmail().normalizeEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

### 5. SQL/NoSQL Injection Prevention
```javascript
// Use Mongoose (automatic sanitization)
// Never use raw queries with user input
// Use parameterized queries

// Bad:
User.find({ email: req.body.email });

// Good:
User.findOne({ email: sanitize(req.body.email) });
```

### 6. XSS Prevention
```javascript
// Sanitize user input
const DOMPurify = require('isomorphic-dompurify');
const clean = DOMPurify.sanitize(dirtyInput);
```

### 7. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 8. HTTPS Only
```javascript
// Enforce HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}
```

---

## 📊 Performance Optimization

### Backend Optimization

#### 1. Database Indexing
```javascript
// Add indexes to frequently queried fields
cropSchema.index({ name: 'text', description: 'text' });
cropSchema.index({ category: 1, isOrganic: 1 });
cropSchema.index({ farmer: 1, createdAt: -1 });
cropSchema.index({ 'location.coordinates': '2dsphere' });
```

#### 2. Query Optimization
```javascript
// Use lean() for read-only queries
const crops = await Crop.find().lean();

// Select only required fields
const crops = await Crop.find().select('name price images');

// Use pagination
const crops = await Crop.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

#### 3. Caching with Redis
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache frequently accessed data
const getCrops = async () => {
  const cacheKey = 'crops:popular';
  const cached = await client.get(cacheKey);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const crops = await Crop.find().sort({ viewCount: -1 }).limit(10);
  await client.setEx(cacheKey, 3600, JSON.stringify(crops)); // 1 hour
  return crops;
};
```

#### 4. Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### Frontend Optimization

#### 1. Code Splitting
```javascript
// Lazy load routes
const FarmerDashboard = lazy(() => import('./pages/FarmerDashboard'));

<Suspense fallback={<Loader />}>
  <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
</Suspense>
```

#### 2. Image Optimization
```javascript
// Use lazy loading
<img src={imageUrl} loading="lazy" alt="Crop" />

// Use responsive images
<img 
  srcSet={`${smallImg} 480w, ${mediumImg} 800w, ${largeImg} 1200w`}
  sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px"
  src={mediumImg}
  alt="Crop"
/>
```

#### 3. Memoization
```javascript
import { useMemo, useCallback } from 'react';

const CropList = ({ crops, filters }) => {
  const filteredCrops = useMemo(() => {
    return crops.filter(crop => 
      crop.category === filters.category
    );
  }, [crops, filters]);
  
  const handleClick = useCallback((id) => {
    // Handle click
  }, []);
  
  return <div>{/* Render crops */}</div>;
};
```

#### 4. Debouncing & Throttling
```javascript
// Debounce search input
const handleSearch = debounce((value) => {
  searchCrops(value);
}, 300);

// Throttle scroll events
const handleScroll = throttle(() => {
  // Load more items
}, 1000);
```

---

## 🧩 API Rate Limiting

```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

// Auth limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later.'
});

// File upload limiter
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: 'Too many uploads, please try again later.'
});

module.exports = { apiLimiter, authLimiter, uploadLimiter };
```

---

## 📱 Progressive Web App (PWA)

### Make it Installable

#### 1. Add manifest.json
```json
{
  "name": "AgriConnect Pro",
  "short_name": "AgriConnect",
  "description": "Farm-to-Market Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#22c55e",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

#### 2. Service Worker
```javascript
// public/service-worker.js
const CACHE_NAME = 'agriconnect-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

---

## 📖 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

### Pagination Response
```json
{
  "success": true,
  "data": {
    "items": [],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 95,
      "itemsPerPage": 10,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

## 🎨 UI/UX Guidelines

### Color Palette
```css
/* Primary Colors */
--primary: #22c55e;      /* Green */
--primary-dark: #16a34a;
--primary-light: #86efac;

/* Secondary Colors */
--secondary: #3b82f6;    /* Blue */
--accent: #f59e0b;       /* Amber */

/* Status Colors */
--success: #22c55e;
--error: #ef4444;
--warning: #f59e0b;
--info: #3b82f6;

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-500: #6b7280;
--gray-900: #111827;
```

### Typography
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Spacing
```css
/* Use 8px base unit */
--space-1: 0.5rem;   /* 8px */
--space-2: 1rem;     /* 16px */
--space-3: 1.5rem;   /* 24px */
--space-4: 2rem;     /* 32px */
--space-6: 3rem;     /* 48px */
--space-8: 4rem;     /* 64px */
```

### Responsive Breakpoints
```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 🔧 Troubleshooting Guide

### Development Issues

#### Problem: Hot Reload Not Working
```bash
# Solution 1: Clear cache
rm -rf node_modules/.cache

# Solution 2: Restart dev server
npm start

# Solution 3: Check CHOKIDAR_USEPOLLING
export CHOKIDAR_USEPOLLING=true
npm start
```

#### Problem: Port Already in Use
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)

# Or use different port
PORT=5001 npm start
```

#### Problem: Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for clean install
npm ci
```

### Production Issues

#### Problem: Environment Variables Not Loading
```javascript
// Solution: Use dotenv-webpack for frontend
// webpack.config.js
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv()
  ]
};
```

#### Problem: CORS in Production
```javascript
// Solution: Update CORS config
app.use(cors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ],
  credentials: true
}));
```

---

## 📚 Resources & References

### Official Documentation
- [MongoDB Docs](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Docs](https://nodejs.org/docs/)
- [Socket.io Docs](https://socket.io/docs/)

### Tutorials & Guides
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Authentication Guide](https://jwt.io/introduction)
- [MongoDB Schema Design](https://www.mongodb.com/docs/manual/data-modeling/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)

### Tools & Libraries
- [Postman](https://www.postman.com/) - API Testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [Cloudinary](https://cloudinary.com/) - Image Management
- [Nodemailer](https://nodemailer.com/) - Email Service

---

## 📞 Support & Contact

### Getting Help
- **GitHub Issues**: [Report bugs or request features](https://github.com/yourusername/agriconnect-pro/issues)
- **Documentation**: Check this README first
- **Email**: support@agriconnect.com
- **Community**: Join our Discord/Slack

### Project Maintainers
- **Your Name** - Lead Developer
  - GitHub: [@yourusername](https://github.com/yourusername)
  - Email: your.email@example.com

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AgriConnect Pro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🎯 Project Milestones

### Phase 1 (Current) - Core Features ✅
- [x] Authentication system
- [x] Multi-role dashboards
- [x] Crop management
- [x] Order system
- [x] Real-time chat
- [x] Review system
- [x] Search & filters
- [x] Analytics
- [x] Knowledge Hub
- [x] File management

### Phase 2 - Enhanced Features 🚧
- [ ] Payment gateway integration
- [ ] Advanced notifications
- [ ] Email templates
- [ ] SMS integration
- [ ] Video consultation
- [ ] Mobile app (React Native)

### Phase 3 - AI & Advanced 🔮
- [ ] ML-based price prediction
- [ ] Crop disease detection
- [ ] Demand forecasting
- [ ] Blockchain integration
- [ ] IoT sensor integration

---

## 🏆 Acknowledgments

### Open Source Libraries
- Thanks to all the amazing open-source libraries used in this project
- Special thanks to the MERN stack community

### Inspiration
- Inspired by the need to empower farmers
- Built for sustainable agriculture and rural development

### Contributors
- Thanks to all contributors who helped build this project
- Community feedback and support

---

## 📊 Project Statistics

```
Lines of Code: ~15,000+
Files: 100+
Components: 50+
API Endpoints: 40+
Database Collections: 8
Features: 10 Major
Development Time: 4-6 weeks
```

---

## 🎓 Learning Outcomes

By building this project, you will learn:

### Backend
✅ RESTful API design  
✅ JWT authentication & authorization  
✅ MongoDB schema design  
✅ File upload handling  
✅ Real-time communication with Socket.io  
✅ Email integration  
✅ Data aggregation & analytics  
✅ Error handling & validation  
✅ Security best practices  

### Frontend
✅ React hooks & context API  
✅ State management  
✅ Form handling & validation  
✅ API integration with Axios  
✅ Real-time updates  
✅ Responsive design  
✅ Chart visualization  
✅ Image galleries & carousels  
✅ Protected routes  

### Full Stack
✅ Project architecture  
✅ Database design  
✅ API documentation  
✅ Testing strategies  
✅ Deployment process  
✅ Performance optimization  
✅ Security implementation  

---

## 🚀 Quick Start Commands

```bash
# Clone repository
git clone https://github.com/yourusername/agriconnect-pro.git
cd agriconnect-pro

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev

# Frontend setup (in new terminal)
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm start

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

---

## 💡 Pro Tips

1. **Start Small**: Implement features one at a time
2. **Test Often**: Test each feature before moving to the next
3. **Git Commits**: Make frequent, meaningful commits
4. **Documentation**: Document as you build
5. **Code Review**: Review your own code before committing
6. **Error Handling**: Always handle errors gracefully
7. **User Feedback**: Get feedback early and often
8. **Performance**: Monitor and optimize regularly
9. **Security**: Never compromise on security
10. **Scalability**: Design with growth in mind

---

## 🎯 Success Criteria

Your project is successful when:

✅ All 10 features are fully functional  
✅ Authentication works securely  
✅ Real-time chat operates smoothly  
✅ Orders can be placed and tracked  
✅ Reviews and ratings display correctly  
✅ Search and filters work efficiently  
✅ Analytics show accurate data  
✅ File uploads work properly  
✅ Geolocation features function  
✅ Knowledge Hub is operational  
✅ Code is clean and well-documented  
✅ Application is deployed and accessible  

---

## 📝 Final Notes

This project demonstrates:
- **Sustainable Agriculture**: Promoting organic farming practices
- **Food Technology**: Digital marketplace innovation
- **Rural Empowerment**: Direct farmer-buyer connections

Perfect for:
- College projects
- Portfolio showcasing
- Learning MERN stack
- Understanding real-world applications
- Job interviews

**Remember**: This is a learning project. Focus on understanding concepts rather than just completing features. Good luck! 🌟

---

**Built with ❤️ for Farmers and Sustainable Agriculture**

*Last Updated: December 2024*
*Version: 1.0.0*. Login
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "farmer",
      "profilePicture": "url"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  }
}
```

#### 3. Verify Email
```http
GET /api/auth/verify-email/:token

Response (200):
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### 4. Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "john@example.com"
}

Response (200):
{
  "success": true,
  "message": "OTP sent to your email"
}
```

#### 5. Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}

Response (200):
{
  "success": true,
  "message": "Password reset successful"
}
```

#### 6. Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

Request Body:
{
  "refreshToken": "refresh_token"
}

Response (200):
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token"
  }
}
```

### Crop Endpoints

#### 1. Create Crop
```http
POST /api/crops
Authorization: Bearer {token}
Content-Type: multipart/form-data

Request Body (FormData):
{
  "name": "Organic Tomatoes",
  "category": "Vegetables",
  "variety": "Cherry Tomato",
  "description": "Fresh organic tomatoes",
  "price": 60,
  "unit": "kg",
  "minimumOrder": 5,
  "availableQuantity": 100,
  "isOrganic": true,
  "images": [File, File, File]
}

Response (201):
{
  "success": true,
  "message": "Crop created successfully",
  "data": {
    "crop": { /* crop object */ }
  }
}
```

#### 2