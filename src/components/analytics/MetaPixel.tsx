import Script from "next/script";
import { META_PIXEL_ID } from "@/lib/analytics/meta-pixel";

/**
 * Official Meta (Facebook) Pixel loader for App Router.
 * Mount once in the root layout. Initial PageView is fired here;
 * client navigations are handled by FacebookPixelEvents.
 */
export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          if (!window.__ELEVEIIM_META_PIXEL_INITIALIZED__) {
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
            window.__ELEVEIIM_META_PIXEL_INITIALIZED__ = true;
          }
        `}
      </Script>
      <noscript>
        {/* Meta requires a raw 1×1 img fallback; next/image is not valid here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
