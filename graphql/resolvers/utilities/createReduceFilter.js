import { reduce } from "lodash";

const createReduceFilter = (filters, collection, input) => reduce(
  Object.keys(input),
  (filteredCollection, inputField) =>
    filters[inputField](filteredCollection, input[inputField]),
  collection,
);

export default createReduceFilter;