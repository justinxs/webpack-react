declare module '*.svg' {
    import * as React from 'react';
  
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  
    const src: string;
    export default src;
}
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.webp'
declare module '*.bmp'

declare module '*.less'
declare module '*.scss'
declare module '*.css'
declare module '*?modules'