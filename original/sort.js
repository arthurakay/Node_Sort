ArraySortUtil = {
    merge : function (array, temp, low, mid, high) {
        var i = low,
            j = mid + 1,
            k;

        //copy values into temporary array
        for (k = low; k <= high; k++) {
            temp[ k ] = array[ k ];
        }

        //merge sorted values back into original array
        for (k = low; k <= high; k++) {

            if (i > mid) {
                array[ k ] = temp[ j++ ];
            }
            else if (j > high) {
                array[ k ] = temp[ i++ ];
            }
            else if (temp[ j ] < temp[ i ]) {
                array[ k ] = temp[ j++ ];
            }
            else {
                array[ k ] = temp[ i++ ];
            }
        }

        return array;
    }
};

function topDownMergeSort(inputArray) {
    var sort = function (array, low, high) {
        if (high <= low) {
            return;
        }

        var mid = Math.floor(low + (high - low) / 2);

        sort(array, low, mid);
        sort(array, mid + 1, high);
        ArraySortUtil.merge(array, temp, low, mid, high);
    };

    var temp = []; //allocate space just once

    sort(inputArray, 0, inputArray.length - 1);

    return inputArray;
}

module.exports = {
    mergeSort : topDownMergeSort
};