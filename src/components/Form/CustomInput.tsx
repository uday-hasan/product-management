import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FormFieldType } from "@/lib/constant/index";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addProductSchema } from "@/lib/zod/AddProductSchema";
import { Control, ControllerRenderProps } from "react-hook-form";
import { Textarea } from "../ui/textarea";
interface CustomInputProps {
  control: Control<addProductSchema>;
  name: keyof z.infer<typeof addProductSchema>;
  label?: string;
  type: FormFieldType;
  selectData?: string[];
  defaultSelectValue?: string;
}

const RenderField = ({
  field,
  props,
}: {
  field: ControllerRenderProps<addProductSchema, keyof addProductSchema>;
  props: CustomInputProps;
}) => {
  const { label, type, selectData, defaultSelectValue } = props;
  switch (type) {
    case FormFieldType.TEXT:
      return <Input {...field} placeholder={label} className="bg-background" />;
    case FormFieldType.NUMBER:
      return (
        <Input
          {...field}
          type="number"
          className="bg-background"
          placeholder={label}
          onChange={(e) =>
            field.onChange(e.target.value ? Number(e.target.value) : "")
          }
        />
      );

    case FormFieldType.SELECT:
      return (
        <Select
          defaultValue={defaultSelectValue || ""}
          onValueChange={field.onChange}
        >
          <SelectTrigger className="bg-background">
            <SelectValue
              placeholder={
                selectData ? selectData[0] : "Select product category"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {selectData &&
              selectData.map((item, index) => (
                <SelectItem
                  key={index}
                  value={String(item)}
                  className="cursor-pointer"
                >
                  {item}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      );
    case FormFieldType.CHECKBOX:
      break;
    case FormFieldType.TEXTAREA:
      return (
        <div className="grid w-full gap-1.5">
          <Textarea placeholder={label} id="message" {...field} />
        </div>
      );
    default:
      break;
  }
};
const CustomInput = (props: CustomInputProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-semibold text-base">{label}</FormLabel>
          )}
          <FormControl>
            <RenderField field={field} props={props} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
