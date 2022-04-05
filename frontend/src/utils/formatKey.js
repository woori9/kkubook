import _ from 'lodash';

const snakeToCamel = obj => {
  return _.mapKeys(obj, (value, key) => _.camelCase(key));
};

const camelToSnake = obj => {
  return _.mapKeys(obj, (value, key) => _.snakeCase(key));
};

export { snakeToCamel, camelToSnake };
