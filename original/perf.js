var js_sort = require('./sort.js'),
    c_sort  = require('./c_module/build/Release/addon.node');

var JS_AVG, CPP_AVG;

var RUNS = 10;

function calculateWinner(num) {
    var pct;

    if (JS_AVG === CPP_AVG) {
        console.log('\nBy some fluke of nature, JS and C++ took exactly the same amount of time to execute merge sort!');
    }
    else if (JS_AVG < CPP_AVG) {
        pct = ((JS_AVG / CPP_AVG) - 1) * -100;

        console.log('\nJS  Merge sort on ' + num + ' items is faster by pct: ' + pct);
    }
    else {
        pct = ((CPP_AVG / JS_AVG) - 1) * -100;

        console.log('\nC++ Merge sort on ' + num + ' items is faster by pct: ' + pct);
    }

    console.log('\n***\n');
}

function createArray(length) {
    var i           = 0,
        randomArray = [];

    while (i < length) {
        var seed = Math.floor(Math.random() * (100)); //random number 0 - 100
        randomArray.push(seed);
        i++;
    }

    return randomArray;
}

function reportTimeonRun(size, sortMethod) {
    var currentArray,
        sortedArray,
        start, timeDiff;

    currentArray = createArray(size);

    //confirm the array is randomized
    //console.log(currentArray);

    start = process.hrtime();
    sortedArray = sortMethod(currentArray);
    timeDiff = process.hrtime(start);

    //confirm the array is sorted
    //console.log(sortedArray);

    //convert result to a floating point number
    return parseFloat("" + timeDiff[ 0 ] + (timeDiff[ 1 ] / 1e+9));
}

function return_JS_AverageTime(size) {
    var totalTime = 0,
        i         = 0,
        avg;

    for (i; i < RUNS; i++) {
        totalTime += reportTimeonRun(size, js_sort.mergeSort);
    }

    avg = totalTime / RUNS;
    JS_AVG = avg;

    console.log('JS  Merge sort on ' + size + ' items took an average of ' + (avg * 1000) + ' ms (' + RUNS + ' runs).');

    return avg;
}

function return_C_AverageTime(size) {
    var totalTime = 0,
        i         = 0,
        avg;

    for (i; i < RUNS; i++) {
        totalTime += reportTimeonRun(size, c_sort.mergeSort);
    }

    avg = totalTime / RUNS;
    CPP_AVG = avg;

    console.log('C++ Merge sort on ' + size + ' items took an average of ' + (avg * 1000) + ' ms (' + RUNS + ' runs).');

    return avg;
}

var num = 20;
return_JS_AverageTime(num);
return_C_AverageTime(num);
calculateWinner(num);


num = 100;
return_JS_AverageTime(num);
return_C_AverageTime(num);
calculateWinner(num);

num = 1000;
return_JS_AverageTime(num);
return_C_AverageTime(num);
calculateWinner(num);

/**
 * TODO: this seems to hang on C++... not sure why
 */
//num = 10000;
//return_JS_AverageTime(num);
//return_C_AverageTime(num);
//calculateWinner(num);