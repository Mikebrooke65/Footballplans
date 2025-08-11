# Technical Implementation Guide

## Quick Reference

This document provides implementation details and technical specifications that supplement the main PROJECT_REQUIREMENTS.md file.

## Lesson Versioning Implementation

### Version Management Script
```javascript
// lesson-version-manager.js
class LessonVersionManager {
  constructor(lessonPath) {
    this.lessonPath = lessonPath;
    this.versionsDir = path.join(lessonPath, 'versions');
  }

  async createVersion(lessonFile, versionType = 'patch') {
    const currentVersion = await this.getCurrentVersion(lessonFile);
    const newVersion = this.incrementVersion(currentVersion, versionType);
    
    // Archive current version
    await this.archiveVersion(lessonFile, currentVersion);
    
    // Update lesson metadata
    await this.updateLessonMetadata(lessonFile, newVersion);
    
    return newVersion;
  }

  incrementVersion(version, type) {
    const [major, minor, patch] = version.split('.').map(Number);
    
    switch(type) {
      case 'major': return `${major + 1}.0.0`;
      case 'minor': return `${major}.${minor + 1}.0`;
      case 'patch': return `${major}.${minor}.${patch + 1}`;
      default: throw new Error('Invalid version type');
    }
  }
}
```

### Lesson Metadata Template
```html
<!-- Add to lesson HTML head -->
<meta name="lesson-version" content="1.2.0">
<meta name="lesson-author" content="Coach Name">
<meta name="lesson-modified" content="2024-01-27T10:30:00Z">
<meta name="lesson-skill-level" content="intermediate">
<meta name="lesson-age-group" content="U12-U16">
<meta name="lesson-duration" content="60">
<meta name="lesson-equipment" content="cones,balls,bibs">
<meta name="lesson-tags" content="passing,possession,small-sided-games">
```

## Messaging System API Endpoints

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/register
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
```

### Messaging API
```
GET    /api/conversations                    # List user conversations
POST   /api/conversations                    # Create new conversation
GET    /api/conversations/:id                # Get conversation details
PUT    /api/conversations/:id                # Update conversation
DELETE /api/conversations/:id                # Delete conversation

GET    /api/conversations/:id/messages       # Get conversation messages
POST   /api/conversations/:id/messages       # Send new message
PUT    /api/messages/:id                     # Edit message
DELETE /api/messages/:id                     # Delete message

POST   /api/messages/:id/reactions           # Add reaction to message
DELETE /api/messages/:id/reactions/:type     # Remove reaction

GET    /api/users/search                     # Search users for messaging
GET    /api/users/:id/profile                # Get user profile
```

### WebSocket Events
```javascript
// Client-side WebSocket event handling
socket.on('message:new', (data) => {
  // Handle new message
});

socket.on('message:updated', (data) => {
  // Handle message edit
});

socket.on('message:deleted', (data) => {
  // Handle message deletion
});

socket.on('user:typing', (data) => {
  // Handle typing indicators
});

socket.on('conversation:updated', (data) => {
  // Handle conversation changes
});
```

## Database Migration Scripts

### Initial Schema Setup
```sql
-- File: migrations/001_create_users_table.sql
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    -- ... rest of schema from PROJECT_REQUIREMENTS.md
);

-- File: migrations/002_create_conversations_table.sql
-- ... conversation schema

-- File: migrations/003_create_messages_table.sql
-- ... messages schema
```

### Sample Data Insert
```sql
-- File: sample_data/insert_sample_messaging_data.sql

-- Insert sample users
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('coach_john', 'john@example.com', '$2b$10$...', 'John', 'Smith', 'coach'),
('coach_mary', 'mary@example.com', '$2b$10$...', 'Mary', 'Johnson', 'creator'),
('admin_bob', 'bob@example.com', '$2b$10$...', 'Bob', 'Wilson', 'admin');

-- Insert sample conversation
INSERT INTO conversations (conversation_type, title, created_by) VALUES
('group', 'Youth Coach Discussion', 1),
('direct', NULL, 1);

-- Insert sample participants
INSERT INTO conversation_participants (conversation_id, user_id, role) VALUES
(1, 1, 'admin'),
(1, 2, 'member'),
(2, 1, 'member'),
(2, 3, 'member');

