#include <node.h>
#include <math.h>

namespace demo {

    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;

    void merge(int *array, int low, int mid, int high) {
        int i = low;
        int j = mid + 1;
        int k;

        int temp[high];

        //copy values into temporary array
        for (k = low; k <= high; k++) {
            temp[k] = array[k];
        }

        //merge sorted values back into original array
        for (k = low; k <= high; k++) {

            if (i > mid) {
                array[ k ] = temp[ j++ ];
            }
            else if (j > high) {
                array[ k ] = temp[ i++ ];
            }
            else if (int(temp[ j ]) < int(temp[ i ])) {
                array[ k ] = temp[ j++ ];
            }
            else {
                array[ k ] = temp[ i++ ];
            }
        }
    }

    void sort (int *array, int low, int high) {
        if (high <= low) {
            return;
        }

        int mid = floor(low + (high - low) / 2);

        sort(array, low, mid);
        sort(array, mid + 1, high);

        merge(array, low, mid, high);
    }

    void Method(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();

        int* inputArray = args[0];
        //Local<v8::Array> inputArray = args[0]->ToObject().As<v8::Array>();

        sort(inputArray, 0, sizeof(inputArray) - 1);

        args.GetReturnValue().Set(inputArray);
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "mergeSort", Method);
    }

    NODE_MODULE(addon, init)

}