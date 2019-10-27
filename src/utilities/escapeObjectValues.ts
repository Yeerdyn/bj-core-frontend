import escape from 'lodash/escape';
import get from 'lodash/get';
import reduce from 'lodash/reduce';

export function escapeObjectValues(obj: object) {
  return reduce(
    Object.keys(obj),
    (acc, item) => ({ ...acc, [item]: escape(get(obj, item)) }),
    {}
  );
}
