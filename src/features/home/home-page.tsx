import { Link } from 'react-router';

const lessons = [
  {
    id: 1,
    title: 'Basic Editor Setup',
    description: 'Introduction to TipTap, useEditor hook, and StarterKit configuration',
    docs: 'https://tiptap.dev/docs/editor/getting-started/installation',
    path: '/lesson-01',
  },
  {
    id: 2,
    title: 'Content & Document Structure',
    description: 'Understanding ProseMirror schema, nodes, marks, and content validation',
    docs: 'https://tiptap.dev/docs/editor/guide/content',
    path: '/lesson-02',
  },
  {
    id: 3,
    title: 'Commands & Node Positions',
    description: 'Using built-in commands, node positioning, and programmatic content manipulation',
    docs: 'https://tiptap.dev/docs/editor/api/commands',
    path: '/lesson-03',
  },
  {
    id: 4,
    title: 'Input Rules & Paste Rules',
    description: 'Auto-formatting with input rules, paste handling, and content transformation',
    docs: 'https://tiptap.dev/docs/editor/guide/custom-extensions#input-rules',
    path: '/lesson-04',
  },
  {
    id: 5,
    title: 'Events & Editor Lifecycle',
    description: 'Handling editor events, onChange, focus, blur, and transaction hooks',
    docs: 'https://tiptap.dev/docs/editor/api/events',
    path: '/lesson-05',
  },
  {
    id: 6,
    title: 'Custom Menus & UI Controls',
    description: 'Building toolbar, bubble menus, floating menus, and interactive controls',
    docs: 'https://tiptap.dev/docs/editor/guide/menus',
    path: '/lesson-06',
  },
  {
    id: 7,
    title: 'Suggestion System & Typeahead',
    description: 'Implementing mentions, slash commands, and autocomplete functionality',
    docs: 'https://tiptap.dev/docs/editor/utilities/suggestion',
    path: '/lesson-07',
  },
  {
    id: 8,
    title: 'StarterKit Extensions & Configuration',
    description: 'Deep dive into built-in extensions, options, and selective loading',
    docs: 'https://tiptap.dev/docs/editor/extensions/functionality/starterkit',
    path: '/lesson-08',
  },
  {
    id: 9,
    title: 'Custom Marks Development',
    description: 'Creating custom marks for highlighting, annotations, and inline formatting',
    docs: 'https://tiptap.dev/docs/editor/guide/custom-extensions#marks',
    path: '/lesson-09',
  },
  {
    id: 10,
    title: 'Custom Nodes Development',
    description: 'Building custom nodes for special content blocks and interactive elements',
    docs: 'https://tiptap.dev/docs/editor/guide/node-views',
    path: '/lesson-10',
  },
  {
    id: 11,
    title: 'Advanced ProseMirror Integration',
    description: 'Accessing ProseMirror APIs, schema manipulation, and transaction handling',
    docs: 'https://tiptap.dev/docs/editor/guide/prosemirror',
    path: '/lesson-11',
  },
  {
    id: 12,
    title: 'Content Serialization & Production Ready',
    description: 'JSON/HTML conversion, persistence, performance, and testing patterns',
    docs: 'https://tiptap.dev/docs/editor/guide/output',
    path: '/lesson-12',
  },
];

export function HomePage() {
  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          TipTap Editor Tutorial
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn TipTap rich text editor step by step, from basic setup to advanced
          customization. Each lesson builds on the previous one with hands-on
          exercises and tests.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Lesson {lesson.id}
              </span>
              <a
                href={lesson.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                📖 Docs
              </a>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {lesson.title}
            </h3>

            <p className="text-gray-600 text-sm mb-4">{lesson.description}</p>

            <Link
              to={lesson.path}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Start Lesson
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}