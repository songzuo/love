// Type declarations for react-dom
declare module 'react-dom' {
  export const render: any;
  export const hydrate: any;
  export const createPortal: any;
  export const unmountComponentAtNode: any;
  export const findDOMNode: any;
  
  // Add more exports as needed
  export default ReactDOM;
}

// Type declarations for react-dom/client
declare module 'react-dom/client' {
  export interface Root {
    render(children: any): void;
    unmount(): void;
  }
  
  export function createRoot(container: Element | DocumentFragment): Root;
  export function hydrateRoot(
    container: Element | DocumentFragment,
    initialChildren: any,
    options?: any
  ): Root;
}

// Additional React DOM APIs
declare module 'react-dom' {
  export function createPortal(children: any, container: Element): any;
  export function findDOMNode(component: any): Element | null;
  export function unmountComponentAtNode(container: Element): boolean;
  
  // Server-side rendering
  export function renderToString(element: any): string;
  export function renderToStaticMarkup(element: any): string;
  
  // Hydration
  export function hydrate(element: any, container: Element | DocumentFragment, callback?: () => void): any;
  
  // Rendering
  export function render(element: any, container: Element | DocumentFragment, callback?: () => void): any;
}