import { IGetBooleanFromArray, IMappingCatalogs } from '../interfaces';

/**
 * The function `mappingCatalogs` maps an array of objects with `id` and `name` properties to a new
 * array with additional properties.
 * @param  - The `mappingCatalogs` function takes an object with a `data` property as its parameter.
 * The `data` property is an array of objects that have `id` and `name` properties, along with other
 * properties specific to the objects.
 * @returns The `mappingCatalogs` function returns an array of objects with properties `value`,
 * `label`, and any other properties from the input data objects. The `value` property corresponds to
 * the `id` property of the input data objects, and the `label` property corresponds to the `name`
 * property of the input data objects.
 */
export const mappingCatalogs = <T extends { id: number; name: string }>({
  data,
}: IMappingCatalogs<T>) => {
  const catalogProps = data.map(({ id, name, ...catalog }) => ({
    value: id,
    label: name,
    ...catalog,
  }));

  return catalogProps;
};

/**
 * The function `getArrayFromProperty` takes an array of objects and a property name, and returns an
 * array of values corresponding to that property from each object.
 * @param {T[]} data - An array of objects of type T.
 * @param {string} property - The `property` parameter in the `getArrayFromProperty` function is a
 * string that represents the name of a property in the objects contained in the `data` array.
 * @returns The `getArrayFromProperty` function returns an array of values extracted from the specified
 * property of each item in the input `data` array.
 */
export const getArrayFromProperty = <T>(data: T[], property: string) => {
  return data.map((item) => item[property as keyof T]);
};

/**
 * The function `getBooleanFromArray` checks if a specific property value exists in an array of objects
 * and returns a boolean based on the result.
 * @param  - - `data`: an array of objects
 */
export const getBooleanFromArray = <T>({
  data,
  property,
  value,
}: IGetBooleanFromArray<T>): boolean =>
  !!data.find((item) => item[property as keyof T] === value);
