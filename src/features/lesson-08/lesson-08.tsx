import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';
import { useState } from 'react';

export function Lesson08() {
  const [useCustomConfig, setUseCustomConfig] = useState(false);

  // TODO: Configure StarterKit with custom options
  // See README.md for detailed configuration examples
  const defaultEditor = useEditor({
    extensions: [
      StarterKit,
      // TODO: Add CharacterCount or other extensions
    ],
    content: `
      <h2>StarterKit Extensions & Configuration</h2>
      <p>The StarterKit provides a comprehensive set of extensions out of the box.</p>
      <p><strong>TODO:</strong> Configure the extensions below following the README guide.</p>
    `,
  });

  // TODO: Create editor with individual extensions instead of StarterKit
  // Import individual extensions and configure them one by one
  const customEditor = useEditor({
    extensions: [
      StarterKit,
      // TODO: Replace StarterKit with individual extension imports
      // See README.md for step-by-step guide
    ],
    content: `
      <h2>Individual Extension Configuration</h2>
      <p>This editor should use individual extension imports instead of StarterKit.</p>
      <p><strong>TODO:</strong> Implement this following the README guide.</p>
    `,
  });

  const editor = useCustomConfig ? customEditor : defaultEditor;

  if (!editor) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 08: StarterKit vs Individual Extensions
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/extensions/functionality/starterkit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn how to configure StarterKit extensions and understand when to use individual extension imports for fine-grained control.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Configure StarterKit extensions with custom options</li>
          <li>• Understand the trade-offs between StarterKit and individual imports</li>
          <li>• Implement individual extension loading for maximum control</li>
          <li>• Compare bundle sizes and performance implications</li>
          <li>• Learn extension configuration patterns</li>
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-7 before starting this lesson. Understanding of extensions and editor configuration is required.
        </p>
      </div>

      {/* Understanding This Lesson */}
      <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-purple-800 mb-2">
          🏗️ Understanding This Lesson
        </h3>
        <div className="text-sm text-purple-700 space-y-2">
          <p><strong>This is a hands-on exercise</strong> where you'll implement two different configuration approaches:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Minimal scaffolding provided (basic StarterKit only)</li>
            <li>You'll configure StarterKit with custom options</li>
            <li>You'll replace StarterKit with individual extension imports</li>
            <li>Compare the two approaches and understand trade-offs</li>
          </ul>
          <p className="mt-2">
            <em>Follow the README.md for detailed step-by-step instructions!</em>
          </p>
        </div>
      </div>

      {/* TODO Section */}
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          📝 TODO: Your Implementation
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>Follow the README.md guide to implement:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Configure StarterKit with custom extension options (headings, lists, history, etc.)</li>
            <li>Add additional extensions like CharacterCount</li>
            <li>Implement individual extension imports replacing StarterKit</li>
            <li>Configure HTML attributes and styling for extensions</li>
            <li>Compare bundle sizes between the two approaches</li>
          </ul>
        </div>
      </div>

      {/* Configuration Toggle */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Configuration Approach</h3>
            <p className="text-xs text-gray-600 mt-1">
              Toggle between StarterKit and Individual Extensions
            </p>
          </div>
          <button
            onClick={() => setUseCustomConfig(!useCustomConfig)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              useCustomConfig ? "bg-blue-600" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                useCustomConfig ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
        <div className="mt-3 text-xs">
          <span className="font-medium">
            Current: {useCustomConfig ? "Individual Extensions" : "StarterKit Configuration"}
          </span>
        </div>
      </div>

      {/* Editor Container */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">
            TipTap Editor - {useCustomConfig ? "Custom Extensions" : "StarterKit"}
          </h3>
          <span className="text-xs text-gray-500">
            {editor?.storage.characterCount?.characters() || 0} characters
          </span>
        </div>
        <div className="p-4">
          <EditorContent
            editor={editor}
            className={cn(
              "prose prose-sm max-w-none focus:outline-none",
              "min-h-[400px] p-3 border rounded-md"
            )}
          />
        </div>
      </div>

      {/* Key Concepts */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>StarterKit</strong>: Convenient bundle of commonly used extensions</li>
          <li>• <strong>Extension Configuration</strong>: Customize behavior through configure() method</li>
          <li>• <strong>Individual Imports</strong>: Load only needed extensions for smaller bundle</li>
          <li>• <strong>HTML Attributes</strong>: Add custom classes and attributes to rendered elements</li>
          <li>• <strong>Bundle Size</strong>: Trade-off between convenience and optimization</li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link
          to="/lesson-07"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link
          to="/lesson-09"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}
