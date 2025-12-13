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
  
  // Add more exports as needed
  export default React;
}

// JSX namespace
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}