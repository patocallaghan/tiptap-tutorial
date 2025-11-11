import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export function Lesson10() {
  // TODO: Students will implement custom nodes here
  const editor = useEditor({
    extensions: [
      StarterKit,
      // TODO: Add custom card node
      // TODO: Add interactive button node
      // TODO: Add code block with syntax highlighting
    ],
    content: `
      <p>Welcome to custom node development! This lesson teaches you to create block-level custom elements.</p>
      <p>You'll learn to build:</p>
      <ul>
        <li>Interactive card components</li>
        <li>Custom button elements</li>
        <li>Advanced code blocks</li>
        <li>Node views for complex rendering</li>
      </ul>
      <p>Custom nodes are perfect for creating rich, interactive content blocks.</p>
    `,
    // TODO: Add node view configurations
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 10: Custom Nodes Development
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/guide/node-views"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Master custom node creation for building interactive block-level content. 
          Learn node views, custom rendering, and advanced node interactions.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Create custom block nodes with complex content</li>
          <li>• Implement node views for interactive rendering</li>
          <li>• Build card components with editable content</li>
          <li>• Handle node attributes and data validation</li>
          <li>• Integrate React components as node views</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-9 before starting this lesson. Understanding of custom marks, 
          ProseMirror schema, and React components is essential.
        </p>
      </div>

      {/* Understanding This Lesson */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-purple-800 mb-2">
          🏗️ Understanding This Lesson
        </h3>
        <div className="text-sm text-purple-700 space-y-2">
          <p><strong>This is a hands-on exercise</strong> where you'll build custom nodes from scratch:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Minimal scaffolding provided (just StarterKit)</li>
            <li>Disabled buttons show what features you'll implement</li>
            <li>Follow README.md for detailed implementation steps</li>
            <li>Learn by building real TipTap extensions with React node views</li>
          </ul>
        </div>
      </div>

      {/* TODO Section - Where students implement */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          📝 TODO: Your Implementation
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Follow the README.md guide to implement:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Create a Card node with title, content, and styling</li>
            <li>Build an Interactive Button node with click handlers</li>
            <li>Implement a Code Block node with syntax highlighting</li>
            <li>Add node insertion commands and shortcuts</li>
            <li>Create React-based node views</li>
            <li>Handle node selection and deletion</li>
          </ul>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor - Custom Nodes</h3>
        </div>
        
        {/* TODO: Students will add custom node insertion toolbar */}
        <div className="bg-gray-50 px-4 py-2 border-b">
          <div className="flex gap-2">
            {/* TODO: Add node insertion buttons */}
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              📋 Insert Card (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              🔘 Insert Button (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              💻 Code Block (TODO)
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <EditorContent 
            editor={editor} 
            className={cn(
              "prose prose-sm max-w-none focus:outline-none",
              "min-h-[350px] p-3 border rounded-md"
            )}
          />
        </div>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Custom Nodes</strong>: Block-level content elements with custom behavior</li>
          <li>• <strong>Node Views</strong>: Custom rendering components for complex node display</li>
          <li>• <strong>Node Attributes</strong>: Data storage and configuration for node instances</li>
          <li>• <strong>Node Commands</strong>: Methods to insert, update, and manipulate nodes</li>
          <li>• <strong>Content Expressions</strong>: Defining what content nodes can contain</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-09" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-11" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}