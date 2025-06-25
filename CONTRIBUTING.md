# Contributing to URL Shortener

Thank you for considering contributing to the URL Shortener project! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Setup Development Environment
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/url-shortener-fullstack.git
   cd url-shortener-fullstack
   ```
3. Install dependencies:
   ```bash
   npm run install:all
   ```
4. Set up environment variables (see README.md)
5. Start development servers:
   ```bash
   npm run dev:backend
   npm run dev:frontend
   ```

## 📝 How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details

### Suggesting Features
1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear title and description
   - Use case and benefits
   - Possible implementation approach

### Code Contributions

#### Branch Naming
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical fixes
- `docs/documentation-update` - Documentation updates

#### Commit Messages
Follow conventional commits:
- `feat: add user authentication`
- `fix: resolve CORS issue`
- `docs: update deployment guide`
- `style: format code with prettier`
- `refactor: restructure auth service`
- `test: add unit tests for URL service`

#### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Create a pull request with:
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes
   - Testing instructions

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Manual Testing
- Test all API endpoints
- Test UI components
- Test responsive design
- Test authentication flow
- Test URL shortening and redirects

## 📋 Code Style

### Backend (Node.js)
- Use ES6+ features
- Follow Express.js best practices
- Use async/await for promises
- Implement proper error handling
- Add JSDoc comments for functions

### Frontend (React)
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper state management
- Add PropTypes or TypeScript

### General Guidelines
- Write clean, readable code
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic
- Follow existing code patterns

## 🔒 Security Guidelines

- Never commit sensitive data (API keys, passwords)
- Validate all user inputs
- Use parameterized queries
- Implement proper authentication
- Follow OWASP security guidelines
- Report security issues privately

## 📚 Documentation

- Update README.md for new features
- Add inline code comments
- Update API documentation
- Include examples in documentation
- Keep deployment guides current

## 🎯 Areas for Contribution

### High Priority
- [ ] Add comprehensive tests
- [ ] Implement rate limiting
- [ ] Add URL analytics dashboard
- [ ] Improve error handling
- [ ] Add API documentation (Swagger)

### Medium Priority
- [ ] Add bulk URL operations
- [ ] Implement URL expiration
- [ ] Add QR code generation
- [ ] Improve mobile UI
- [ ] Add dark/light theme toggle

### Low Priority
- [ ] Add social media integration
- [ ] Implement URL categories
- [ ] Add export functionality
- [ ] Create browser extension
- [ ] Add API versioning

## 🤝 Community Guidelines

### Be Respectful
- Use welcoming and inclusive language
- Respect different viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Be Collaborative
- Help others learn and grow
- Share knowledge and resources
- Provide constructive feedback
- Celebrate others' contributions

### Be Professional
- Keep discussions on-topic
- Avoid personal attacks
- Use appropriate language
- Maintain professional standards

## 📞 Getting Help

- Create an issue for bugs or questions
- Join discussions in existing issues
- Check documentation first
- Be patient and respectful

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Thank you for contributing to the URL Shortener project! Your contributions help make this project better for everyone.
