import Image from "next/image";

type Props = {
  name: string;
  designation: string;
  image?: string;
};

/* ✅ safe image resolver */
function getImageSrc(image?: string) {
  if (
    image &&
    image !== "null" &&
    image !== "undefined" &&
    image.trim() !== ""
  ) {
    return image;
  }
  return "/fallback-avatar.png"; // must exist in /public
}

export default function MemberCard({ name, designation, image }: Props) {
  return (
    <div className="flex items-center gap-3 px-2 py-3 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">
      <Image
        src={getImageSrc(image)}
        alt={name}
        width={64}
        height={64}
        className="rounded-full object-cover"
      />

      <div className="leading-snug">
        <p className="text-sm font-bold text-gray-900">
          {name}
        </p>
        <p className="text-xs font-medium text-gray-700">
          {designation}
        </p>
      </div>
    </div>
  );
}
