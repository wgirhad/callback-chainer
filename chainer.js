/*
The MIT License (MIT)

Copyright (c) 2016 Willian Girhad

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
var CallbackChainer = (function () {
    function CallbackChainer() {
        this._callbacks = [];
    }

    CallbackChainer.prototype.noop = function() {
        /* noop */
    };

    CallbackChainer.prototype.add = function(call) {
        this._callbacks.push(call);
        return this;
    };

    CallbackChainer.prototype.prepend = function(call) {
        this._callbacks.unshift(call);
        return this;
    };

    CallbackChainer.prototype.next = function(arg) {
        (this._callbacks.shift() || this.noop)(arg);
    };

    // To be used in a context outside 'this'
    CallbackChainer.prototype.resolve = function() {
        var that = this;
        return function(arg) {
            (that._callbacks.shift() || that.noop)(arg);
        };
    };

    CallbackChainer.prototype.getLength = function() {
        return this._callbacks.length;
    };

    CallbackChainer.prototype.execute = CallbackChainer.prototype.next;

    return CallbackChainer;
})();