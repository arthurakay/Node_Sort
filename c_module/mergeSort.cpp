#include <node.h>
#include <math.h>
#include <vector>
#include <iostream>
#include <string>

using namespace v8;
using namespace std;

namespace demo {

    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::String;
    using v8::Value;

    std::vector<int> merge(std::vector<int> array, int low, int mid, int high) {
        int i = low;

        int j = mid + 1;
        int k;

        std::vector<int> temp(sizeof(array));

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
            else if (int(temp[ j ]) < int(temp[ i ])) {
                array[ k ] = temp[ j++ ];
            }
            else {
                array[ k ] = temp[ i++ ];
            }
        }

        return array;
    }

    std::vector<int> sort (std::vector<int> array, int low, int high) {
        if (high <= low) {
            return array;
        }

        int mid = floor(low + (high - low) / 2);

        array = sort(array, low, mid);
        array = sort(array, mid + 1, high);

        array = merge(array, low, mid, high);

        return array;
    }

    void Method(const FunctionCallbackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();

        // Unpack JS array into a std::vector
        std::vector<int> values;
        Local<Array> input = Local<Array>::Cast(args[0]);
        unsigned int numValues = input->Length();

        for (unsigned int i = 0; i < numValues; i++) {
            values.push_back(input->Get(i)->NumberValue());
        }

        values = sort(values, 0, int(values.size() - 1));

        // Create a new JS array from the vector.
        Local<Array> result = Array::New(isolate);
        for (unsigned int x = 0; x < numValues; x++ ) {
            result->Set(x, Number::New(isolate, values[x]));
        }

        // Return it.
        args.GetReturnValue().Set(result);
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "mergeSort", Method);
    }

    NODE_MODULE(addon, init)

}