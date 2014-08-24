
define('observableModel', ['ko'], function(ko){
	var addArrayMethods = function (val, actual) {
      //add observableArray specific methods
      ko.utils.arrayForEach(["remove", "removeAll", "destroy", "destroyAll", "replace"], function (methodName) {
          val[methodName] = ko.observableArray.fn[methodName].bind(actual);
      });
      
      
      //call observableArray notifications and apply native array methods (since they are being replaced)
      ko.utils.arrayForEach(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (methodName) {
          val[methodName] = function () {
              actual.valueWillMutate();
              var methodCallResult = [][methodName].apply(val, arguments);
              actual.valueHasMutated();
              return methodCallResult;
          };
      });
  };

  var observableModel = function(target, props) {
      //loop through the properties that were provided
      props = props || Object.keys(target);

      ko.utils.arrayForEach(props || [], function(prop) {
          var actual, isArray, initial = target[prop];

          if (Array.isArray(initial)) {
              actual = ko.observableArray(initial);
              isArray = true;
              addArrayMethods(initial, actual);
          } else {
              actual = typeof initial != "function" ? ko.observable(initial) : ko.computed(initial, target);
          }
          
                
          //observables/computeds are already set up to act getters/setters
          //this actually redefines the existing property on the object that was provided
          Object.defineProperty(target, prop, {
              get: actual,
              set: function(newValue) {
                 var val, fn;
                 actual(newValue);
                 
                 val = actual.peek();
                 
                 //if this was originally an observableArray, then always check to see if we need to add/replace the array methods (if newValue was an entirely new array)
                 if (isArray && !val.destroyAll) {
                     //don't allow null, force to an empty array
                     if (!val) {
                        val = []
                        actual(val);                       
                     } 
                     
                     addArrayMethods(val, actual);    
                 }
              }                
          });

          var desc = Object.getOwnPropertyDescriptor(target, prop);
      });

      return target;    
  };

  return observableModel;
});

define("model", ['ko', 'jquery', 'observableModel'], function (ko, $, observableModel) {
	var model = {
		header_title : "Noted",
    header_logout : false,
		messages: []
	};
	model = observableModel(model);
    ko.applyBindings(model);

    return model;
});
