/**
 * Meta (Facebook) Pixel typings for `window.fbq`.
 * @see https://developers.facebook.com/docs/meta-pixel/reference
 */

type MetaPixelStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "AddToWishlist"
  | "InitiateCheckout"
  | "AddPaymentInfo"
  | "Purchase"
  | "Lead"
  | "CompleteRegistration"
  | "Contact"
  | "CustomizeProduct"
  | "Donate"
  | "FindLocation"
  | "Schedule"
  | "StartTrial"
  | "SubmitApplication"
  | "Subscribe";

type MetaPixelEventName = MetaPixelStandardEvent | (string & {});

type MetaPixelEventParams = Record<
  string,
  string | number | boolean | null | undefined
>;

interface MetaPixelFunction {
  (command: "init", pixelId: string, userData?: MetaPixelEventParams): void;
  (
    command: "track" | "trackCustom",
    eventName: MetaPixelEventName,
    parameters?: MetaPixelEventParams
  ): void;
  (
    command: "trackSingle" | "trackSingleCustom",
    pixelId: string,
    eventName: MetaPixelEventName,
    parameters?: MetaPixelEventParams
  ): void;
  (command: "consent", value: "grant" | "revoke"): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  loaded: boolean;
  version: string;
  push: MetaPixelFunction;
}

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
    /** Guards against duplicate Meta Pixel init + first PageView. */
    __ELEVEIIM_META_PIXEL_INITIALIZED__?: boolean;
  }
}

export {};
