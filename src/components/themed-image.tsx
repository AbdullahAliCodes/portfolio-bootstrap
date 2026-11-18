import Image, { type ImageProps } from "next/image";
import type { Thumbnail } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ThemedImageProps = Omit<ImageProps, "src"> & { thumbnail: Thumbnail };

/**
 * Light/dark thumbnail without a hydration mismatch: both variants are rendered and CSS
 * (`dark:` variant) shows one. The hidden lazy image is display:none, so it isn't fetched
 * until the theme switches.
 */
export function ThemedImage({ thumbnail, className, alt, ...props }: ThemedImageProps) {
  if (thumbnail.kind === "single") {
    return <Image src={thumbnail.src} alt={alt} className={className} {...props} />;
  }
  return (
    <>
      <Image src={thumbnail.light} alt={alt} className={cn(className, "dark:hidden")} {...props} />
      <Image src={thumbnail.dark} alt={alt} className={cn(className, "hidden dark:block")} {...props} />
    </>
  );
}
