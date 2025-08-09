import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Mention } from '@tiptap/extension-mention';
import { Link } from 'react-router';
import { cn } from '../../lib/cn';
import { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';

// Mock data for mentions and slash commands
const MENTION_SUGGESTIONS = [
  { id: 'user1', label: 'John Doe' },
  { id: 'user2', label: 'Jane Smith' },
  { id: 'user3', label: 'Alice Johnson' },
  { id: 'user4', label: 'Bob Wilson' },
  { id: 'user5', label: 'Charlie Brown' },
];

const SLASH_COMMANDS = [
  { id: 'heading1', label: 'Heading 1', description: 'Large heading' },
  { id: 'heading2', label: 'Heading 2', description: 'Medium heading' },
  { id: 'paragraph', label: 'Paragraph', description: 'Regular text' },
  { id: 'bulletlist', label: 'Bullet List', description: 'Unordered list' },
  { id: 'blockquote', label: 'Quote', description: 'Block quotation' },
];

// Suggestion menu component
interface SuggestionProps {
  items: any[];
  command: (item: any) => void;
}

const MentionList = forwardRef<{ onKeyDown: (props: { event: KeyboardEvent }) => boolean }, SuggestionProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command(item);
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          upHandler();
          return true;
        }

        if (event.key === 'ArrowDown') {
          downHandler();
          return true;
        }

        if (event.key === 'Enter') {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="bg-white border rounded-lg shadow-lg p-2 max-w-xs">
        <div className="text-xs text-gray-500 mb-2">People</div>
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              key={item.id}
              className={cn(
                'w-full text-left px-2 py-1 rounded text-sm transition-colors',
                index === selectedIndex ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              )}
              onClick={() => selectItem(index)}
            >
              @{item.label}
            </button>
          ))
        ) : (
          <div className="text-sm text-gray-500 px-2 py-1">No matches found</div>
        )}
      </div>
    );
  }
);

