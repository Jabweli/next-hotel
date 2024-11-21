import { FormInputProps } from "@/types";
export default function FormInput({
  type,
  name,
  value,
  placeholder,
  otherStyles,
  required,
  handleChange,
}: FormInputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      className={`h-[45px] py-[20px] px-5 text-sm w-full rounded-[12px] border shadow-[0_1px_2px_0] shadow-gray border-[#CED4DA] dark:bg-black/30 dark:text-white ${otherStyles}`}
      required={required}
      onChange={handleChange}
    />
  );
}
