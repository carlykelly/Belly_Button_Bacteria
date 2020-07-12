// An unsorted array
var numArray = [9.9, 6.1, 17.1, 22.7, 4.6, 8.7, 7.2];

// Sort the array in descending order and assign the results to a variable
var descSort = numArray.sort(function compareFunction(firstNum, secondNum) {
    return secondNum - firstNum;
  });

// Print the results to the console
console.log(descSort)
// Sort the array in descending order using an arrow function
var arrowDesc = numArray.sort((firstNum, secondNum) => secondNum - firstNum);

// and assign the results to a variable and print to the console
console.log(arrowDesc);

// Reverse the array order
var reverseArray = numArray.reverse()
console.log(reverseArray);

// Sort the array in ascending order using an arrow function
var ascSort = numArray.sort((firstNum, secondNum) => firstNum-secondNum);
console.log(ascSort);

// Slice the first five elements of the sortedAscending array, assign to a variable
var firstFive = ascSort.splice(0,5);
console.log(firstFive);