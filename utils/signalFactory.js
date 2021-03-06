/**
 * signalFactory will generate an object containing signals functions.
 * 
 * It will have a default function to fire, but an optional overriding 
 * curry function can be used instead of the default.
 * 
 * @param  {Array} names An array of camelcased names
 * @param  {Function, optional} curryFnc A curry function. The name from the names array will be passed to it to generate a function
 * @param  {Object, optional} stack The object that will contain all the signal functions. One will be generated if not passed as an argument
 * @return {Object} Return the stack object containing all the functions.
 */
var prefix = 'signal',
    hyphen = '-',
    colon = ':';

exports = module.exports = function(names, curryFnc, stack){
    if (!Type.isFunction(curryFnc)) {
        stack = curryFnc;
        curryFnc = undefined;
    }

    stack = stack || {};
    
    Array.from(names).each(function(name){
        // Convert name to camelCase
        var property = (prefix + hyphen + name.replace(colon, hyphen)).camelCase();

        stack[property] = curryFnc ? curryFnc(name) : function(){
            Array.prototype.unshift.call(arguments, this);
            !this.isSilent() && this.fireEvent(name, arguments);
            return this;
        };
    });

    return stack;
};