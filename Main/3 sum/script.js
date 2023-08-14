function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let closestSum = Infinity;
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      let currSum = nums[i] + nums[left] + nums[right];
      if (Math.abs(currSum - target) < Math.abs(closestSum - target))
        closestSum = currSum;
      if (currSum < target) left++;
      else right--;
    }
  }

  return closestSum;
}
const S = [-1, 2, 3, 1, 1, -4];
const target = 1;
const result = threeSumClosest(S, target);
console.log(result);
