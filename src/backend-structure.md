# Fix My City - Backend Structure (Node.js)

## Overview
This document outlines the complete backend architecture for the Fix My City portal. The backend is built with Node.js, Express.js, MongoDB, and includes authentication, file storage, and real-time features.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Passport.js
- **File Storage**: Multer + Cloudinary/AWS S3
- **Real-time**: Socket.io
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Documentation**: Swagger/OpenAPI

## Project Structure
```
backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── cloudinary.js
│   │   ├── passport.js
│   │   └── constants.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── complaintController.js
│   │   ├── serviceController.js
│   │   ├── communityController.js
│   │   ├── leaderboardController.js
│   │   ├── notificationController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   ├── upload.js
│   │   ├── rateLimiter.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Complaint.js
│   │   ├── Service.js
│   │   ├── Community.js
│   │   ├── Notification.js
│   │   └── FileUpload.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── complaints.js
│   │   ├── services.js
│   │   ├── community.js
│   │   ├── leaderboard.js
│   │   ├── notifications.js
│   │   └── uploads.js
│   ├── services/
│   │   ├── emailService.js
│   │   ├── smsService.js
│   │   ├── notificationService.js
│   │   ├── fileService.js
│   │   └── geolocationService.js
│   ├── utils/
│   │   ├── logger.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── app.js
│   └── server.js
├── uploads/
├── logs/
├── tests/
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login  
- `POST /logout` - User logout
- `POST /refresh` - Refresh token
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset
- `POST /verify-email` - Email verification
- `POST /send-otp` - Send OTP for mobile verification
- `POST /verify-otp` - Verify OTP

### User Routes (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /profile/avatar` - Upload profile picture
- `GET /profile/documents` - Get uploaded documents
- `POST /profile/documents` - Upload documents
- `DELETE /profile/documents/:id` - Delete document
- `PUT /profile/preferences` - Update preferences
- `PUT /profile/password` - Change password

### Complaint Routes (`/api/complaints`)
- `GET /` - Get all complaints (with filters)
- `POST /` - Create new complaint
- `GET /:id` - Get complaint by ID
- `PUT /:id` - Update complaint
- `DELETE /:id` - Delete complaint
- `POST /:id/vote` - Vote on complaint
- `POST /:id/share` - Share complaint
- `GET /:id/votes` - Get complaint votes
- `POST /:id/comments` - Add comment
- `GET /:id/comments` - Get comments

### Service Routes (`/api/services`)
- `GET /` - Get all services
- `GET /categories` - Get service categories
- `GET /:id` - Get service by ID
- `POST /:id/apply` - Apply for service
- `GET /applications` - Get user's applications
- `GET /applications/:id` - Get application status

### Community Routes (`/api/community`)
- `GET /groups` - Get community groups
- `POST /groups` - Create new group
- `GET /groups/:id` - Get group details
- `POST /groups/:id/join` - Join group
- `POST /groups/:id/leave` - Leave group
- `GET /groups/:id/posts` - Get group posts
- `POST /groups/:id/posts` - Create post in group

### Leaderboard Routes (`/api/leaderboard`)
- `GET /top-contributors` - Get top complaint contributors
- `GET /monthly-heroes` - Get monthly heroes
- `GET /user-stats` - Get current user statistics
- `GET /achievements` - Get achievements system

### Notification Routes (`/api/notifications`)
- `GET /` - Get user notifications
- `PUT /:id/read` - Mark notification as read
- `POST /subscribe` - Subscribe to push notifications
- `POST /preferences` - Update notification preferences

### File Upload Routes (`/api/uploads`)
- `POST /images` - Upload images
- `POST /documents` - Upload documents
- `POST /videos` - Upload videos
- `DELETE /:id` - Delete uploaded file
- `GET /:id` - Get file details

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String,
  mobile: String,
  aadhaar: String (encrypted),
  password: String (hashed),
  profilePicture: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pinCode: String
  },
  isVerified: Boolean,
  isEmailVerified: Boolean,
  isMobileVerified: Boolean,
  authMethod: String,
  preferences: {
    notifications: Boolean,
    emailUpdates: Boolean,
    smsAlerts: Boolean,
    language: String,
    theme: String
  },
  documents: [ObjectId],
  role: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Complaint Model
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  priority: String,
  status: String,
  location: {
    area: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  submittedBy: ObjectId,
  attachments: [ObjectId],
  votes: {
    count: Number,
    users: [ObjectId]
  },
  comments: [{
    user: ObjectId,
    text: String,
    createdAt: Date
  }],
  assignedTo: ObjectId,
  response: String,
  responseDate: Date,
  resolutionDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### File Upload Model
```javascript
{
  _id: ObjectId,
  originalName: String,
  filename: String,
  mimetype: String,
  size: Number,
  path: String,
  cloudinaryUrl: String,
  uploadedBy: ObjectId,
  category: String,
  associatedWith: {
    model: String,
    id: ObjectId
  },
  createdAt: Date
}
```

## Key Features Implementation

### 1. File Upload with Enhanced Functionality
```javascript
// Multiple file types support
const multerConfig = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg', 'image/png', 'image/gif',
      'video/mp4', 'video/avi',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5 // Maximum 5 files
  }
};
```

### 2. Authentication System
```javascript
// JWT + Multiple Auth Methods
const authMethods = {
  password: 'traditional login',
  otp: 'SMS OTP verification',
  biometric: 'WebAuthn integration',
  oauth: 'Google/Facebook OAuth'
};

// OTP Generation and Verification
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
```

### 3. Real-time Notifications
```javascript
// Socket.io implementation
io.on('connection', (socket) => {
  socket.on('join_user', (userId) => {
    socket.join(`user_${userId}`);
  });
  
  // Real-time complaint updates
  socket.on('complaint_update', (data) => {
    io.to(`user_${data.userId}`).emit('notification', {
      type: 'complaint_update',
      message: 'Your complaint status has been updated',
      data: data
    });
  });
});
```

### 4. Advanced Search and Filtering
```javascript
// MongoDB aggregation for complex queries
const searchComplaints = async (filters) => {
  const pipeline = [
    { $match: filters },
    { $lookup: {
        from: 'users',
        localField: 'submittedBy',
        foreignField: '_id',
        as: 'submitter'
      }
    },
    { $sort: { createdAt: -1 } },
    { $skip: filters.skip || 0 },
    { $limit: filters.limit || 20 }
  ];
  
  return await Complaint.aggregate(pipeline);
};
```

### 5. Geolocation Services
```javascript
// Location-based complaint mapping
const nearbyComplaints = async (lat, lng, radius = 5000) => {
  return await Complaint.find({
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: radius
      }
    }
  });
};
```

## Security Implementation

### 1. Data Protection
- Password hashing with bcrypt
- Aadhaar number encryption
- JWT token rotation
- Rate limiting on API endpoints
- Input validation and sanitization

### 2. File Security
- Virus scanning for uploads
- File type validation
- Size restrictions
- Secure file storage with Cloudinary

### 3. API Security
- Helmet for security headers
- CORS configuration
- SQL injection prevention
- XSS protection

## Environment Variables
```env
NODE_ENV=development
PORT=5000
DB_URI=mongodb://localhost:27017/fixmycity
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SMS_API_KEY=your_sms_api_key
EMAIL_SERVICE_API_KEY=your_email_api_key
```

This backend structure provides a complete foundation for the Fix My City portal with robust file handling, authentication, and all the features needed to support the React frontend.