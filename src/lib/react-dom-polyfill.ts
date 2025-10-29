import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

// @ts-ignore
if (typeof ReactDOM.render === 'undefined') {
  // @ts-ignore
  ReactDOM.render = (element: React.ReactElement, container: Element, callback?: () => void) => {
    const root = createRoot(container);
    root.render(element);
    if (callback) {
      setTimeout(callback, 0);
    }
  };
}

// @ts-ignore
if (typeof ReactDOM.unmountComponentAtNode === 'undefined') {
  // @ts-ignore
  ReactDOM.unmountComponentAtNode = (container: Element) => {
    if (container) {
      container.innerHTML = '';
    }
    return true;
  };
}

// @ts-ignore
if (typeof ReactDOM.findDOMNode === 'undefined') {
  // @ts-ignore
  ReactDOM.findDOMNode = (component: any) => {
    return null;
  };
}

export {};
