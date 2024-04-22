/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  // more env variables...
}

declare const __APP_VERSION__: string
declare const __APP_HASH__: string
