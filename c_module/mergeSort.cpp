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

    Local<Array> merge(Local<Array> array, int low, int mid, int high) {
        int i = low;

        int j = mid + 1;
        int k;

        Isolate* isolate = Isolate::GetCurrent();
        Local<Array> temp = Array::New(isolate, array->Length());

        //copy values into temporary array
        for (k = low; k <= high; k++) {
            temp->Set(k, array->Get(k));
        }

        //merge sorted values back into original array
        for (k = low; k <= high; k++) {

            if (i > mid) {
                array->Set(k, temp->Get(j++));
            }
            else if (j > high) {
                array->Set(k, temp->Get(i++));
            }
            else if (temp->Get(j)->NumberValue() < temp->Get(i)->NumberValue()) {
                array->Set(k, temp->Get(j++));
            }
            else {
                array->Set(k, temp->Get(i++));
            }
        }

        return array;
    }

    Local<Array> sort (Local<Array> array, int low, int high) {
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
        Local<Array> input = Local<Array>::Cast(args[0]);
        int numValues = input->Length();

        input = sort(
            input,
            0,
            (numValues - 1)
        );

        // Return it.
        args.GetReturnValue().Set(input);
    }

    void init(Local<Object> exports) {
        NODE_SET_METHOD(exports, "mergeSort", Method);
    }

    NODE_MODULE(addon, init)

}