// Type declarations for react
declare module 'react' {
  // Core React APIs
  export const createElement: any;
  export const cloneElement: any;
  export const createFactory: any;
  export const isValidElement: any;
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
  export const useId: any;

  // Additional React APIs
  export const Fragment: any;
  export const StrictMode: any;
  export const Suspense: any;
  export const Component: any;
  export const PureComponent: any;
  
  // Hooks with better typing
  export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
  export function useEffect(effect: EffectCallback, deps?: DependencyList): void;
  export function useContext<T>(context: Context<T>): T;
  
  // Add more exports as needed
  export default React;
  
  // Helper types
  export type ReactNode = any;
  export type ReactElement<P = any, T extends string | React.ComponentType<any> = string | React.ComponentType<any>> = any;
  export type ComponentType<P = {}> = any;
  export type FC<P = {}> = any;
  export type MouseEventHandler<T = {}> = any;
  export type FormEventHandler<T = {}> = any;
  export type ChangeEventHandler<T = {}> = any;
  
  // Hook return types
  export type Dispatch<A> = any;
  export type SetStateAction<S> = any;
  export type EffectCallback = () => (void | (() => void | undefined));
  export type DependencyList = ReadonlyArray<any>;
  
  // Context
  export interface Context<T> {
    Provider: React.ComponentType<{
        value: T;
        children: React.ReactNode;
    }>;
    Consumer: React.ComponentType<{
        children: (value: T) => React.ReactNode;
    }>;
    displayName?: string;
  }
  
  export function createContext<T>(defaultValue: T): Context<T>;
  
  // Component base class
  export class Component<P = {}, S = {}> {
    constructor(props: P);
    setState<K extends keyof S>(
        state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
        callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
    state: Readonly<S>;
  }
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
  
  // Component base class
  class Component<P = {}, S = {}> {
    constructor(props: P);
    setState<K extends keyof S>(
        state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
        callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
    state: Readonly<S>;
  }
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