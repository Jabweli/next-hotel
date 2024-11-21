import { CustomButtonProps } from "@/types";

export default function CustomButton({ type, title }: CustomButtonProps) {
  return (
    <button type={type} className="">
      {title}
    </button>
  );
}
