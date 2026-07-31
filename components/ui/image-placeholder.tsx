type Props = {
  label?: string;
  className?: string;
  aspect?: string;
};

/** Gray slot for images still to be generated */
export function ImagePlaceholder({
  label = "Image pending",
  className = "",
  aspect = "1 / 1",
}: Props) {
  return (
    <div
      className={`img-placeholder ${className}`.trim()}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={label}
    >
      <span>{label}</span>
    </div>
  );
}

export function ProductMedia({
  src,
  alt,
  aspect = "1 / 1",
}: {
  src: string | null | undefined;
  alt: string;
  aspect?: string;
}) {
  if (!src) {
    return <ImagePlaceholder label={`Generate: ${alt}`} aspect={aspect} />;
  }
  return (
    <div style={{ width: "100%", height: "100%", aspectRatio: aspect, overflow: "hidden" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}