-- Insert sample messages
INSERT INTO messages (conversation_id, sender_id, message_type, content) VALUES
(1, 1, 'text', 'Welcome to the youth coach discussion group!'),
(1, 2, 'text', 'Thanks! Excited to share ideas here.'),
(2, 1, 'text', 'Hi Bob, could you help me with the new lesson format?'),
(2, 3, 'text', 'Of course! What specific questions do you have?');
```

## Environment Configuration

### Development Environment Setup
```bash
# .env.development
NODE_ENV=development
PORT=3000
DATABASE_URL=mysql://user:password@localhost:3306/footballplans_dev
JWT_SECRET=your-dev-jwt-secret
REDIS_URL=redis://localhost:6379
WEBSOCKET_PORT=3001
```

### Production Environment Setup
```bash
# .env.production
NODE_ENV=production
PORT=8080
DATABASE_URL=mysql://user:password@prod-db:3306/footballplans_prod
JWT_SECRET=your-production-jwt-secret
REDIS_URL=redis://redis-cluster:6379
WEBSOCKET_PORT=8081
SSL_CERT_PATH=/path/to/ssl/cert.pem
SSL_KEY_PATH=/path/to/ssl/private.key
```

## Security Implementation

### JWT Token Handling
```javascript
// auth-middleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};
```

### Password Security
```javascript
// password-utils.js
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return password.length >= minLength && 
         hasUpperCase && 
         hasLowerCase && 
         hasNumbers && 
         hasSpecialChar;
};
```

## Testing Examples

### Unit Test Example
```javascript
// tests/lesson-version-manager.test.js
const LessonVersionManager = require('../src/lesson-version-manager');

describe('LessonVersionManager', () => {
  let versionManager;

  beforeEach(() => {
    versionManager = new LessonVersionManager('/test/lessons/passing');
  });

  test('should increment patch version correctly', () => {
    const result = versionManager.incrementVersion('1.2.3', 'patch');
    expect(result).toBe('1.2.4');
  });

  test('should increment minor version correctly', () => {
    const result = versionManager.incrementVersion('1.2.3', 'minor');
    expect(result).toBe('1.3.0');
  });

  test('should increment major version correctly', () => {
    const result = versionManager.incrementVersion('1.2.3', 'major');
    expect(result).toBe('2.0.0');
  });
});
```

### Integration Test Example
```javascript
// tests/messaging-api.test.js
const request = require('supertest');
const app = require('../src/app');

describe('Messaging API', () => {
  let authToken;

  beforeAll(async () => {
    // Setup test user and get auth token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'TestPass123!'
      });
    
    authToken = response.body.token;
  });

  test('should create new conversation', async () => {
    const response = await request(app)
      .post('/api/conversations')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        type: 'group',
        title: 'Test Group',
        participants: [2, 3]
      });

    expect(response.status).toBe(201);
    expect(response.body.conversation.title).toBe('Test Group');
  });

  test('should send message to conversation', async () => {
    const response = await request(app)
      .post('/api/conversations/1/messages')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'Hello, this is a test message',
        type: 'text'
      });

    expect(response.status).toBe(201);
    expect(response.body.message.content).toBe('Hello, this is a test message');
  });
});
```

## Performance Optimization Guidelines

### Database Query Optimization
```sql
-- Efficient message loading with pagination
SELECT 
    m.message_id,
    m.content,
    m.created_at,
    u.username,
    u.first_name,
    u.last_name
FROM messages m
JOIN users u ON m.sender_id = u.user_id
WHERE m.conversation_id = ? 
    AND m.is_deleted = FALSE
ORDER BY m.created_at DESC
LIMIT ? OFFSET ?;

-- Index for performance
CREATE INDEX idx_messages_conversation_created 
ON messages(conversation_id, is_deleted, created_at DESC);
```

### Caching Strategy
```javascript
// redis-cache.js
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

const cacheConversationList = async (userId, conversations) => {
  const key = `user:${userId}:conversations`;
  await client.setex(key, 300, JSON.stringify(conversations)); // 5 min TTL
};

const getCachedConversationList = async (userId) => {
  const key = `user:${userId}:conversations`;
  const cached = await client.get(key);
  return cached ? JSON.parse(cached) : null;
};
```

## Deployment Scripts

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "src/server.js"]
```

### Docker Compose for Development
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=mysql://user:password@db:3306/footballplans
    depends_on:
      - db
      - redis

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=rootpassword
      - MYSQL_DATABASE=footballplans
      - MYSQL_USER=user
      - MYSQL_PASSWORD=password
    volumes:
      - db_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  db_data:
```

### GitHub Actions CI/CD
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: rootpassword
          MYSQL_DATABASE: footballplans_test
        options: >-
          --health-cmd="mysqladmin ping --silent"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=3

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
      env:
        DATABASE_URL: mysql://root:rootpassword@localhost:3306/footballplans_test
    
    - name: Run security audit
      run: npm audit --audit-level high

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      run: echo "Deploy to production server"
      # Add actual deployment steps here
```

## Monitoring and Logging Setup

### Application Logging
```javascript
// logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'footballplans-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

### Error Tracking
```javascript
// error-handler.js
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    user: req.user?.user_id,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;
```

---

This technical guide provides the implementation details needed to build upon the requirements specified in PROJECT_REQUIREMENTS.md. Update this document as the implementation progresses and new technical decisions are made.