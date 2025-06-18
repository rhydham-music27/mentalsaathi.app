import * as Avatar from "@radix-ui/react-avatar";

function SimpleAvatar({ src, alt }: { src: string; alt?: string }) {
  return (
    <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
      <Avatar.Image
        className="w-full h-full object-cover"
        src={src}
        alt={alt || "User Avatar"}
      />
      <Avatar.Fallback className="flex items-center justify-center w-full h-full text-sm text-gray-500">
        👤
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
export default SimpleAvatar