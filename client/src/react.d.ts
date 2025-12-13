// Type declarations for react
declare module 'react' {
  export const createElement: any;
  export const useState: any;
  export const useEffect: any;
  export const useContext: any;
  export const useReducer: any;
  export const useCallback: any;
  export const useMemo: any;
  export const useRef: any;
  export const useImperativeHandle: any;
  export const useLayoutEffect: any;
  export const useDebugValue: any;
  
  // Additional React APIs
  export const Fragment: any;
  export const StrictMode: any;
  export const Suspense: any;
  export const Component: any;
  export const PureComponent: any;
  
  // Add more exports as needed
  export default React;
}

// React namespace
declare namespace React {
  // Basic types
  type ReactNode = any;
  type ReactElement = any;
  type ComponentType<P = {}> = any;
  type FC<P = {}> = any;
  type MouseEventHandler<T = {}> = any;
  type FormEventHandler<T = {}> = any;
  type ChangeEventHandler<T = {}> = any;
  
  // Hook return types
  type Dispatch<A> = any;
  type SetStateAction<S> = any;
  
  // Event types
  interface SyntheticEvent<T = Element, E = Event> {
    bubbles: boolean;
    currentTarget: EventTarget & T;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: E;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
    target: EventTarget;
    timeStamp: number;
    type: string;
  }
  
  interface MouseEvent<T = Element, E = NativeMouseEvent> extends SyntheticEvent<T, E> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget | null;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
  }
  
  interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
  }
  
  interface FormEvent<T = Element> extends SyntheticEvent<T> {}
}

// JSX namespace
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  
  interface Element extends React.ReactElement<any, any> { }
  interface ElementClass extends React.Component<any> {
    render(): React.ReactNode;
  }
  interface ElementAttributesProperty { props: {}; }
  interface ElementChildrenAttribute { children: {}; }
  
  interface IntrinsicAttributes {
    key?: string | number;
  }
  
  interface IntrinsicClassAttributes<T> {
    ref?: any;
  }
}