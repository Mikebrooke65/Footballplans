# Footballplans - Project Requirements Specification

## Project Overview

The Footballplans application is a comprehensive football coaching platform designed to provide structured lesson plans, training modules, and coaching resources for football/soccer coaches at all levels. The platform serves as a digital hub for creating, managing, and delivering football coaching content.

### Current Architecture
- **Platform**: Static web application
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Content Management**: File-based lesson organization
- **Deployment**: GitHub Pages compatible

### Current Features
- Interactive lesson browser organized by football skills
- Lesson builder tool for creating structured training plans
- Automated lesson indexing system
- Responsive design for multiple devices
- Skill categories: 1v1's, Ball Striking, Dribbling, Marking, Passing, Pressing, Tackling

## Lesson Management System

### Current Lesson Structure
```
lessons/
├── [skill-category]/
│   ├── lesson1.html
│   ├── lesson2.html
│   └── index.json (auto-generated)
└── index.json (master skill index)
```

### Lesson Versioning Requirements

#### Version Control System
- **Version Format**: Semantic versioning (MAJOR.MINOR.PATCH)
  - MAJOR: Significant structural changes to lesson content
  - MINOR: Content updates, new sections, or enhanced explanations
  - PATCH: Typo fixes, minor corrections, formatting improvements

#### Lesson Metadata Schema
Each lesson must include the following metadata structure:
```json
{
  "version": "1.2.0",
  "lastModified": "2024-01-15T10:30:00Z",
  "author": "string",
  "reviewedBy": "string",
  "skillLevel": "beginner|intermediate|advanced",
  "ageGroup": "string",
  "duration": "number (minutes)",
  "equipment": ["string"],
  "tags": ["string"]
}
```

#### Version History Tracking
- Maintain version history in `lessons/[skill]/versions/` directory
- Archive previous versions as `lesson-name-v1.1.0.html`
- Track changes in lesson-specific changelog files

### Changelog Management

#### Master Changelog Structure
Location: `/CHANGELOG.md`

Format:
```markdown
# Changelog

## [Unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [Version Number] - YYYY-MM-DD
### Added
- New features

### Changed
- Changes in existing functionality

### Fixed
- Bug fixes
```

#### Lesson-Specific Changelogs
Location: `/lessons/[skill]/CHANGELOG.md`

Requirements:
- Track all lesson modifications
- Reference version numbers
- Include contributor information
- Document pedagogical reasoning for changes
- Link to related lessons or dependencies

#### Automated Changelog Generation
- Implement git commit message parsing
- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Scope: lesson name or system component

## Lesson Builder System

### Current Functionality
- Form-based lesson creation interface
- Three-session lesson structure
- Downloadable HTML lesson generation
- Fields: title, description, sessions (title, brief, points, explanation, image, resources)

### Access Control Requirements

#### User Roles and Permissions
1. **Guest User**
   - View lessons only
   - No builder access
   - No download capabilities

2. **Registered Coach**
   - View all lessons
   - Access lesson builder
   - Download generated lessons
   - Save draft lessons

3. **Content Creator**
   - All Registered Coach permissions
   - Edit existing lessons
   - Publish lessons to main repository
   - Access lesson analytics

4. **Administrator**
   - All permissions
   - User management
   - System configuration
   - Content moderation

#### Authentication Requirements
- Session-based authentication system
- Secure password requirements (minimum 8 characters, mixed case, numbers, symbols)
- Password reset functionality
- Account verification via email
- Session timeout after 60 minutes of inactivity

#### Access Control Implementation
- Role-based access control (RBAC) system
- JWT tokens for API authentication
- HTTPS-only communication
- Rate limiting for API endpoints
- Audit logging for all user actions

### Enhanced Lesson Builder Features
- Lesson preview functionality
- Auto-save capabilities
- Lesson templates library
- Multimedia content integration
- Collaborative editing features
- Version control integration

## Messaging System Foundation

### System Architecture Requirements

#### Messaging Infrastructure
- Real-time messaging capabilities using WebSocket connections
- Message queuing system for offline message delivery
- End-to-end encryption for sensitive communications
- Support for text, images, files, and video attachments
- Message threading and reply functionality

#### Communication Channels
1. **Coach-to-Coach Messaging**
   - Direct messages between coaches
   - Group discussions by region or specialization
   - Resource sharing channels

2. **Coach-to-Player Communication**
   - Training feedback delivery
   - Progress tracking communications
   - Assignment notifications

