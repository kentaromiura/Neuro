require('../lib/class-extras/Source/Class.Binds.js');

/**
 * Connector: the event binder. By setting connector options in the Class,
 * Classes that implement Connector will be able to bind their events with a target Classes
 * methods and vice versa.
 * @type {Class}
 */

// Make the $boundFn unique
var processFn = function(type, evt, fn, obj){
    if (type == 'string') {
        fn = obj[fn] ? obj.bound(fn) : undefined;
    }
    
    return fn;
};

var mapSubEvents = function(obj, baseEvt){
    var map = {};

    Object.each(obj, function(val, key){
        /**
         * Set the key as baseEvent if the key is "*",
         * otherwise it will be baseEvent:key
         */
        key = key == '*' ? baseEvt : baseEvt + ':' + key;

        map[key] = val;
    });

    return map;
};

var process = function(methodStr, map, obj){
    Object.each(map, function(methods, evt){
        methods = Array.from(methods);

        methods.each(function(method){
            var type = typeOf(method);

            switch(type){
                case 'object': 
                    if (!instanceOf(method, Class)) {
                        process.call(this, methodStr, mapSubEvents(method, evt), obj);
                    }
                    break;
                case 'string':
                case 'function':
                    method = processFn.call(this, type, evt, method, obj);

                    method && this[methodStr](evt, method);
                    break;
            };
        }, this);
    }, this);
};

var curryConnection = function(str){
    var methodStr = str == 'connect' ? 'addEvent' : 'removeEvent';

    return function(obj, twoWay){
        if (obj && typeOf(obj[str]) == 'function') {
            var map = this.options.connector;

            process.call(this, methodStr, map, obj);

            // Connecting is a two way street. Connect/disconnect
            // will first connect/disconnect 'this' with obj's methods. Next
            // it will attempt to connect/disconnect obj with 'this' methods
            // hasConnected will prevent a loop.
            twoWay && obj[str](this, false);
        }

        return this;
    };
};

var Connector = new Class({
    Implements: [Class.Binds],

    // options: {
    //     connector: {
    //         'thisEvent': 'otherObjMethod',
    //         model
    //         'change': 'someMethodName'
    //         'change': function(){},
    //         'change': {
    //             '*': 'updateAll',
    //             'name': 'updateName',
    //             'age': function(){}
    //         },
    //         'change': {
    //              '*': ['someMethod', 'someOtherMethod'],
    //              'name': ['updateName', 'updateFullName']
    //         },
    //         'change': [{'*': ['someMethod']}, {'*': ['someOtherMethod']}],
    //     }
    // },

    connect: curryConnection('connect'),

    disconnect: curryConnection('disconnect')
});

exports.Connector = Connector;