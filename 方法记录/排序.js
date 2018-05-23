const arr = [23, 54, 123, 632, 23, 4, 6, 7, 94, 1, 2, 34, 4, 44, 54];

// 冒泡排序
const bubbling = arr => {
  var ctx = [...new Set(arr)];
  let len = ctx.length,
    i = 0;

  for (; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      let flag = false;
      if (ctx[j] > ctx[j + 1]) {
        flag = true;
      }
      if (flag) {
        let temp = ctx[j + 1];
        ctx[j + 1] = ctx[j];
        ctx[j] = temp;
      }
    }
  }

  return ctx;
};
console.log(bubbling(arr));

//选择排序
const Selection = arr => {
  var ctx = [...new Set(arr)];
  let len = ctx.length,
    i = 0;
  for (; i < len - 1; i++) {
    miniIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (ctx[j] < ctx[miniIndex]) {
        miniIndex = j;
      }
    }
    temp = ctx[i];
    ctx[i] = ctx[miniIndex];
    ctx[miniIndex] = temp;
  }
  return ctx;
};
console.log(Selection(arr));

//插入排序
const insertionSort = arr => {
  var ctx = [...new Set(arr)];
  let len = ctx.length,
    i = 1, //从第二个开始计算
    preIndex, //当前循环的数
    current;

  for (; i < len; i++) {
    preIndex = i - 1;
    current = ctx[i];

    while (preIndex >= 0 && ctx[preIndex] > current) {
      ctx[preIndex + 1] = ctx[preIndex];
      preIndex--;
    }
    ctx[preIndex + 1] = current;
  }
  return ctx;
};
console.log(insertionSort(arr));

//并归排序
const Merge = arr => {
  let ctx = [...new Set(arr)];
  let len = ctx.length;
  if (len < 2) {
    return ctx;
  }
  let middle = Math.floor(len / 2),
    left = ctx.slice(0, middle),
    right = ctx.slice(middle);
  return mergeSort(Merge(left), Merge(right));
};
function mergeSort(left, right) {
  let result = [];
  if (left && right) {
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    while (left.length) result.push(left.shift());

    while (right.length) result.push(right.shift());
  }
  return result;
}
console.log(Merge(arr));
