var js_sort = require('./sort.js'),
    c_sort = require('./c_module/build/Release/addon.node');

function createArray(length) {
    var i           = 0,
        randomArray = [];

    while (i < length) {
        var seed = Math.floor(Math.random() * (length)); //random number
        randomArray.push(seed);
        i++;
    }

    return randomArray;
}

function returnAverageTime(size) {
    var totalTime = 0,
        runs  = 1000,
        i     = 0,

        currentArray,
        start, timeDiff,
        avg;

    for (i; i < runs; i++) {
        currentArray = createArray(size);

        start = process.hrtime();
        js_sort.mergeSort(currentArray);
        timeDiff = process.hrtime(start);

        //convert result to a floating point number
        totalTime += parseFloat(`${timeDiff[ 0 ] + (timeDiff[1] / 1e+9)}`);
    }

    avg = totalTime / runs;

    console.log(`Merge sort on ${size} items took an average of ${avg} seconds (${runs} runs).`);

    return avg;
}

returnAverageTime(100);
returnAverageTime(1000);
returnAverageTime(10000);

console.log(c_sort.mergeSort());