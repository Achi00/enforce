import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    productType: string,
    inStock: boolean,
    price: number | undefined,
}

export interface PostCardProps {
  id?: BaseKey | undefined,
  title: string,
  description: string,
  productType: string,
  photo: string,
  photo2: string,
  price: number,
}