// Slash commands component
const SlashCommandsList = forwardRef<{ onKeyDown: (props: { event: KeyboardEvent }) => boolean }, SuggestionProps>(
  (props, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = props.items[index];
      if (item) {
        props.command(item);
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    useEffect(() => setSelectedIndex(0), [props.items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === 'ArrowUp') {
          upHandler();
          return true;
        }

        if (event.key === 'ArrowDown') {
          downHandler();
          return true;
        }

        if (event.key === 'Enter') {
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    return (
      <div className="bg-white border rounded-lg shadow-lg p-2 min-w-[200px]">
        <div className="text-xs text-gray-500 mb-2">Commands</div>
        {props.items.length ? (
          props.items.map((item, index) => (
            <button
              key={item.id}
              className={cn(
                'w-full text-left px-2 py-2 rounded text-sm transition-colors',
                index === selectedIndex ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              )}
              onClick={() => selectItem(index)}
            >
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </button>
          ))
        ) : (
          <div className="text-sm text-gray-500 px-2 py-1">No commands found</div>
        )}
      </div>
    );
  }
);

export function Lesson07() {
  // TODO: Students will implement suggestion system and typeahead here
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: 'bg-blue-100 text-blue-700 px-1 rounded',
        },
        suggestion: {
          items: ({ query }) => {
            return MENTION_SUGGESTIONS.filter(item =>
              item.label.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
          },
          render: () => {
            let component: any;
            let popup: any;

            return {
              onStart: (props: any) => {
                component = new MentionList(props);
                
                if (!props.clientRect) {
                  return;
                }

                popup = document.createElement('div');
                document.body.appendChild(popup);
                
                const rect = props.clientRect();
                popup.style.position = 'fixed';
                popup.style.top = `${rect.bottom}px`;
                popup.style.left = `${rect.left}px`;
                popup.style.zIndex = '1000';
                
                // Render React component
                import('react-dom/client').then(({ createRoot }) => {
                  const root = createRoot(popup);
                  root.render(<MentionList {...props} ref={component} />);
                });
              },

              onUpdate: (props: any) => {
                if (!popup) return;
                
                const rect = props.clientRect();
                if (rect) {
                  popup.style.top = `${rect.bottom}px`;
                  popup.style.left = `${rect.left}px`;
                }
              },

              onKeyDown: (props: any) => {
                if (props.event.key === 'Escape') {
                  popup?.remove();
                  return true;
                }
                return component?.onKeyDown?.(props) || false;
              },

              onExit: () => {
                popup?.remove();
              },
            };
          },
        },
      }),
    ],
    content: `
      <h2>Suggestion System & Typeahead</h2>
      <p>Try typing @ followed by a name to see mention suggestions.</p>
      <p>You can mention people like @John or @Jane in your content.</p>
      <p><strong>TODO:</strong> Implement slash commands by typing / at the beginning of a line.</p>
      <p>This lesson demonstrates advanced input patterns for better user experience.</p>
    `,
    // TODO: Add slash command functionality and other suggestion systems
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
            Lesson 07: Suggestion System & Typeahead
          </h1>
          <a
            href="https://tiptap.dev/docs/editor/extensions/functionality/mention"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            📖 View Docs
          </a>
        </div>
        <p className="text-lg text-gray-600">
          Learn how to implement advanced input features like @mentions, slash commands, and autocomplete functionality.
        </p>
      </div>

      {/* Learning Objectives - Consistent format */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Learning Objectives
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Implement @mention system with typeahead search</li>
          <li>• Create slash commands menu for quick content insertion</li>
          <li>• Build autocomplete functionality with keyboard navigation</li>
          <li>• Handle suggestion popups and positioning</li>
          <li>• Integrate suggestion systems with editor commands</li>
        </ul>
      </div>

      {/* Prerequisites - If applicable */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">
          ⚠️ Prerequisites
        </h3>
        <p className="text-sm text-yellow-700">
          Complete lessons 1-6 before starting this lesson. Understanding of menus and editor events is required.
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
            <li>Enhanced @mention system with user data integration</li>
            <li>Slash commands menu for content blocks and formatting</li>
            <li>Autocomplete with fuzzy search and keyboard navigation</li>
            <li>Custom suggestion rendering and popup positioning</li>
            <li>Integration with external data sources</li>
          </ul>
        </div>
      </div>

      {/* Demo Instructions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-purple-800 mb-2">🎮 Interactive Demo</h4>
        <div className="text-sm text-purple-700 space-y-1">
          <p>• Type <code className="bg-purple-100 px-1 rounded">@</code> followed by a name (John, Jane, Alice, Bob, Charlie)</p>
          <p>• Use arrow keys to navigate suggestions, Enter to select</p>
          <p>• Try partial matches like <code className="bg-purple-100 px-1 rounded">@j</code> or <code className="bg-purple-100 px-1 rounded">@al</code></p>
          <p>• Press Escape to close suggestion menu</p>
          <p className="text-purple-600 font-medium">Coming soon: Slash commands with <code className="bg-purple-100 px-1 rounded">/</code></p>
        </div>
      </div>

      {/* Editor Container - Consistent styling */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 border-b">
          <h3 className="text-sm font-medium text-gray-700">TipTap Editor with Suggestions</h3>
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

      {/* Current Implementation Status */}
      <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-green-800 mb-2">✅ Current Implementation</h4>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• @mention system with typeahead search</li>
          <li>• Keyboard navigation (arrow keys, Enter, Escape)</li>
          <li>• Visual highlighting of matched suggestions</li>
          <li>• Popup positioning relative to cursor</li>
        </ul>
        
        <h4 className="text-sm font-medium text-yellow-800 mb-2 mt-4">🚧 TODO Implementation</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Slash commands for content blocks</li>
          <li>• Enhanced search with fuzzy matching</li>
          <li>• Multiple suggestion types</li>
          <li>• Custom suggestion rendering</li>
        </ul>
      </div>

      {/* Key Concepts - Consistent format */}
      <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4">
        <h3 className="text-sm font-medium text-green-800 mb-2">
          💡 Key Concepts
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• <strong>Mentions</strong>: @-triggered suggestions for referencing people or entities</li>
          <li>• <strong>Slash Commands</strong>: /-triggered quick commands for content creation</li>
          <li>• <strong>Typeahead</strong>: Real-time search and filtering of suggestions</li>
          <li>• <strong>Suggestion Rendering</strong>: Custom popup components with keyboard navigation</li>
          <li>• <strong>Command Integration</strong>: Converting suggestions into editor content</li>
        </ul>
      </div>

      {/* Navigation - Consistent across all lessons */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Link 
          to="/lesson-06" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Previous Lesson
        </Link>
        <Link 
          to="/lesson-08" 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Next Lesson →
        </Link>
      </div>
    </div>
  );
}