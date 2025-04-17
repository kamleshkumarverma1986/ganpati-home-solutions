import Image from "next/image";

export default function ShowMedia({ media, style = {} }) {
  const { resource_type, url, secure_url } = media;
  const styleObj = {
    width: "100%",
    height: "auto",
    objectFit: resource_type === "image" ? "fill" : "cover",
    maxHeight: "600px",
    ...style,
  };
  const src = process.env.NODE_ENV === "development" ? url : secure_url;

  return (
    <>
      {resource_type === "image" ? (
        <Image
          src={src}
          alt="mediaUploadDialogImg"
          sizes="100vw"
          height={0}
          width={0}
          style={styleObj}
        />
      ) : (
        <video autoPlay={true} muted loop style={styleObj} playsInline>
          <source src={src} />
        </video>
      )}
    </>
  );
}
