// From https://old.reddit.com/r/learnjavascript/comments/5nbg4h/help_understanding_bind_polyfill_code_from_mdn/
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what ' + 'is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {},
      fBound = function () {
        return fToBind.apply(
          // Original - this was throwing errors, idk why:
          // this instanceof fNOP &&
          //   oThis ? this : oThis
          //
          // Updated:
          oThis,
          aArgs.concat(Array.prototype.slice.call(arguments))
        );
      };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}
