// 数组方法:

//生成数组
const arrayConcat = (arr, ...args) => arr.concat(...args);
// arrayConcat([1], 2, [3], [[4]]) -> [1,2,3,[4]]

// 寻找数组不同
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};
// difference([1,2,3], [1,2]) -> [3]

// 寻找数组相同
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};
// intersection([1,2,3], [4,3,2]) -> [2,3]

//连接数组
const union = (a, b) => Array.from(new Set([...a, ...b]));
// union([1,2,3], [4,3,2]) -> [1,2,3,4]

//数组平均数
const average = arr => arr.reduce((acc, val) => acc + val, 0) / arr.length;
// average([1,2,3]) -> 2

// 根据size划分数组
const chunk = (arr, size) =>
Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size));
// chunk([1,2,3,4,5], 2) -> [[1,2],[3,4],5]

// 过滤假值 (false, null, 0, "", undefined, and NaN).
const compact = (arr) => arr.filter(v => v);
// compact([0, 1, false, 2, '', 3, 'a', 'e'*23, NaN, 's', 34]) -> [ 1, 2, 3, 'a', 's', 34 ]

//寻找数组中的value重复了几次
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
// countOccurrences([1,1,2,1,2,3], 1) -> 3

// 数组扁平化
const deepFlatten = arr =>
arr.reduce((a, v) => a.concat(Array.isArray(v) ? deepFlatten(v) : v), []);
// deepFlatten([1,[2],[[3],4],5]) -> [1,2,3,4,5]

// 删除数组中的元素
const dropElements = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr.shift();
  return arr;
};
// dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]

// 填充数组
const fillArray = (arr, value, start = 0, end = arr.length) =>
arr.map((v, i) => i >= start && i < end ? value : v);
// fillArray([1,2,3,4],'8',1,3) -> [1,'8','8',4]

//滤除数组中的非唯一值
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));
// filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]


//根据depth扁平数组
const flattenDepth = (arr, depth = 1) =>
depth != 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), [])
: arr.reduce((a, v) => a.concat(v), []);
// flattenDepth([1,[2],[[[3],4],5]], 2) -> [1,2,[3],4,5]

// 获取最大值
const arrayMax = arr => Math.max(...arr);
// arrayMax([10, 1, 5]) -> 10

// 获取最小值
const arrayMin = arr => Math.min(...arr);
// arrayMin([10, 1, 5]) -> 1
