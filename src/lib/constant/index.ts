export enum FormFieldType {
  TEXT = "text",
  SELECT = "select",
  CHECKBOX = "checkbox",
  NUMBER = "number",
  TEXTAREA = "textarea",
}

export const ProductCategory = [
  "Desktop",
  "Laptop",
  "Component",
  "Monitor",
  "Accessories",
] as const;

export const productStatus = [
  "Available",
  "Out of stock",
  "Comming soon",
] as const;
