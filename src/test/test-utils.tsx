import { render } from 'vitest-browser-react'
import { BrowserRouter } from 'react-router'
import type { ReactElement } from 'react'

export async function renderWithRouter(component: ReactElement) {
  return await render(<BrowserRouter>{component}</BrowserRouter>)
}
