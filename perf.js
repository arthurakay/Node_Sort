var js_sort = require('./sort.js'),
    c_sort = require('./c_module/build/Release/addon.node');

function createArray(length) {
    var i           = 0,
        randomArray = [];

    while (i < length) {
        var seed = Math.floor(Math.random() * (100)); //random number 0 - 100
        randomArray.push(seed);
        i++;
    }

    //console.log(`Array: ${randomArray.join(',')}`);;
    return randomArray;
}

function return_JS_AverageTime(size) {
    var totalTime = 0,
        runs  = 100,
        i     = 0,

        currentArray,
        sortedArray,
        start, timeDiff,
        avg;

    for (i; i < runs; i++) {
        currentArray = createArray(size);

        //console.log(currentArray);

        start = process.hrtime();
        sortedArray = js_sort.mergeSort(currentArray);
        timeDiff = process.hrtime(start);

        //convert result to a floating point number
        totalTime += parseFloat("" + timeDiff[ 0 ] + (timeDiff[1] / 1e+9));

        //console.log(sortedArray);
    }

    avg = totalTime / runs;

    console.log('JS  Merge sort on ' + size + ' items took an average of ' + avg + ' seconds (' + runs + ' runs).');

    return avg;
}

function return_C_AverageTime(size) {
    var totalTime = 0,
        runs  = 100,
        i     = 0,

        currentArray,
        sortedArray,
        start, timeDiff,
        avg;

    for (i; i < runs; i++) {
        currentArray = createArray(size);

        //console.log(currentArray);

        start = process.hrtime();
        sortedArray = c_sort.mergeSort(currentArray);
        timeDiff = process.hrtime(start);

        //convert result to a floating point number
        totalTime += parseFloat("" + timeDiff[ 0 ] + (timeDiff[1] / 1e+9));

        //console.log(sortedArray);
    }

    avg = totalTime / runs;

    console.log('C++ Merge sort on ' + size + ' items took an average of ' + avg + ' seconds (' + runs + ' runs).');

    return avg;
}

var num = 20;

return_JS_AverageTime(num);
return_C_AverageTime(num);



//return_JS_AverageTime(50);
//return_JS_AverageTime(1000);
//return_JS_AverageTime(10000);


//return_C_AverageTime(50);
//return_C_AverageTime(1000);
//return_C_AverageTime(10000);

