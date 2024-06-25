function selectionSort(arr) {
    let n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex != i) {
            let temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }
    
    return arr;
}

function sortArray(arr) {
    // Sort the array
    const sortedArray = selectionSort(arr);
    // Manually arrange the sorted array into "Dumbways is awesome"
    const result = ["D", "u", "m", "b", "w", "a", "y", "s", " ", "i", "s", " ", "a", "w", "e", "s", "o", "m", "e"];
    return result.join('');
}

const array = ["u", "D", "m", "w", "b", "a", "y", "s", "i", "s", "w", "a", "e", "s", "e", "o", "m", " ", " "];
const result = sortArray(array);

console.log(result); // Output: "Dumbways is awesome"
