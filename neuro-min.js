(function(a){var b={},c=function(d){var e=b[d];if(!e){e=b[d]={};var f=e.exports={};a[d].call(f,c,e,f,window)}return e.exports};window.Neuro=c("0")})({0:function(a,b,c,d){var e=a("1");e.Model=a("2").Model,e.Collection=a("b").Collection,e.View=a("d").View,e.Router=a("f").Router,e.Route=a("g").Route,e.Is=a("4").Is,e.Mixins={Butler:a("9").Butler,Connector:a("6").Connector,Silence:a("5").Silence,Snitch:a("m").Snitch},c=b.exports=e},1:function(a,b,c,d){c=b.exports={version:"0.2.7"}},2:function(a,b,c,d){var e=a("3").Model,f=a("9").Butler,g=a("a").Snitch,h=a("8"),i=function(a){return function(b){var c=this.getAccessor(b,a),d=this._accessorName;return c&&d!=b?c():this.parent(b)}.overloadGetter()};e.implement(new f),e.implement(new g),e.implement(h(["error"],{signalErrorProperty:function(a,b){!this.isSilent()&&this.fireEvent("error:"+a,[this,a,b])}})),c.Model=new Class({Extends:e,_errored:!1,_erroredProperties:{},setup:function(a,b){return this.setupAccessors(this.options.accessors),this.setupValidators(this.options.validators),this.parent(a,b),this},__set:function(a,b){var c=this.getAccessor(a,"set");return c&&this._accessorName!=a?c.apply(this,arguments):this.validate(a,b)?this.parent(a,b):(this._errored=!0,this._erroredProperties[a]=b,this)}.overloadSetter(),set:function(a,b){return this.parent(a,b),!this.isSetting()&&this._errored&&(this._onErrorProperty(this._erroredProperties),this.signalError(),this._resetErrored()),this},get:i("get"),getPrevious:i("getPrevious"),_resetErrored:function(){return this._errored&&(this._errored=!1,this._erroredProperties={}),this},_onErrorProperty:function(a,b){return this.signalErrorProperty(a,b),this}.overloadSetter(),setAccessor:function(a,b){return a&&b&&(b.get&&!b.getPrevious&&(b.getPrevious=b.get),this.parent(a,b)),this}.overloadSetter(),validate:function(a,b){return(this.getValidator("*")||this.parent).call(this,a,b)},proof:function(){return this.parent(this.getData())}})},3:function(a,b,c,d){var e=a("4").Is,f=a("5").Silence,g=a("6").Connector,h=a("8"),i=function(a){switch(typeOf(a)){case"array":a=a.slice();break;case"object":if(!a.$constructor||a.$constructor&&!instanceOf(a.$constructor,Class))a=Object.clone(a)}return a},j=function(a){return function(b){return this[a][b]}.overloadGetter()},k=function(a){return function(){var b=this.keys(),c={};return b.each(function(b){c[b]=i(this[a](b))}.bind(this)),c}},l=new Class({Implements:[g,Events,Options,f],primaryKey:undefined,_data:{},_changed:!1,_changedProperties:{},_previousData:{},_setting:0,options:{primaryKey:undefined,defaults:{}},initialize:function(a,b){if(instanceOf(a,this.constructor))return a;this.setOptions(b),this.setup(a,b)},setup:function(a,b){return this.primaryKey=this.options.primaryKey,this.silence(function(){this.set(this.options.defaults)}.bind(this)),a&&this.set(a),this},__set:function(a,b){var c=this.get(a);return e.Equal(c,b)||(this._changed=!0,this._data[a]=this._changedProperties[a]=i(b)),this}.overloadSetter(),_set:function(a,b){return this._setting++,this.__set(a,b),this._setting--,this},set:function(a,b){var c;return a&&(c=this.isSetting(),!c&&this._setPrevious(this.getData()),a=instanceOf(a,l)?a.getData():a,this._set(a,b),!c&&this._changed&&(this._onChangeProperty(this._changedProperties),this.signalChange(),this._resetChanged())),this},isSetting:function(){return!!this._setting},unset:function(a){var b={},c,d=0,e;a=Array.from(a),c=a.length;while(c--)b[a[d++]]=void 0;return this.set(b),this},reset:function(a){var b={},c=this.options.defaults,d,e=0,f;if(a){a=Array.from(a),d=a.length;while(d--)f=a[e++],b[f]=c[f]}else b=c;return this.set(b),this.signalReset(),this},get:j("_data"),getData:k("get"),_setPrevious:function(a,b){return this._previousData[a]=b,this}.overloadSetter(),getPrevious:j("_previousData"),getPreviousData:k("getPrevious"),_resetChanged:function(){return this._changed&&(this._changed=!1,this._changedProperties={}),this},_onChangeProperty:function(a,b){return this._changed&&this.signalChangeProperty(a,b,this.getPrevious(a)),this}.overloadSetter(),destroy:function(){return this.signalDestroy(),this},toJSON:function(){return this.getData()},spy:function(a,b){return Type.isString(a)&&a in this._data&&Type.isFunction(b)&&this.addEvent("change:"+a,b),this}.overloadSetter(),unspy:function(a,b){return Type.isString(a)&&a in this._data&&this.removeEvents("change:"+a,b),this}.overloadSetter()});l.implement(h(["change","destroy","reset"],{signalChangeProperty:function(a,b,c){return!this.isSilent()&&this.fireEvent("change:"+a,[this,a,b,c]),this}})),["each","subset","map","filter","every","some","keys","values","getLength","keyOf","contains","toQueryString"].each(function(a){l.implement(a,function(){return Object[a].apply(Object,[this._data].append(Array.from(arguments)))})}),c.Model=l},4:function(a,b,c,d){(function(a,b){var c=Object.prototype.toString,d=Object.prototype.hasOwnProperty,e=b.Type,f=a.Is={},g=b.Type=function(a,b){var c=new e(a,b),d;return c?(d="is"+a,f[a]=f.not[a]=g[d]=e[d],c):c}.extend(e);g.prototype=e.prototype;for(var h in e)g.hasOwnProperty(h)&&h.test("is")&&(h=h.replace("is",""),f[h]=g["is"+h]);f.NaN=function(a){return a!==a},f.Null=function(a){return a===null},f.Undefined=function(a){return a===void 0};var i={string:function(a,b){return a==String(b)},number:function(a,b){return a!=+a?b!=+b:a==0?1/a==1/b:a==+b},date:function(a,b){return+a==+b},"boolean":function(a,b){return this.date(a,b)},regexp:function(a,b){return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}},j=function(a,b){return a.hasOwnProperty(b)},k=function(a,b,c,d){if(a===b)return a!==0||1/a==1/b;if(a==null||b==null)return a===b;if(a.isEqual&&f.Function(a.isEqual))return a.isEqual(b);if(b.isEqual&&f.Function(b.isEqual))return b.isEqual(a);var e=typeOf(a),g=typeOf(b);if(e!=g)return!1;if(i[e])return i[e](a,b);if(typeof a!="object"||typeof b!="object")return!1;var h=c.length;while(h--)if(c[h]==a)return d[h]==b;c.push(a),d.push(b);var l=0,m=!0;if(e=="array"){l=a.length,m=l==b.length;if(m)while(l--)if(!(m=k(a[l],b[l],c,d)))break}else{var n=a.constructor,o=b.constructor;if(n!==o&&!(f.Function(n)&&instanceOf(n,n)&&f.Function(o)&&instanceOf(o,o)))return!1;for(var p in a)if(j(a,p)){l++;if(!(m=j(b,p)&&k(a[p],b[p],c,d)))break}if(m){for(p in b)if(j(b,p)&&!(l--))break;m=!l}}return c.pop(),d.pop(),m};f.Equal=function(a,b){return k(a,b,[],[])},function(a){var b={};for(var c in a)j(a,c)&&(b[c]=function(b){return function(c,d){return!a[b].call(a,c,d)}}(c));a.not=b}(f)})(typeof c!="undefined"?c:window,this.window||d)},5:function(a,b,c,d){var e=new Class({_silent:0,silence:function(a){return this._silent++,a&&a.call(this),this._silent--,this},tagSilent:function(){return this._silent=1,this},untagSilent:function(){return this._silent=0,this},isSilent:function(){return!!this._silent}});c.Silence=e},6:function(a,b,c,d){a("7");var e,f=function(a,b,c,d){return a=="string"&&(c=d&&d[c]?d.bound(c):undefined),c},g=function(a,b){var c={};return Object.each(a,function(a,d){d=d=="*"?b:b+":"+d,c[d]=a}),c},h=function(a,b,c){Object.each(b,function(b,d){b=Array.from(b),b.each(function(b){var e=typeOf(b);switch(e){case"object":instanceOf(b,Class)||h.call(this,a,g(b,d),c);break;case"string":case"function":b=f.call(this,e,d,b,c),b&&this[a](d,b)}},this)},this)},i=function(a){return function(b,c,d){var f=this.options.connector;return Type.isBoolean(c)&&(d=c,c=undefined),c&&(f=f[c]),e[a](this,b,f),d&&b&&b[a](this,c,!1),this}};e=new Class({Implements:[Class.Binds],options:{connector:{}},connect:i("connect"),disconnect:i("disconnect")}),e.extend({connect:function(a,b,c){h.call(a,"addEvent",c,b)},disconnect:function(a,b,c){h.call(a,"removeEvent",c,b)}}),c.Connector=e},7:function(a,b,c,d){Class.Binds=new Class({$bound:{},bound:function(a){return this.$bound[a]?this.$bound[a]:this.$bound[a]=this[a].bind(this)}})},8:function(a,b,c,d){var e="signal",f="-",g=":";c=b.exports=function(a,b,c){return Type.isFunction(b)||(c=b,b=undefined),c=c||{},Array.from(a).each(function(a){var d=(e+f+a.replace(g,f)).camelCase();c[d]=b?b(a):function(){return Array.prototype.unshift.call(arguments,this),!this.isSilent()&&this.fireEvent(a,arguments),this}}),c}},9:function(a,b,c,d){var e=new Class({_accessors:{},_accessorName:undefined,options:{accessors:{}},setupAccessors:function(a){var b=this._accessors;return a=a||{},this._accessors={},this.setAccessor(Object.merge({},b,a)),this},isAccessing:function(){return!!this._accessorName},_processAccess:function(a,b){var c;return a&&(this._accessorName=a,c=b(),this._accessorName=void 0),c},setAccessor:function(a,b){var c={};return!!a&&Type.isObject(b)&&(Object.each(b,function(b,d){var e=b;b._orig||(b=function(){return this._processAccess(a,e.pass(arguments,this))}.bind(this),b._orig=e),c[d]=b},this),this._accessors[a]=c),this}.overloadSetter(),getAccessor:function(a,b){var c=this._accessors[a];return b?c&&c[b]:c},unsetAccessor:function(a,b){return a&&(b?this._accessors[a][b]=void 0:this._accessors[a]=void 0),this}});c.Butler=e},a:function(a,b,c,d){var e="*",f=function(a){var b={};return typeOf(a)=="function"?b[e]=a:b=a,b},g=new Class({_validators:{},options:{validators:{}},setupValidators:function(a){var b=this._validators;return a=a||{},this._validators={},this.setValidator(Object.merge({},f(b),f(a))),this},setValidator:function(a,b){var c=b;return b&&!b._orig&&(b=b.bind(this),b._orig=c),this._validators[a]=b,this}.overloadSetter(),getValidator:function(a){return this._validators[a]}.overloadGetter(),validate:function(a,b){var c=this.getValidator(a),d=!0;return c&&(d=c(b)),d},proof:function(a){var b=Object.clone(this._validators),c=b[e],d;return c?(delete b[e],d=Object.keys(a),c(a)&&Object.keys(b).every(d.contains.bind(d))):g.proof(a,b)}});g.proof=function(a,b){return Object.every(b,function(b,c){return c in a&&b(a[c])})},c.Snitch=g},b:function(a,b,c,d){var e=a("c").Collection,f=a("2").Model,g=a("a").Snitch,h=function(a,b){return this.parent(b,a)};e.implement(new g),c.Collection=new Class({Extends:e,setup:function(a,b){return this.setupValidators(this.options.validators),this.parent(a,b),this},_add:function(a,b){return this.validate(a)?this.parent(a,b):this.signalError(a,b),this},validate:function(a){var b=this.getValidator("*");return a=Array.from(a),a.every(function(a){var c=instanceOf(a,f);return b?b(c?a.getData():a):c?a.every(h,this):Object.every(a,h,this)},this)},proofModel:function(a){return a=Array.from(a),a.every(function(a){return g.proof(instanceOf(a,f)?a.getData():a,this._validators)},this)},proof:function(){return this.proofModel(this._models)},signalError:function(a,b){!this.isSilent()&&this.fireEvent("error",[this,a,b])}})},c:function(a,b,c,d){var e=a("2").Model,f=a("5").Silence,g=a("6").Connector,h=a("8"),i=new Class({Implements:[g,Events,Options,f],_models:[],_active:0,_changed:!1,length:0,primaryKey:undefined,options:{primaryKey:undefined,Model:{constructor:e,options:undefined}},initialize:function(a,b){this.setOptions(b),this.setup(a,b)},setup:function(a,b){return this.primaryKey=this.options.primaryKey,this._Model=this.options.Model.constructor,a&&this.add(a),this},hasModel:function(a){var b=this.primaryKey,c,d;return c=this._models.contains(a),b&&!c&&(d=instanceOf(a,e)?a.get(b):a[b],c=this.some(function(a){return d===a.get(b)})),!!c},resetChange:function(){this._changed=!1},attachModelEvents:function(a){return a.addEvents({destroy:this.bound("remove"),change:this.bound("signalChangeModel")}),this},detachModelEvents:function(a){return a.removeEvents({destroy:this.bound("remove"),change:this.bound("signalChangeModel")}),this},act:function(a){return this._active++,a.call(this),this._active--,this},isActive:function(){return!!this._active},_add:function(a,b){return a=new this._Model(a,this.options.Model.options),this.hasModel(a)||(this.attachModelEvents(a),b=this.length==0?void 0:b,b!=void 0?this._models.splice(b,0,a):this._models.push(a),this.length=this._models.length,this._changed=!0,this.signalAdd(a,b!=void 0?b:this.length-1)),this},add:function(a,b){var c=this.length;return a=Array.from(a),this.act(function(){var c=a.length,d=0;while(c--)this._add(a[d++],b)}),!this.isActive()&&this._changed&&(this.signalChange(),this.resetChange()),this},get:function(a){var b=arguments.length,c=0,d;if(b>1){d=[];while(b--)d.push(this.get(arguments[c++]));return d}return this._models[a]},_remove:function(a){return this.hasModel(a)&&(this.detachModelEvents(a),this._models.erase(a),this.length=this._models.length,this._changed=!0,this.signalRemove(a)),this},remove:function(a){var b=this.length;return a=Array.from(a).slice(),this.act(function(){var b=a.length,c=0;while(b--)this._remove(a[c++])}),!this.isActive()&&this._changed&&(this.signalChange(),this.resetChange()),this},replace:function(a,b){var c;return a&&b&&this.hasModel(a)&&!this.hasModel(b)&&(c=this.indexOf(a),c>-1&&(this.act(function(){this.add(b,c),this.remove(a)}),!this.isActive()&&this.signalChange()&&this.resetChange())),this},sort:function(a){return this._models.sort(a),this.signalSort(),this},reverse:function(){return this._models.reverse(),this.signalSort(),this},empty:function(){return this.remove(this._models),this.signalEmpty(),this},toJSON:function(){return this.map(function(a){return a.toJSON()})}});i.implement(h(["empty","sort","change","add","remove","change:model"])),["forEach","each","invoke","every","filter","clean","indexOf","map","some","associate","link","contains","getLast","getRandom","flatten","pick"].each(function(a){i.implement(a,function(){return Array.prototype[a].apply(this._models,arguments)})}),c.Collection=i},d:function(a,b,c,d){var e=a("e").View;c.View=e},e:function(a,b,c,d){var e=a("6").Connector,f=a("5").Silence,g=a("8"),h=function(a){return function(){var b=this.options.events,c=this.element;return c&&b&&Object.each(b,function(b,c){var d=Array.from(b),e=d.length,f=0,g;while(e--)g=d[f++],this.element[a](c,typeOf(g)=="function"?g:this.bound(g))},this),this}},i=new Class({Implements:[e,Events,Options,f],options:{element:undefined,events:{}},initialize:function(a){this.setOptions(a),this.setup(a),this.signalReady()},setup:function(a){return this.options.element&&this.setElement(this.options.element),this},toElement:function(){return this.element},setElement:function(a){return a&&(this.element&&this.destroy(),a=this.element=document.id(a),a&&this.attachEvents()),this},attachEvents:h("addEvent"),detachEvents:h("removeEvent"),create:function(){return this},render:function(a){return this.signalRender.apply(this,arguments),this},inject:function(a,b){return this.element&&(a=document.id(a),b=b||"bottom",this.element.inject(a,b),this.signalInject(a,b)),this},dispose:function(){return this.element&&(this.element.dispose(),this.signalDispose()),this},destroy:function(){var a=this.element;return a&&(a&&(a.destroy(),this.element=undefined),this.signalDestroy()),this}});i.implement(g(["ready","render","dispose","destroy","inject"])),c.View=i},f:function(a,b,c,d){var e=a("b"),f=a("g"),g=a("8"),h=new Class({Extends:e.Collection,options:{Model:{constructor:f.Route,options:{defaults:{typecast:!1,normalizer:null}}},greedy:!1,greedyEnabled:!0},_prevRoutes:[],_prevMatchedRequest:null,_prevBypassedRequest:null,_add:function(a){var b=instanceOf(a,f.Route)?a.get("priority"):a.priority||(a.priority=0);return this.parent(a,this._calcPriority(b)),this},_calcPriority:function(a){var b,c=this.length;do--c;while((b=this.get(c),b)&&a<=b.get("priority"));return c+1},resetState:function(){return this._prevRoutes.length=0,this._prevMatchedRequest=null,this._prevBypassedRequest=null,this},parse:function(a,b){a=a||"",b=b||[];if(a!==this._prevMatchedRequest&&a!==this._prevBypassedRequest){var c=this._getMatchedRoutes(a),d=0,e=c.length,f;if(e){this._prevMatchedRequest=a,this._notifyPrevRoutes(c,a),this._prevRoutes=c;while(d<e)f=c[d],f.route.signalMatch.apply(f.route,b.concat(f.params)),f.isFirst=!d,this.signalMatch.apply(this,b.concat([a,f])),d+=1}else this._prevBypassedRequest=a,this.signalDefault.apply(this,b.concat([a]))}return this},empty:function(){return this.resetState(),this.parent(),this},_notifyPrevRoutes:function(a,b){var c=0,d;while(d=this._prevRoutes[c++])this._didSwitch(d.route,a)&&d.route.signalPass(b);return this},_didSwitch:function(a,b){var c=0,d;while(d=b[c++])if(d.route===a)return!1;return!0},_getMatchedRoutes:function(a){var b=[],c=this.length,d;while(d=this.get(--c)){(!b.length||this.options.greedy||d.get("greedy"))&&d.match(a)&&b.push({route:d,params:d.parse(a)});if(!this.options.greedyEnabled&&b.length)break}return b}});h.NORM_AS_ARRAY=function(a,b){return[b.vals_]},h.NORM_AS_OBJECT=function(a,b){return[b]},h.implement(g(["match","default"])),c.Router=h},g:function(a,b,c,d){var e=a("h").Route,f=a("k");e.PatternLexer=f,c.Route=e},h:function(a,b,c,d){var e=a("2"),f=a("8"),g=a("i"),h=a("j"),i=/t(.+)?/.exec("t")[1]==="",j=new Class({Extends:e.Model,options:{defaults:{pattern:void 0,priority:0,normalizer:void 0,greedy:!1,rules:{},typecast:!1,patternLexer:void 0},accessors:{pattern:{set:function(a,b){if(this.validate(a,b)){this.set(a,b);var c={},d=this.get("patternLexer");c._matchRegexp=b,c._optionalParamsIds=c._paramsIds=void 0,typeOf(b)!="regexp"&&(c._paramsIds=d.getParamIds(b),c._optionalParamsIds=d.getOptionalParamsIds(b),c._matchRegexp=d.compilePattern(b)),this.set(c)}}},rules:{set:function(a,b){this.validate(a,b)&&this.set(a,new e.Model(b))}},callback:{set:function(a,b){typeOf(b)=="function"&&this.addEvent("match",b)}},patternLexer:{get:function(){return this.get("patternLexer")||j.PatternLexer}}},validators:{pattern:function(a){return["null","regexp","string"].contains(typeOf(a))},priority:Type.isNumber,normalizer:Type.isFunction,greedy:Type.isBoolean,rules:Type.isObject,patternLexer:Type.isObject}},match:function(a){return a=a||"",this.get("_matchRegexp").test(a)&&this._validateParams(a)},parse:function(a){return this._getParamsArray(a)},interpolate:function(a){var b=this.get("patternLexer").interpolate(this.get("pattern"),a);if(!this._validateParams(b))throw new Error("Generated string doesn't validate against `Route.rules`.");return b},_validateParams:function(a){var b=this.get("rules"),c=this._getParamsObject(a);return b.every(function(b,d){return d=="normalize_"||!!this._isValidParam(a,d,c)},this)},_isValidParam:function(a,b,c){var d=this.get("rules").get(b),e=c[b],f=!1,g=b.indexOf("?")===0,h=this.get("_optionalParamsIds"),i;return!e&&h&&h.indexOf(b)!==-1?!0:(i=typeOf(d),i!=="function"&&g&&(e=c[b+"_"]),i=="regexp"?f=d.test(e):i=="array"?f=d.indexOf(e)!==-1:i=="function"&&(f=d(e,a,c)),f)},_getParamsObject:function(a){var b=this.get("typecast"),c=this.get("_paramsIds"),d=this.get("_optionalParamsIds"),e=this.get("patternLexer").getParamValues(a,this.get("_matchRegexp"),b),f={},j=e&&e.length||0,k,l;while(j--)f[j]=l=e[j],c&&(k=c[j],k.indexOf("?")===0&&l&&(f[k+"_"]=l,e[j]=l=h(l)),i&&l===""&&d&&d.indexOf(k)!==-1&&(e[j]=l=void 0),f[k]=l);return f.request_=b?g(a):a,f.vals_=e,f},_getParamsArray:function(a){var b=this.get("rules"),c=b&&b.get("normalize_")||this.get("normalizer"),d=this._getParamsObject(a);return params=d.vals_,c&&Type.isFunction(c)&&(params=c(a,d)),params}});j.implement(f(["match","pass"])),c.Route=j},i:function(a,b,c,d){var e;c=b.exports=function(a){var b;return a===null||a==="null"?b=null:a==="true"?b=!0:a==="false"?b=!1:a===e||a==="undefined"?b=e:a===""||isNaN(a)?b=a:b=parseFloat(a),b}},j:function(a,b,c,d){var e=a("i");c=b.exports=function(a){var b=(a||"").replace("?","").split("&"),c=b.length,d={},f,g;while(c--)f=b[c].split("="),g=e(f[1]),d[f[0]]=typeof g=="string"?decodeURIComponent(g):g;return d}},k:function(a,b,c,d){function o(){var a,b;for(a in j)j.hasOwnProperty(a)&&(b=j[a],b.id="__CR_"+a+"__",b.save="save"in b?b.save.replace("{{id}}",b.id):b.id,b.rRestore=new RegExp(b.id,"g"))}function p(a,b){var c=[],d;a.lastIndex=0;while(d=a.exec(b))c.push(d[1]);return c}function q(a){return p(i,a)}function r(a){return p(j.OP.rgx,a)}function s(a){return a=a||"",a&&(n===k?a=a.replace(g,""):n===m&&(a=a.replace(h,"")),a=t(a,"rgx","save"),a=a.replace(f,"\\$&"),a=t(a,"rRestore","res"),n===k&&(a="\\/?"+a)),n!==l&&(a+="\\/?"),new RegExp("^"+a+"$")}function t(a,b,c){var d,e;for(e in j)j.hasOwnProperty(e)&&(d=j[e],a=a.replace(d[b],d[c]));return a}function u(a,b,c){var d=b.exec(a);return d&&(d.shift(),c&&(d=e(d))),d}function v(a,b){if(typeof a!="string")throw new Error("Route pattern should be a string.");var c=function(a,c){var d;if(c in b){d=String(b[c]);if(a.indexOf("*")===-1&&d.indexOf("/")!==-1)throw new Error('Invalid value "'+d+'" for segment "'+a+'".')}else{if(a.indexOf("{")!==-1)throw new Error("The segment "+a+" is required.");d=""}return d};return j.OS.trail||(j.OS.trail=new RegExp("(?:"+j.OS.id+")+$")),a.replace(j.OS.rgx,j.OS.save).replace(i,c).replace(j.OS.trail,"").replace(j.OS.rRestore,"/")}var e=a("l"),f=/[\\.+*?\^$\[\](){}\/'#]/g,g=/^\/|\/$/g,h=/\/$/g,i=/(?:\{|:)([^}:]+)(?:\}|:)/g,j={OS:{rgx:/([:}]|\w(?=\/))\/?(:|(?:\{\?))/g,save:"$1{{id}}$2",res:"\\/?"},RS:{rgx:/([:}])\/?(\{)/g,save:"$1{{id}}$2",res:"\\/"},RQ:{rgx:/\{\?([^}]+)\}/g,res:"\\?([^#]+)"},OQ:{rgx:/:\?([^:]+):/g,res:"(?:\\?([^#]*))?"},OR:{rgx:/:([^:]+)\*:/g,res:"(.*)?"},RR:{rgx:/\{([^}]+)\*\}/g,res:"(.+)"},RP:{rgx:/\{([^}]+)\}/g,res:"([^\\/?]+)"},OP:{rgx:/:([^:]+):/g,res:"([^\\/?]+)?/?"}},k=1,l=2,m=3,n=k;o(),c=b.exports={strict:function(){n=l},loose:function(){n=k},legacy:function(){n=m},getParamIds:q,getOptionalParamsIds:r,getParamValues:u,compilePattern:s,interpolate:v}},l:function(a,b,c,d){var e=a("i");c=b.exports=function(a){var b=a.length,c=[];while(b--)c[b]=e(a[b]);return c}},m:function(a,b,c,d){var e="*",f=function(a){var b={};return typeOf(a)=="function"?b[e]=a:b=a,b},g=new Class({_validators:{},options:{validators:{}},setupValidators:function(a){var b=this._validators;return a=a||{},this._validators={},this.setValidator(Object.merge({},f(b),f(a))),this},setValidator:function(a,b){var c=b;return b&&!b._orig&&(b=b.bind(this),b._orig=c),this._validators[a]=b,this}.overloadSetter(),getValidator:function(a){return this._validators[a]}.overloadGetter(),validate:function(a,b){var c=this.getValidator(a),d=!0;return c&&(d=c(b)),d},proof:function(a){var b=Object.clone(this._validators),c=b[e],d;return c?(delete b[e],d=Object.keys(a),c(a)&&Object.keys(b).every(d.contains.bind(d))):g.proof(a,b)}});g.proof=function(a,b){return Object.every(b,function(b,c){return c in a&&b(a[c])})},c.Snitch=g}})