3. **System Notifications**
   - Lesson update alerts
   - New content notifications
   - System maintenance announcements

#### Message Types
- **Direct Messages**: 1-on-1 conversations
- **Group Messages**: Multi-participant discussions
- **Broadcast Messages**: System-wide announcements
- **Automated Messages**: System-generated notifications

### Database Schema for Messaging System

#### SQL Table Structures

```sql
-- Users table for authentication and profile management
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('guest', 'coach', 'creator', 'admin') DEFAULT 'coach',
    profile_image_url VARCHAR(500),
    coaching_license VARCHAR(100),
    organization VARCHAR(200),
    location VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(20),
    bio TEXT,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active, last_active)
);

-- Conversations table for organizing message threads
CREATE TABLE conversations (
    conversation_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_type ENUM('direct', 'group', 'broadcast') NOT NULL,
    title VARCHAR(255),
    description TEXT,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    max_participants INT DEFAULT NULL,
    conversation_image_url VARCHAR(500),
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_type (conversation_type),
    INDEX idx_created_by (created_by),
    INDEX idx_active (is_active),
    INDEX idx_updated (updated_at)
);

-- Conversation participants table
CREATE TABLE conversation_participants (
    participant_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role ENUM('member', 'moderator', 'admin') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_read_at TIMESTAMP NULL,
    notification_settings JSON DEFAULT '{"mentions": true, "all_messages": true}',
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_active_participant (conversation_id, user_id, is_active),
    INDEX idx_conversation (conversation_id),
    INDEX idx_user (user_id),
    INDEX idx_active (is_active)
);

-- Messages table for storing all message content
CREATE TABLE messages (
    message_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    parent_message_id BIGINT NULL, -- For threaded replies
    message_type ENUM('text', 'image', 'file', 'video', 'system', 'lesson_share') DEFAULT 'text',
    content TEXT NOT NULL,
    metadata JSON DEFAULT NULL, -- For storing additional message properties
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    edited_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    is_deleted BOOLEAN DEFAULT FALSE,
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_message_id) REFERENCES messages(message_id) ON DELETE SET NULL,
    INDEX idx_conversation (conversation_id, created_at),
    INDEX idx_sender (sender_id),
    INDEX idx_parent (parent_message_id),
    INDEX idx_deleted (is_deleted),
    INDEX idx_priority (priority),
    FULLTEXT INDEX ft_content (content)
);

-- Message attachments table
CREATE TABLE message_attachments (
    attachment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_id BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500) NULL,
    upload_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
    INDEX idx_message (message_id),
    INDEX idx_status (upload_status)
);

-- Message reactions table for emoji reactions
CREATE TABLE message_reactions (
    reaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    message_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    reaction_type VARCHAR(50) NOT NULL, -- emoji type or custom reaction
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_reaction (message_id, user_id, reaction_type),
    INDEX idx_message (message_id),
    INDEX idx_user (user_id)
);

-- User sessions table for authentication management
CREATE TABLE user_sessions (
    session_id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    device_info JSON DEFAULT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_expires (expires_at),
    INDEX idx_active (is_active)
);

-- Notification preferences table
CREATE TABLE notification_preferences (
    preference_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    notification_type ENUM('email', 'push', 'sms', 'in_app') NOT NULL,
    category ENUM('messages', 'lessons', 'system', 'coaching') NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    frequency ENUM('immediate', 'daily', 'weekly', 'never') DEFAULT 'immediate',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_notification (user_id, notification_type, category),
    INDEX idx_user (user_id),
    INDEX idx_enabled (is_enabled)
);

-- Audit log table for tracking user actions
CREATE TABLE audit_log (
    log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(100),
    old_values JSON DEFAULT NULL,
    new_values JSON DEFAULT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_resource (resource_type, resource_id),
    INDEX idx_created (created_at)
);
```

#### Database Indexes and Performance Considerations
- Implement proper indexing for frequently queried fields
- Use composite indexes for multi-column queries
- Implement database partitioning for large message tables
- Set up read replicas for improved read performance
- Implement caching strategy using Redis or similar

#### Data Retention Policy
- Message retention: 2 years for active conversations
- Deleted message cleanup: 30 days grace period
- User data retention: Comply with GDPR/privacy regulations
- Audit log retention: 1 year for compliance

## Technical Requirements

### Performance Standards
- Page load time: < 3 seconds on 3G connection
- Message delivery: < 100ms for real-time messaging
- Lesson builder response: < 500ms for form interactions
- Database query response: < 200ms for 95th percentile
- Concurrent users: Support 1000+ simultaneous users

