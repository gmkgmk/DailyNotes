console.log(module)
if (module.hot) {
  module.hot.accept();
}
import header from "./header.js";

import {
  map
} from 'lodash';

console.log(header)
console.log(23231313123)
let numbers = map([1, 2, 3, 4, 5, 6], n => n * n);

console.log(numbers)