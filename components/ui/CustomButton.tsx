import { CustomButtonProps } from "@/types";

export default function CustomButton({
  type,
  title,
  btnStyles,
}: CustomButtonProps) {
  return (
    <button type={type} className="">
      {title}
    </button>
  );
}