### Security Requirements
- HTTPS encryption for all communications
- SQL injection prevention through parameterized queries
- Cross-site scripting (XSS) protection
- Cross-site request forgery (CSRF) protection
- Content Security Policy (CSP) headers
- Regular security audits and penetration testing

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Mobile Android 90+

### Accessibility Standards
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode support
- Text scaling up to 200%

## Development Guidelines

### Code Standards
- **HTML**: HTML5 semantic markup, valid W3C compliance
- **CSS**: BEM methodology, CSS3 features, responsive design
- **JavaScript**: ES6+ features, modular architecture, JSDoc documentation
- **File Naming**: kebab-case for files, camelCase for JavaScript variables
- **Indentation**: 2 spaces, no tabs

### Git Workflow
- **Branching Strategy**: Git Flow with feature branches
- **Commit Messages**: Conventional commits format
- **Code Reviews**: Required for all changes
- **Testing**: Unit tests required for new features
- **Documentation**: Update docs with code changes

### API Design Principles
- RESTful API design
- JSON-only data format
- Proper HTTP status codes
- API versioning strategy
- Rate limiting implementation
- Comprehensive error handling

## Testing Strategy

### Test Coverage Requirements
- Unit tests: > 80% code coverage
- Integration tests: All API endpoints
- End-to-end tests: Critical user journeys
- Performance tests: Load testing for key features
- Security tests: Vulnerability scanning

### Testing Tools
- **Unit Testing**: Jest or similar framework
- **Integration Testing**: Postman/Newman for API testing
- **E2E Testing**: Playwright or Cypress
- **Performance Testing**: JMeter or k6
- **Security Testing**: OWASP ZAP

## Future Roadmap

### Phase 1: Foundation (Current)
- [x] Basic lesson structure and organization
- [x] Lesson builder functionality
- [x] Static content delivery
- [ ] Comprehensive requirements documentation

### Phase 2: User Management & Messaging (Next 3-6 months)
- [ ] User authentication and authorization system
- [ ] Role-based access control implementation
- [ ] Basic messaging system foundation
- [ ] Database schema implementation
- [ ] User profile management

### Phase 3: Enhanced Messaging (6-9 months)
- [ ] Real-time messaging implementation
- [ ] File and media sharing capabilities
- [ ] Group messaging and chat rooms
- [ ] Push notifications system
- [ ] Mobile app development initiation

### Phase 4: Advanced Features (9-12 months)
- [ ] Video calling integration
- [ ] Advanced lesson analytics
- [ ] AI-powered lesson recommendations
- [ ] Multi-language support
- [ ] Offline lesson access

### Phase 5: Scale & Optimization (12+ months)
- [ ] Performance optimization
- [ ] Advanced coaching tools
- [ ] Integration with coaching certifications
- [ ] White-label solutions
- [ ] Enterprise features

## Deployment and DevOps

### Deployment Strategy
- **Staging Environment**: Automated deployment from develop branch
- **Production Environment**: Manual deployment approval process
- **Rollback Strategy**: Immediate rollback capability
- **Blue-Green Deployment**: Zero-downtime deployments
- **Database Migrations**: Automated and reversible

### Monitoring and Logging
- **Application Monitoring**: Real-time performance metrics
- **Error Tracking**: Centralized error logging and alerting
- **User Analytics**: Usage patterns and feature adoption
- **Infrastructure Monitoring**: Server health and capacity planning
- **Security Monitoring**: Intrusion detection and prevention

### Backup and Recovery
- **Database Backups**: Daily automated backups with 30-day retention
- **File Backups**: Regular backup of user-generated content
- **Disaster Recovery**: RTO < 4 hours, RPO < 1 hour
- **Testing**: Monthly backup recovery testing

## Compliance and Privacy

### Data Protection
- GDPR compliance for EU users
- CCPA compliance for California users
- Data encryption at rest and in transit
- Right to data deletion and portability
- Regular privacy impact assessments

### Content Moderation
- Automated content filtering for inappropriate material
- User reporting system for problematic content
- Human moderation review process
- Clear community guidelines and terms of service

---

## Document Maintenance

**Version**: 1.0.0  
**Last Updated**: 2024-01-27  
**Next Review**: 2024-04-27  
**Owner**: Development Team  
**Stakeholders**: Product Owner, Technical Lead, UX Designer

This document should be reviewed quarterly and updated as requirements evolve. All changes must be approved by the project stakeholders and properly versioned.