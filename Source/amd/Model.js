define(function(require, exports, module){
var __MODULE0__ = require("../utilities/Is");
var Unit;
;

exports.Model

/*
---
name: Model

description: Model to handle data

version: .10

license: TBD

authors:
- Garrick Cheung

requires:
- MooTools-Core/1.3
- Company

provides: [Model]

...
*/

// (function(context){
Unit = require('../libs/Company/Source/Company').Unit;

exports.Model = new Class({

    //Implements: [Unit],
    Extends: Unit,

    /**
     * Default prefix to be used by Unit methods for publishing
     * It will prepend to publisher string
     * Default prefix generated by String.uniqueID or passed in as option.prefix
     *
     * @type {String}
     */
    // Prefix: '',

    _data: {},

    _changed: false,

    _changedProperties: {},

    _previousProperties: {},

    initialize: function(data, options){
        if (instanceOf(data, this.constructor)) {
            return data;
        }

        this.setup(data, options);
    },

    setup: function(data, options){
        if (!options) { options = {}; }

        // a unique prefix should always be set
        this.Prefix = options.Prefix || String.uniqueID();

        this.setupUnit();

        // Should the data be cloned instead of referenced?
        // if (data) { this._data = data; }
        if (data) { this._data = Object.clone(data); }

        return this;
    },

    /**
     * Store the key/value pair in the Model instance
     * Publish to property referenced change listener if property value is changed
     *
     * @param  {String} prop Property name to be stored
     * @param  {Array|Function|Number|Object|String} val Property value to be stored
     * @return {Class} The Model instance
     */
    _set: function(prop, val){
        var old = this._data[prop];

        // if (old !== val) {

        // Dereference the new val
        if (Is.Array(val)) {
            val = val.slice();
        } else if(Is.Object(val)){
            val = Object.clone(val);
        }

        if (!Is.Equal(old, val)) {
            this._changed = true;

            this._changedProperties[prop] = val;

            this._data[prop] = val;
        }

        return this;
    }.overloadSetter(),

    /**
     * Store the key/value pair in the Model instance
     * Publish the changes to the Unit observer
     *
     * @param  {String} prop Property name to be stored
     * @param  {Array|Function|Number|Object|String} val Property value to be stored
     *         Function property will be invoked with 'call', bound to the Model instance
     * @return {Class} The Model instance
     */
    set: function(prop, val){
        this._set(prop, val);

        this.changeProperty(this._changedProperties);

        this.change();

        // store the previously changed properties
        this._previousProperties = Object.clone(this._changedProperties);

        // reset the changed
        this._changed = false;

        // reset changed properties
        this._changedProperties = {};

        return this;
    },

    /**
     * Unset a data property. It can not be erased so it will be set to undefined
     *
     * @param  {[type]} prop Property name to be unset
     * @return {Class} The Model instance
     */
    unset: function(prop){
        // void 0 is used because 'undefined' is a var that can be changed in some browsers
        this.set(prop, void 0);

        return this;
    },

    /**
     * Retrieve the stored property
     *
     * @param  {String} prop Property name to retrieve
     * @return Value referenced by prop param
     */
    get: function(prop){
        var val = this._data[prop];

        // should function values be executed?
        return (typeOf(val) == 'function') ? val.call(this) : val;
    }.overloadGetter(),

    /**
     * Retrieve entire data object in Model instance
     *
     * @return {Object}
     */
    getData: function(){
        /** Should the data be cloned instead of referenced? */
        //return this.clone();
        return this._data;
    },

    /**
     * Publish to 'change' listener if model has changed
     *
     * @return {[type]}
     */
    change: function(){
        if (this._changed) {
            this.publish('change', this);
        }

        return this;
    },

    /**
     * Publish to 'change:prop' listener if model property has changed
     * @param  {String} prop Name of property
     * @return {[type]}
     */
    changeProperty: function(prop, val){
        if (this._changed) {
            this.publish('change:' + prop, [this, prop, val]);
        }

        return this;
    }.overloadSetter(),

    /**
     * Publish to 'destroy' listener if model is to be destroyed
     *
     * @return {[type]}
     */
    destroy: function(){
        this.publish('destroy', this);

        return this;
    },

    toJSON: function(){
        return this.clone();
    }
});

['clone', 'subset', 'map', 'filter', 'every', 'some', 'keys', 'values', 'getLength', 'keyOf', 'contains', 'toQueryString'].each(function(method){
//['clone', 'subset', 'keys', 'values', 'getLength', 'contains'].each(function(method){
    exports.Model.implement(method, function(){
        return Object[method].apply( Object, [this._data].append( Array.from(arguments) ) );
    });
});

// }(typeof exports != 'undefined' ? exports : window));

});