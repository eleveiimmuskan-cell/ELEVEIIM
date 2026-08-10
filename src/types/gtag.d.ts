/**
 * Google Analytics (gtag.js) typings.
 * @see https://developers.google.com/tag-platform/gtagjs/reference
 */

type GtagConfigParams = {
  page_path?: string;
  page_title?: string;
  page_location?: string;
  send_page_view?: boolean;
  [key: string]: string | number | boolean | undefined;
};

type GtagFunction = {
  (command: "js", date: Date): void;
  (command: "config", targetId: string, config?: GtagConfigParams): void;
  (
    command: "event",
    eventName: string,
    eventParams?: Record<string, string | number | boolean | undefined>
  ): void;
  (
    command: "set",
    params: Record<string, string | number | boolean | undefined>
  ): void;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFunction;
  }
}

export {};
