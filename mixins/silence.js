/**
 * Silent mixin. Inspired by Shipyard.
 */
var Silence = new Class({
    _silent: 0,

    silence: function(fnc){
        this._silent++;
        fnc && fnc.call(this);
        this._silent--;

        return this;
    },

    isSilent: function(){
        return !!this._silent;
    }
});

exports.Silence = Silence;