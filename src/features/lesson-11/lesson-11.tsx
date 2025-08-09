import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export function Lesson11() {
  // TODO: Students will implement advanced ProseMirror integration
  const editor = useEditor({
    extensions: [
      StarterKit,
      // TODO: Add direct ProseMirror plugin integration
      // TODO: Add custom schema modifications
      // TODO: Add transaction listeners and filters
    ],
    content: `
      <p>Welcome to advanced ProseMirror integration! This lesson dives deep into the underlying ProseMirror APIs.</p>
      <p>You'll learn to work directly with:</p>
      <ul>
        <li>ProseMirror schema customization</li>
        <li>Transaction handling and filtering</li>
        <li>Custom plugins and decorations</li>
        <li>Direct view manipulation</li>
      </ul>
      <p>This is the most advanced lesson covering low-level ProseMirror concepts.</p>
    `,
    // TODO: Add advanced ProseMirror configuration
    onCreate: ({ editor }) => {
      // TODO: Access ProseMirror instance directly
      console.log('ProseMirror view:', editor.view);
      console.log('ProseMirror state:', editor.state);
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 11: Advanced ProseMirror Integration
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/guide/prosemirror"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Master direct ProseMirror API integration, custom schema manipulation, and advanced 
          transaction handling. Learn to work with the underlying ProseMirror architecture.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Access and manipulate ProseMirror schema directly</li>
          <li>• Create custom ProseMirror plugins and decorations</li>
          <li>• Handle transactions with filters and transformations</li>
          <li>• Implement advanced document analysis and manipulation</li>
          <li>• Integrate third-party ProseMirror plugins</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-10 before starting this lesson. Deep understanding of TipTap architecture, 
          custom extensions, and JavaScript/TypeScript is essential.
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
            <li>Access ProseMirror view and state directly</li>
            <li>Create custom schema modifications and node types</li>
            <li>Implement transaction filters and transformations</li>
            <li>Build custom plugins with decorations</li>
            <li>Add document analysis and content validation</li>
            <li>Integrate collaborative editing capabilities</li>
          </ul>
        </div>
      </div>

      {/* Advanced Controls Section */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-purple-800 mb-2">
          ⚡ Advanced Controls
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-purple-700 mb-2">Schema Information</h4>
            <button
              onClick={() => {
                if (editor) {
                  console.log('Schema:', editor.schema);
                  alert('Schema logged to console');
                }
              }}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={!editor}
            >
              🏗️ Log Schema
            </button>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 mb-2">Transaction Info</h4>
            <button
              onClick={() => {
                if (editor) {
                  console.log('Current state:', editor.state);
                  alert('State logged to console');
                }
              }}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled={!editor}
            >
              📊 Log State
            </button>
          </div>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor - Advanced ProseMirror</h3>
        </div>
        
        {/* TODO: Students will add advanced ProseMirror controls */}
        <div className="bg-gray-50 px-4 py-2 border-b">
          <div className="flex gap-2 flex-wrap">
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              🔧 Custom Plugin (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              🎨 Decorations (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              🔄 Transaction Filter (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              🧪 Schema Modification (TODO)
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

      {/* Debug Information */}
      {editor && (
        <div className="mt-6 bg-gray-50 border rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Debug Information</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Editor View: {editor.view ? '✅ Available' : '❌ Not available'}</div>
            <div>Current Selection: {editor.state.selection.from}-{editor.state.selection.to}</div>
            <div>Document Size: {editor.state.doc.content.size} characters</div>
            <div>Schema Nodes: {Object.keys(editor.schema.nodes).join(', ')}</div>
            <div>Schema Marks: {Object.keys(editor.schema.marks).join(', ')}</div>
          </div>
        </div>
      )}

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>ProseMirror Schema</strong>: Document structure definition and validation rules</li>
          <li>• <strong>Transactions</strong>: Atomic document state changes and history tracking</li>
          <li>• <strong>Plugins</strong>: Custom functionality that extends editor capabilities</li>
          <li>• <strong>Decorations</strong>: Visual overlays and styling without modifying document</li>
          <li>• <strong>EditorView</strong>: DOM representation and user interaction handling</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-10" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-12" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}