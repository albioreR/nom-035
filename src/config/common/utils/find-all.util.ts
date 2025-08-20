import {
  IReturnPagination,
  TPaginationControl,
  TWhereFilterControl,
} from '../interfaces';

/**
 * The function `getPaginationFields` calculates the skip and take values for pagination based on the
 * provided page and results parameters.
 * @param {TPaginationControl}  - The `getPaginationFields` function takes an object as input with the
 * following properties:
 * @returns An object containing the `skip` and `take` fields is being returned. The `skip` field is
 * calculated as `(page - 1) * results`, and the `take` field is set to the `results` value provided in
 * the function arguments.
 */
export const getPaginationFields = ({
  page = 1,
  results = 50,
}: TPaginationControl): IReturnPagination => {
  const skip = (page - 1) * results;
  const take = results;
  return { skip, take };
};

/**
 * The function `getWhereFilter` returns a filter object based on the provided `likeField` and `like`
 * values.
 * @param {TWhereFilterControl}  - It looks like the `getWhereFilter` function takes an object as a
 * parameter with properties `likeField` and `like`, both of type `TWhereFilterControl`. The function
 * then checks if either `likeField` or `like` is truthy, and if so, it returns an
 * @returns An object is being returned with a key-value pair where the key is the `likeField` value
 * and the value is an object with a `contains` property set to the `like` value. If `likeField` or
 * `like` is falsy, an empty object is returned.
 */
export const getWhereFilter = ({ likeField, like }: TWhereFilterControl) => {
  return likeField || like
    ? {
        [likeField]: {
          contains: like,
        },
      }
    : {};
};
