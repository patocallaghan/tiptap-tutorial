# TipTap Editor Tutorial

A comprehensive, hands-on tutorial for learning TipTap rich text editor from basic setup to advanced customization. This tutorial follows a progressive learning approach with 12 structured lessons, each building on the previous concepts.

## 🎯 What You'll Learn

- **Basic Setup**: Editor configuration, StarterKit integration
- **Content Management**: Document structure, schema, nodes and marks
- **Interactive Features**: Commands, input rules, event handling
- **UI Components**: Custom menus, toolbars, suggestions, and typeahead
- **Extension Development**: Custom marks, nodes, and ProseMirror integration
- **Production Ready**: Serialization, performance, testing patterns

<img width="1022" height="966" alt="image" src="https://github.com/user-attachments/assets/dae1fa1e-9f4c-4975-8efc-66cd4638a7dd" />


## 📋 Prerequisites

- Basic knowledge of React and TypeScript
- Familiarity with modern JavaScript (ES6+)
- Understanding of HTML/CSS fundamentals
- Node.js 18+ installed on your machine

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/patocallaghan/tiptap-tutorial.git
cd tiptap-tutorial
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view the tutorial in your browser.

### 3. Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode  
pnpm test:watch

# Run tests for a specific lesson
pnpm test lesson-01
```

## 📚 Lesson Structure

Each lesson follows a consistent structure:

- **Learning Objectives**: Clear goals for what you'll achieve
- **Prerequisites**: Required knowledge from previous lessons  
- **TODO Implementation**: Hands-on coding exercises
- **Key Concepts**: Essential knowledge points
- **Tests**: Verification of your implementation
- **README Guide**: Step-by-step implementation instructions

## 📖 Curriculum Overview

### **Beginner Level**

#### [Lesson 01: Basic Editor Setup](src/features/lesson-01/README.md)
Learn TipTap fundamentals, useEditor hook, and StarterKit configuration.
- Editor instance creation and configuration
- Basic controls and editor methods
- Placeholder setup and content management

#### [Lesson 02: Content & Document Structure](src/features/lesson-02/README.md)
Understand ProseMirror's document model, schema validation, and content structure.
- Document structure and JSON representation
- Schema validation and content rules
- Nodes vs marks distinction

#### [Lesson 03: Commands & Node Positions](src/features/lesson-03/README.md)
Master the command system for programmatic content manipulation.
- Command chaining and execution
- Position-based operations
- Selection handling and content insertion

#### [Lesson 04: Input Rules & Paste Rules](src/features/lesson-04/README.md)
Implement auto-formatting with input rules and paste handling.
- Markdown-style shortcuts
- Pattern matching and transformation
- Paste event handling

### **Intermediate Level**

#### [Lesson 05: Events & Editor Lifecycle](src/features/lesson-05/README.md)
Handle editor events, transactions, and lifecycle management.
- Event handling (focus, blur, update)
- Transaction hooks and monitoring
- Editor lifecycle management

#### [Lesson 06: Custom Menus & UI Controls](src/features/lesson-06/README.md)
Build interactive toolbars, bubble menus, and floating menus.
- Formatting toolbar creation
- BubbleMenu for selection-based controls
- FloatingMenu for empty paragraphs

#### [Lesson 07: Suggestion System & Typeahead](src/features/lesson-07/README.md)
Implement mentions, slash commands, and autocomplete functionality.
- @mention system with typeahead
- Custom suggestion rendering
- Keyboard navigation and selection

#### [Lesson 08: StarterKit Extensions & Configuration](src/features/lesson-08/README.md)
Deep dive into built-in extensions and selective loading.
- Extension configuration options
- Performance optimization
- Custom StarterKit builds

### **Advanced Level**

#### [Lesson 09: Custom Marks Development](src/features/lesson-09/README.md)
Create custom marks for highlighting, annotations, and inline formatting.
- Mark schema definition
- Custom mark extensions
- Styling and interaction patterns

#### [Lesson 10: Custom Nodes Development](src/features/lesson-10/README.md)
Build custom nodes for special content blocks and interactive elements.
- Node schema and structure
- React node views
- Interactive block elements

#### [Lesson 11: Advanced ProseMirror Integration](src/features/lesson-11/README.md)
Access ProseMirror APIs directly for advanced customization.
- Direct ProseMirror usage
- Custom plugins and decorations
- Schema manipulation

#### [Lesson 12: Content Serialization & Production Ready](src/features/lesson-12/README.md)
Implement serialization, persistence, and production optimization.
- JSON/HTML conversion
- Auto-save functionality
- Performance optimization
- Testing strategies

## 🧪 Testing Your Progress

Each lesson includes comprehensive tests to verify your implementation:

```bash
# Run specific lesson tests
pnpm test lesson-01
pnpm test lesson-05
pnpm test lesson-12

