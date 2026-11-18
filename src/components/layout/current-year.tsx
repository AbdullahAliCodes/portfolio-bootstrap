import { cacheLife } from "next/cache";

/**
 * The current year. Cache Components forbids reading the clock during prerender unless the
 * result is cached, so it is prerendered with the page and revalidated daily.
 */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
