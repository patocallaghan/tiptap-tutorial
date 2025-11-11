import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export function Lesson06() {
  /**
   * GUIDED EXERCISE: Custom Menus & UI Controls
   *
   * This lesson demonstrates a complete implementation of custom menus and toolbars.
   * Study the code below to understand:
   * - How to build a fixed formatting toolbar
   * - How to implement BubbleMenu (appears on text selection)
   * - How to create FloatingMenu (appears on empty lines)
   * - How to manage button active states
   * - How to chain commands with focus management
   *
   * All three menu types are fully implemented below for you to study and extend!
   */
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Custom Menus & UI Controls</h2>
      <p>Select text to see the bubble menu, or place cursor on empty line for floating menu.</p>
      <p>This is some <strong>bold text</strong> and <em>italic text</em> to demonstrate the toolbar.</p>
      <blockquote>
        <p>This is a blockquote with different formatting options.</p>
      </blockquote>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 06: Custom Menus & UI Controls
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/api/menus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn how to build interactive toolbars, bubble menus, and floating menus that enhance the editing experience.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Study how to build custom formatting toolbars with action buttons</li>
          <li>• Learn how bubble menus appear when text is selected</li>
          <li>• Understand how floating menus provide contextual actions</li>
          <li>• See how UI controls reflect editor state dynamically</li>
          <li>• Learn toolbar button state management and interactions</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-5 before starting this lesson. Understanding of editor events and commands is required.
        </p>
      </div>

      {/* Understanding the Implementation */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-purple-800 mb-2">
          🔍 Understanding This Implementation
        </h3>
        <div className="text-sm text-purple-700 space-y-2">
          <p>This lesson includes three fully-implemented menu types:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Fixed Toolbar</strong> - Always visible with formatting buttons and active state styling</li>
            <li><strong>BubbleMenu</strong> - Context menu that appears when you select text</li>
            <li><strong>FloatingMenu</strong> - Helpful menu that shows on empty paragraphs</li>
          </ul>
          <p className="mt-2">
            <em>Study how each button uses editor.chain().focus() for proper cursor management!</em>
          </p>
        </div>
      </div>

      {/* Try It Yourself */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-orange-800 mb-2">
          🚀 Try It Yourself: Extension Challenges
        </h3>
        <div className="text-sm text-orange-700 space-y-2">
          <p>Extend this implementation by adding:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>More toolbar buttons (Code, Heading 3, Ordered List)</li>
            <li>Keyboard shortcuts display in the menus</li>
            <li>Custom icons instead of text labels</li>
            <li>A color picker for text/background colors</li>
            <li>A link insertion menu in the BubbleMenu</li>
            <li>Customizable menu positioning logic</li>
          </ul>
        </div>
      </div>

      {/* Custom Toolbar */}
      <div className="bg-white border rounded-lg p-3 mb-4 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            editor.isActive('bold')
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:bg-gray-100 border border-transparent"
          )}
        >
          Bold
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            editor.isActive('italic')
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:bg-gray-100 border border-transparent"
          )}
        >
          Italic
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            editor.isActive('strike')
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:bg-gray-100 border border-transparent"
          )}
        >
          Strike
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            editor.isActive('heading', { level: 1 })
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:bg-gray-100 border border-transparent"
          )}
        >
          H1
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            editor.isActive('heading', { level: 2 })
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:bg-gray-100 border border-transparent"
          )}
        >
          H2
        </button>

        <div className="w-px bg-gray-300 mx-1"></div>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            editor.isActive('bulletList')
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:bg-gray-100 border border-transparent"
          )}
        >
          • List
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
            editor.isActive('blockquote')
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "text-gray-600 hover:bg-gray-100 border border-transparent"
          )}
        >
          Quote
        </button>
      </div>

      {/* Bubble Menu - appears when text is selected */}
      <BubbleMenu
        editor={editor}
        className="bg-black text-white px-2 py-1 rounded-lg shadow-lg flex gap-1"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "px-2 py-1 text-xs rounded",
            editor.isActive('bold') ? "bg-white text-black" : "hover:bg-gray-700"
          )}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "px-2 py-1 text-xs rounded",
            editor.isActive('italic') ? "bg-white text-black" : "hover:bg-gray-700"
          )}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "px-2 py-1 text-xs rounded",
            editor.isActive('strike') ? "bg-white text-black" : "hover:bg-gray-700"
          )}
        >
          Strike
        </button>
      </BubbleMenu>

      {/* Floating Menu - appears on empty lines */}
      <FloatingMenu
        editor={editor}
        className="bg-gray-100 border rounded-lg p-2 shadow-lg"
      >
        <div className="text-xs text-gray-500 mb-2">Add content:</div>
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
          >
            Heading 1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="px-2 py-1 text-xs bg-white border rounded hover:bg-gray-50"
          >
            Quote
          </button>
        </div>
      </FloatingMenu>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor with Custom Menus</h3>
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

      {/* Usage Instructions */}
      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">🎯 Try These Interactions:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Select text to see the bubble menu appear</li>
          <li>• Click on an empty line to see the floating menu</li>
          <li>• Use the toolbar buttons to format text</li>
          <li>• Notice how button states change based on current selection</li>
        </ul>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>BubbleMenu</strong>: Context menu that appears when text is selected</li>
          <li>• <strong>FloatingMenu</strong>: Menu that appears in empty paragraphs for quick content creation</li>
          <li>• <strong>Toolbar</strong>: Fixed UI element with common formatting commands</li>
          <li>• <strong>Active States</strong>: Visual feedback showing current formatting state</li>
          <li>• <strong>Command Chaining</strong>: Combining multiple commands with focus management</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-05" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-07" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}