# Run all tests
pnpm test:run

# Interactive test UI
pnpm test:ui
```

## 🏗️ Project Structure

```
src/
├── components/           # Shared components
│   └── layout.tsx       # Main layout with navigation
├── features/            # Feature-based organization
│   ├── home/           # Tutorial home page
│   ├── lesson-01/      # Basic Editor Setup
│   ├── lesson-02/      # Content & Document Structure
│   ├── ...             # Additional lessons
│   └── lesson-12/      # Production Ready
├── lib/                # Utility functions
│   └── cn.ts          # Class name utility
└── test/              # Test configuration
    └── setup.ts       # Test setup
```

## 🔧 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run linting
pnpm lint

# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with UI
pnpm test:ui
```

## 📖 Learning Path

### For Beginners
Start with Lesson 01 and progress sequentially through all lessons. Each lesson builds upon previous concepts, so don't skip ahead.

### For Intermediate Users
If you're familiar with rich text editors, you might start at Lesson 05 (Events) or Lesson 06 (Menus), but we recommend reviewing earlier lessons for TipTap-specific concepts.

### For Advanced Users
Jump to Lessons 09-12 for custom extension development and production patterns, but ensure you understand TipTap's architecture from earlier lessons.

## 🎓 Completion Certificates

After completing all lessons and passing the tests, you'll have:

- Built a comprehensive understanding of TipTap architecture
- Created custom extensions (marks and nodes)
- Implemented advanced UI patterns (menus, suggestions)
- Learned production deployment strategies
- Mastered performance optimization techniques

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Areas for Contribution
- Additional lesson content or exercises
- Bug fixes in existing lessons
- Performance improvements
- Documentation enhancements
- New testing scenarios

## 📚 Additional Resources

### Official Documentation
- [TipTap Documentation](https://tiptap.dev/docs)
- [ProseMirror Guide](https://prosemirror.net/docs/guide/)
- [React Documentation](https://react.dev)

### Related Projects
- [TipTap Examples](https://tiptap.dev/examples)
- [ProseMirror Examples](https://prosemirror.net/examples/)
- [Rich Text Editor Patterns](https://github.com/topics/rich-text-editor)

### Community
- [TipTap Discord](https://discord.gg/WtJ49jGshW)
- [TipTap GitHub Discussions](https://github.com/ueberdosis/tiptap/discussions)

## 📄 License

This tutorial is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [TipTap team](https://github.com/ueberdosis/tiptap) for creating an excellent rich text editor
- [ProseMirror](https://prosemirror.net/) for the foundational technology
- [React community](https://react.dev) for the ecosystem and patterns

## 🐛 Issues & Feedback

Found a bug or have a suggestion? Please [open an issue](https://github.com/patocallaghan/tiptap-tutorial/issues) on GitHub.

---

**Happy Learning!** 🚀

Start your journey with [Lesson 01: Basic Editor Setup](src/features/lesson-01/README.md) and build your way up to becoming a TipTap expert.
