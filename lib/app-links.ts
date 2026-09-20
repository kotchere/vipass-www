/**
 * Store listings for the Vipass app. Plain module (no "use client") so both
 * Server Components and Client Components can read the strings — exports of a
 * client module become client-reference stubs on the server and cannot be
 * used as attribute values there.
 */
export const APP_STORE_URL = "https://apps.apple.com/us/app/vipass-app/id6451340949";
export const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.merchant.vipass";
