function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  console.log("nums=", nums, " target=", target);
  let closestSum = Infinity;
  console.log("closestSum=", closestSum);
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1,
      right = nums.length - 1;
    console.log("left=", left, " right=", right);
    while (left < right) {
      let currSum = nums[i] + nums[left] + nums[right];
      console.log("\tcurrSum=", currSum);
      if (Math.abs(currSum - target) < Math.abs(closestSum - target))
        closestSum = currSum;
      console.log("\tclosestSum=", closestSum);
      if (currSum < target) left++;
      else right--;
      console.log("\tleft=", left, " right=", right, "\n");
    }
    console.log("");
  }

  return closestSum;
}
const S = [-1, 2, 3, 1, 1, -4];
const target = 1;
const result = threeSumClosest(S, target);
console.log(result);
