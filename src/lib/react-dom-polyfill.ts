import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';

const roots = new WeakMap<Element | DocumentFragment, Root>();

export function render(
  element: React.ReactNode,
  container: Element | DocumentFragment,
  callback?: () => void
): void {
  let root = roots.get(container);
  if (!root) {
    root = createRoot(container as Element);
    roots.set(container, root);
  }
  root.render(element as React.ReactElement);
  if (callback) Promise.resolve().then(callback);
}

export function unmountComponentAtNode(
  container: Element | DocumentFragment
): boolean {
  const root = roots.get(container);
  if (root) {
    root.unmount();
    roots.delete(container);
    return true;
  }
  if (container instanceof Element) {
    container.innerHTML = '';
  }
  return true;
}

export function findDOMNode(instance: unknown): Element | Text | null {
  if (
    instance &&
    typeof instance === 'object' &&
    'current' in (instance as Record<string, unknown>)
  ) {
    return (instance as { current: Element | Text | null }).current ?? null;
  }
  if (instance instanceof Element || instance instanceof Text) return instance;
  return null;
}
