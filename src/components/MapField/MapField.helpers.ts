import { z } from '@tager/admin-services';

export const MapFieldValueSchema = z
  .object({
    latitude: z.number(),
    longitude: z.number(),
  })
  .nullable();

export type MapFieldValueType = z.infer<typeof MapFieldValueSchema>;

export type ValueType = {
  lat: number;
  lng: number;
};

export const ValuePropSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});
