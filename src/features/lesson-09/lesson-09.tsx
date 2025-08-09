import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export function Lesson09() {
  // TODO: Students will implement custom marks here
  const editor = useEditor({
    extensions: [
      StarterKit,
      // TODO: Add highlight mark extension
      // TODO: Add annotation mark extension
      // TODO: Add underline mark extension
    ],
    content: `
      <p>Welcome to custom marks development! This is where you'll learn to create your own inline formatting options.</p>
      <p>Try implementing the following custom marks:</p>
      <ul>
        <li>Highlight mark for text highlighting</li>
        <li>Annotation mark for adding comments and notes</li>
        <li>Underline mark with custom styling</li>
      </ul>
      <p>Select text and use your custom marks to format it.</p>
    `,
    // TODO: Add editor configuration for custom marks
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 09: Custom Marks Development
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/guide/custom-extensions#marks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn to create custom marks for highlighting, annotations, and inline formatting. 
          Build reusable mark extensions that can be applied to selected text.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Create a custom highlight mark with color options</li>
          <li>• Build an annotation system for inline comments</li>
          <li>• Implement keyboard shortcuts and toolbar integration</li>
          <li>• Handle mark attributes and styling</li>
          <li>• Understand mark parsing and serialization</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-8 before starting this lesson. Understanding of TipTap extensions, 
          commands, and the StarterKit is essential.
        </p>
      </div>

      {/* TODO Section - Where students implement */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          📝 TODO: Your Implementation
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Follow the README.md guide to implement:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Create a Highlight mark with multiple color options</li>
            <li>Build an Annotation mark for inline comments and notes</li>
            <li>Implement an Underline mark with custom styling</li>
            <li>Add keyboard shortcuts (Ctrl+Shift+H for highlight)</li>
            <li>Create toolbar buttons for mark activation</li>
            <li>Handle mark attributes and data persistence</li>
          </ul>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor - Custom Marks</h3>
        </div>
        
        {/* TODO: Students will add custom toolbar here */}
        <div className="bg-gray-50 px-4 py-2 border-b">
          <div className="flex gap-2">
            {/* TODO: Add mark toggle buttons */}
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              🖍️ Highlight (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              💬 Annotate (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              📑 Underline (TODO)
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <EditorContent 
            editor={editor} 
            className={cn(
              "prose prose-sm max-w-none focus:outline-none",
              "min-h-[300px] p-3 border rounded-md"
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
          <li>• <strong>Mark Extensions</strong>: Inline formatting that can span text ranges</li>
          <li>• <strong>Mark Attributes</strong>: Data storage within marks (colors, IDs, metadata)</li>
          <li>• <strong>Mark Parsing</strong>: Converting HTML/JSON to mark instances</li>
          <li>• <strong>Mark Commands</strong>: Programmatic mark application and removal</li>
          <li>• <strong>Mark Shortcuts</strong>: Keyboard bindings for quick mark activation</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-08" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-10" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}