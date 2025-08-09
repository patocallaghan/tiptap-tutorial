import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export function Lesson05() {
  // TODO: Students will implement event handling and lifecycle hooks here
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start typing to see editor events in action...</p>',
    // TODO: Add event handlers and transaction hooks
    onCreate: ({ editor }) => {
      console.log('Editor created:', editor);
    },
    onUpdate: ({ editor }) => {
      console.log('Content updated:', editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      console.log('Selection updated:', editor.state.selection);
    },
    onTransaction: ({ editor, transaction }) => {
      console.log('Transaction occurred:', transaction);
    },
    onFocus: ({ editor }) => {
      console.log('Editor focused');
    },
    onBlur: ({ editor }) => {
      console.log('Editor blurred');
    },
    onDestroy: () => {
      console.log('Editor destroyed');
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 05: Events & Editor Lifecycle
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/api/events"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn how to handle editor events, implement transaction hooks, and manage the editor lifecycle effectively.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Understand editor lifecycle events and when they occur</li>
          <li>• Implement event handlers for content changes and user interactions</li>
          <li>• Work with ProseMirror transactions and transaction hooks</li>
          <li>• Monitor editor state changes and selection updates</li>
          <li>• Debug editor behavior using event logging</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-4 before starting this lesson. Understanding of commands and content manipulation is required.
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
            <li>Custom event handlers for different editor events</li>
            <li>Transaction listeners to monitor content changes</li>
            <li>State management for editor lifecycle tracking</li>
            <li>Event logging system for debugging</li>
            <li>Performance monitoring using event timing</li>
          </ul>
        </div>
      </div>

      {/* Event Log Display */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg mb-6 font-mono text-sm">
        <h4 className="text-white mb-2">🔍 Event Log (Check Browser Console)</h4>
        <p className="text-gray-400">
          Open browser developer tools console to see real-time editor events.
          Try typing, selecting text, or clicking in/out of the editor.
        </p>
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
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Editor Events</strong>: Lifecycle hooks for tracking editor state changes</li>
          <li>• <strong>Transactions</strong>: ProseMirror's atomic units of document change</li>
          <li>• <strong>Event Handlers</strong>: Functions that respond to specific editor events</li>
          <li>• <strong>Lifecycle Management</strong>: Properly handling editor creation and destruction</li>
          <li>• <strong>State Monitoring</strong>: Tracking selections, content, and editor focus</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-04" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-06" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}