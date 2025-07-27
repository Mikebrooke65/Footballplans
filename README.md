# Footballplans

A comprehensive football coaching platform that provides structured lesson plans, training modules, and coaching resources for football/soccer coaches at all levels.

## 📚 Documentation

- **[Project Requirements](PROJECT_REQUIREMENTS.md)** - Comprehensive requirements specification including lesson versioning, messaging system foundation, and development guidelines
- **[Technical Guide](TECHNICAL_GUIDE.md)** - Implementation details, API specifications, and technical documentation
- **[Changelog](CHANGELOG.md)** - Project history and version information

## 🚀 Features

### Current Features
- Interactive lesson browser organized by football skills
- Lesson builder tool for creating structured training plans
- Automated lesson indexing system
- Responsive design for multiple devices
- Skill categories: 1v1's, Ball Striking, Dribbling, Marking, Passing, Pressing, Tackling

### Upcoming Features (See [Roadmap](PROJECT_REQUIREMENTS.md#future-roadmap))
- User authentication and role-based access control
- Real-time messaging system between coaches
- Lesson versioning and collaboration tools
- Mobile application
- Advanced coaching analytics

## 🏗️ Project Structure

```
Footballplans/
├── PROJECT_REQUIREMENTS.md     # Main requirements specification
├── TECHNICAL_GUIDE.md         # Implementation documentation
├── CHANGELOG.md               # Version history
├── index.html                 # Main application entry
├── lesson-builder/            # Lesson creation tools
├── lessons/                   # Organized lesson content
│   ├── [skill-category]/     # Individual skill folders
│   └── index.json            # Generated skill index
├── generate-index.js          # Skill indexing script
└── generate-lesson-indexes.js # Lesson file indexing
```

## 🛠️ Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. Browse lessons by skill category or use the lesson builder

### Development Setup
```bash
# Generate lesson indexes
node generate-index.js
node generate-lesson-indexes.js
```

## 📖 Creating Lessons

Use the lesson builder at `/lesson-builder/index.html` to create new structured lesson plans. The tool generates downloadable HTML files with:
- Lesson title and description
- Three structured training sessions
- Key points and explanations
- Resource requirements
- Session images

## 🤝 Contributing

Please read the [Project Requirements](PROJECT_REQUIREMENTS.md) document for:
- Development guidelines and coding standards
- Git workflow and commit message conventions
- Testing requirements
- Security considerations

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please refer to the documentation or open an issue.