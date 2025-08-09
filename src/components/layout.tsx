import { Outlet, Link } from 'react-router';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-xl font-bold text-gray-900">
              TipTap Tutorial
            </Link>
            <nav className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <a
                href="https://tiptap.dev/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                TipTap Docs
              </a>
              <a
                href="https://github.com/patocallaghan/tiptap-tutorial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}