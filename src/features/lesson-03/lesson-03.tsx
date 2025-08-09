import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';
import { useState } from 'react';

export function Lesson03() {
  const [selectionInfo, setSelectionInfo] = useState<string>('');
  const [commandResult, setCommandResult] = useState<string>('');
  
  // TODO: Students will implement command exploration here
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h2>Commands & Node Positions</h2>
      <p>Click anywhere in this text to see position information. Select text to see selection details.</p>
      <p>This paragraph contains <strong>bold text</strong> and <em>italic text</em> for testing commands.</p>
      <ul>
        <li>First item in a list</li>
        <li>Second item with some content</li>
      </ul>
      <blockquote>
        <p>A blockquote for testing node manipulation.</p>
      </blockquote>
    `,
    // TODO: Add selection change listener
    onSelectionUpdate: ({ editor }) => {
      const { selection } = editor.state;
      const info = {
        from: selection.from,
        to: selection.to,
        empty: selection.empty,
        anchor: selection.anchor,
        head: selection.head,
        type: selection.constructor.name,
      };
      
      // TODO: Add more detailed position analysis
      setSelectionInfo(JSON.stringify(info, null, 2));
    },
  });

  // TODO: Implement command testing functions
  const testBasicCommands = () => {
    if (!editor) return;
    
    // TODO: Chain multiple commands together
    editor
      .chain()
      .focus()
      .toggleBold()
      .toggleItalic()
      .run();
    
    setCommandResult('Applied bold and italic formatting');
  };

  const testNodeCommands = () => {
    if (!editor) return;
    
    const { selection } = editor.state;
    
    // TODO: Implement node-specific commands
    if (selection.empty) {
      editor.chain().focus().setParagraph().run();
      setCommandResult('Set current line to paragraph');
    } else {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
      setCommandResult('Toggled heading level 2');
    }
  };

  const testPositionCommands = () => {
    if (!editor) return;
    
    // TODO: Implement position-based operations
    const { doc } = editor.state;
    const pos = editor.state.selection.from;
    
    // Find node at current position
    const resolvedPos = doc.resolve(pos);
    const nodeAtPos = resolvedPos.parent;
    
    console.log('Node at position:', nodeAtPos.type.name);
    console.log('Resolved position info:', {
      pos: resolvedPos.pos,
      depth: resolvedPos.depth,
      parentOffset: resolvedPos.parentOffset,
    });
    
    setCommandResult(`Node at position ${pos}: ${nodeAtPos.type.name}`);
  };

  const insertContentAtPosition = () => {
    if (!editor) return;
    
    // TODO: Implement content insertion at specific positions
    const currentPos = editor.state.selection.from;
    
    editor
      .chain()
      .focus()
      .insertContentAt(currentPos, '**[INSERTED]** ')
      .run();
    
    setCommandResult(`Inserted content at position ${currentPos}`);
  };

  const replaceSelectionWithNode = () => {
    if (!editor) return;
    
    // TODO: Replace selection with specific node type
    editor
      .chain()
      .focus()
      .insertContent('<hr>')
      .run();
    
    setCommandResult('Replaced selection with horizontal rule');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header - Consistent across all lessons */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Lesson 03: Commands & Node Positions
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/guide/commands"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Master TipTap's command system, understand node positioning, and learn to manipulate content programmatically.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Understand TipTap's command system and chaining</li>
          <li>• Learn about node positions and selection handling</li>
          <li>• Implement position-based content operations</li>
          <li>• Master programmatic content manipulation</li>
        </ul>
      </div>

      {/* Prerequisites */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete Lessons 01 and 02 before starting this lesson.
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
            <li>Add selection change listener for position tracking</li>
            <li>Implement custom command sequences using chain()</li>
            <li>Create position-based content manipulation functions</li>
            <li>Build advanced content insertion and replacement logic</li>
          </ul>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor - Commands & Positions</h3>
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
        {/* Command Controls */}
        <div className="bg-gray-50 px-4 py-2 border-t">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={testBasicCommands}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Test Basic Commands
            </button>
            <button 
              onClick={testNodeCommands}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Test Node Commands
            </button>
            <button 
              onClick={testPositionCommands}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Analyze Position
            </button>
            <button 
              onClick={insertContentAtPosition}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Insert at Position
            </button>
            <button 
              onClick={replaceSelectionWithNode}
              className="px-3 py-1 text-xs bg-white border rounded hover:bg-gray-50"
              disabled={!editor}
            >
              Replace with Node
            </button>
          </div>
        </div>
      </div>

      {/* Selection Info Display */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h3 className="text-sm font-medium text-gray-700">Selection & Position Info</h3>
          </div>
          <div className="p-4">
            <pre className="text-xs bg-gray-50 p-3 rounded border overflow-auto max-h-40">
              {selectionInfo || 'Click in the editor to see selection information...'}
            </pre>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b">
            <h3 className="text-sm font-medium text-gray-700">Command Results</h3>
          </div>
          <div className="p-4">
            <div className="text-xs bg-gray-50 p-3 rounded border min-h-[120px]">
              {commandResult || 'Execute commands to see results...'}
            </div>
          </div>
        </div>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Commands</strong>: Functions that modify editor state (formatting, insertion, deletion)</li>
          <li>• <strong>Command Chaining</strong>: Combining multiple commands with .chain() for atomic operations</li>
          <li>• <strong>Node Positions</strong>: Absolute positions in the document for precise content manipulation</li>
          <li>• <strong>Selection</strong>: Current cursor position or selected text range with anchor and head</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-02" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-04" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}