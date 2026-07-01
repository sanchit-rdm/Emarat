import NextImage, { type ImageProps } from "next/image";

export default function Image({ quality = 100, ...props }: ImageProps) {
  return <NextImage quality={quality} {...props} />;
}
