import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';

export function Lesson12() {
  // TODO: Students will implement production-ready features
  const editor = useEditor({
    extensions: [
      StarterKit,
      // TODO: Add performance optimization extensions
      // TODO: Add serialization/deserialization handlers
      // TODO: Add error boundaries and fallbacks
    ],
    content: `
      <p>Welcome to the final lesson! Learn to make your TipTap editor production-ready.</p>
      <p>This comprehensive lesson covers:</p>
      <ul>
        <li>Content serialization to JSON and HTML</li>
        <li>Data persistence and synchronization</li>
        <li>Performance optimization techniques</li>
        <li>Error handling and recovery</li>
        <li>Testing strategies and patterns</li>
      </ul>
      <p>Master these concepts to deploy robust TipTap applications.</p>
    `,
    // TODO: Add production configurations
    onUpdate: ({ editor }) => {
      // TODO: Implement auto-save functionality
      console.log('Content updated:', editor.getJSON());
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 12: Content Serialization & Production Ready
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/guide/output"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Master content serialization, data persistence, performance optimization, and production 
          deployment. Build robust, scalable TipTap applications ready for real-world use.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Implement JSON and HTML content serialization</li>
          <li>• Build auto-save and data persistence systems</li>
          <li>• Optimize editor performance for large documents</li>
          <li>• Handle errors and implement recovery strategies</li>
          <li>• Create comprehensive testing patterns</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete all previous lessons (1-11). This final lesson integrates concepts from the entire 
          tutorial series and requires comprehensive TipTap knowledge.
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
            <li>JSON and HTML serialization with validation</li>
            <li>Auto-save functionality with debouncing</li>
            <li>Content versioning and conflict resolution</li>
            <li>Performance monitoring and optimization</li>
            <li>Comprehensive error handling and recovery</li>
            <li>Production-ready testing patterns</li>
          </ul>
        </div>
      </div>

      {/* Production Features Section */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          🚀 Production Features
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-green-700 mb-2">Content Management</h4>
            <div className="space-y-1 text-green-600">
              <div>• Auto-save: TODO</div>
              <div>• Version control: TODO</div>
              <div>• Conflict resolution: TODO</div>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-green-700 mb-2">Performance</h4>
            <div className="space-y-1 text-green-600">
              <div>• Lazy loading: TODO</div>
              <div>• Memory optimization: TODO</div>
              <div>• Bundle size: TODO</div>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor - Production Ready</h3>
        </div>
        
        {/* TODO: Students will add production toolbar */}
        <div className="bg-gray-50 px-4 py-2 border-b">
          <div className="flex gap-2 flex-wrap">
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              💾 Save (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              📤 Export HTML (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              📋 Export JSON (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              🔄 Load Version (TODO)
            </button>
            <button
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-100 disabled:opacity-50"
              disabled
            >
              📊 Performance (TODO)
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

      {/* Status Information */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Save Status</h4>
          <div className="text-xs text-blue-600">
            <div>Last saved: Never</div>
            <div>Status: Not implemented</div>
            <div>Changes: Unsaved</div>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-purple-800 mb-2">Performance</h4>
          <div className="text-xs text-purple-600">
            <div>Document size: {editor ? editor.state.doc.content.size : 0} chars</div>
            <div>Memory usage: TODO</div>
            <div>Render time: TODO</div>
          </div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-orange-800 mb-2">Health Check</h4>
          <div className="text-xs text-orange-600">
            <div>Editor status: {editor ? '✅ Ready' : '❌ Loading'}</div>
            <div>Error count: 0</div>
            <div>Warnings: None</div>
          </div>
        </div>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Content Serialization</strong>: Converting editor content to/from JSON and HTML</li>
          <li>• <strong>Data Persistence</strong>: Saving, loading, and synchronizing editor content</li>
          <li>• <strong>Performance Optimization</strong>: Techniques for handling large documents efficiently</li>
          <li>• <strong>Error Recovery</strong>: Handling failures gracefully and maintaining data integrity</li>
          <li>• <strong>Testing Strategies</strong>: Comprehensive testing patterns for production applications</li>
        </ul>
      </div>

      {/* Navigation - Final lesson links to home */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-11" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          🏠 Back to Home
        </Link>
      </div>

      {/* Completion Badge */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full">
          <span className="text-2xl mr-2">🎉</span>
          <span className="font-semibold">Congratulations! You've completed the TipTap Tutorial!</span>
        </div>
      </div>
    </div>
  );
}