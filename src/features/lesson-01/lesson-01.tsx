import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export function Lesson01() {
  // TODO: Students will implement editor configuration here
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Welcome to TipTap! Start typing to see the editor in action.</p>',
    // TODO: Add placeholder configuration
    // TODO: Explore editor instance methods
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 01: Basic Editor Setup
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/introduction"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn the fundamentals of setting up a TipTap editor, understanding the useEditor hook, and configuring the StarterKit extension.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Understand how to initialize a TipTap editor with useEditor hook</li>
          <li>• Configure the StarterKit extension for basic functionality</li>
          <li>• Add a placeholder to guide user interaction</li>
          <li>• Explore the editor instance and its methods</li>
        </ul>
      </div>

      {/* TODO Section - Where students implement */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          📝 TODO: Your Implementation
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Follow the README.md guide to implement:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Add a placeholder to the editor configuration</li>
            <li>Implement editor instance methods (focus, clear, etc.)</li>
            <li>Add basic editor controls using the editor instance</li>
            <li>Explore the editor's content and state</li>
          </ul>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor</h3>
        </div>
        <div className="p-4">
          <EditorContent 
            editor={editor} 
            className={cn(
              "prose prose-sm max-w-none focus:outline-none",
              "min-h-[200px] p-3 border rounded-md"
            )}
          />
        </div>
        {/* TODO: Add editor controls here */}
        <div className="bg-gray-50 px-4 py-2 border-t">
          <div className="flex gap-2">
            <button 
              onClick={() => editor?.chain().focus().clearContent().run()}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Clear
            </button>
            <button 
              onClick={() => editor?.chain().focus().run()}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Focus
            </button>
            <span className="text-xs text-gray-500 py-1 px-2">
              Characters: {editor?.storage.characterCount?.characters() || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>useEditor Hook</strong>: React hook that creates and manages an editor instance</li>
          <li>• <strong>StarterKit</strong>: Pre-configured bundle of essential TipTap extensions</li>
          <li>• <strong>Editor Instance</strong>: The core object containing all editor methods and state</li>
          <li>• <strong>EditorContent</strong>: React component that renders the editable content area</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Home
        </Link>
        <Link 
          to="/lesson-02" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}