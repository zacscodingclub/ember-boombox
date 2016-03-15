/* globals requirejs, require */

function testShouldBeLoaded(name) {
  return isTestFile(name) && testStepIsBeforeUrlParam(name);
}

function jshintFileShouldBeLoaded(name) {
  return !QUnit.urlParams.nojshint && name.match(/\.jshint$/);
}

function isTestFile(name) {
  return name.match(/[^ember][-_]test$/);
}

function paddedStepNumber(name) {
  return name.match(/step-(\d+)-test$/)[1];
}

function testStepIsBeforeUrlParam(name) {
  var param = QUnit.urlParams['up-to-step'];
  // If nothing is selected include all steps
  if (!param) { return true; }

  var stepNumber = Number(paddedStepNumber(name));
  var upToStepNumber = Number(param);
  return stepNumber <= upToStepNumber;
}

// Collect all the files that match the test file pattern.
var availableTestFiles = Object.keys(requirejs.entries).filter(isTestFile);

// Collect a list of steps from all the test files
var availableStepValues = availableTestFiles.map(paddedStepNumber);

// Add config option to select what step a student is at in the course.
QUnit.config.urlConfig.push({
  id: "up-to-step",
  label: "Up to step",
  value: availableStepValues,
  tooltip: "Pick the step that you are curently working on"
});

// Load correct modules for testing
availableTestFiles.forEach(function(moduleName) {
  if (testShouldBeLoaded(moduleName) || jshintFileShouldBeLoaded(moduleName)) {
    require(moduleName);
  }
});

// /* globals requirejs, require */
// (function() {
// define("ember-cli/test-loader",
//   [],
//   function() {
//     "use strict";
//
//     var moduleIncludeMatchers = [];
//     var moduleExcludeMatchers = [];
//
//     function addModuleIncludeMatcher(fn) {
//       moduleIncludeMatchers.push(fn);
//     };
//
//     function addModuleExcludeMatcher(fn) {
//       moduleExcludeMatchers.push(fn);
//     };
//
//     function checkMatchers(matchers, moduleName) {
//       var matcher;
//
//       for (var i = 0, l = matchers.length; i < l; i++) {
//         matcher = matchers[i];
//
//         if (matcher(moduleName)) {
//           return true;
//         }
//       }
//
//       return false;
//     }
//
//     function TestLoader() {
//       this._didLogMissingUnsee = false;
//     };
//
//     TestLoader.prototype = {
//       shouldLoadModule: function(moduleName) {
//         return (moduleName.match(/[-_]test$/));
//       },
//
//       listModules: function() {
//         return Object.keys(requirejs.entries);
//       },
//
//       loadModules: function() {
//         var moduleName, index, length;
//         var moduleNames = this.listModules();
//
//         for (index = 0, length = moduleNames.length; index < length; index++) {
//           moduleName = moduleNames[index];
//
//           if (checkMatchers(moduleExcludeMatchers, moduleName)) {
//             continue;
//           }
//
//           if (checkMatchers(moduleIncludeMatchers, moduleName) || this.shouldLoadModule(moduleName)) {
//             this.require(moduleName);
//             this.unsee(moduleName);
//           }
//         }
//       }
//     };
//
//     TestLoader.prototype.require = function(moduleName) {
//       try {
//         require(moduleName);
//       } catch(e) {
//         this.moduleLoadFailure(moduleName, e);
//       }
//     };
//
//    TestLoader.prototype.unsee = function(moduleName) {
//      if (typeof require.unsee === 'function') {
//        require.unsee(moduleName);
//      } else if (!this._didLogMissingUnsee) {
//       this._didLogMissingUnsee = true;
//       if (typeof console !== 'undefined') {
//         console.warn('unable to require.unsee, please upgrade loader.js to >= v3.3.0');
//       }
//      }
//     };
//
//     TestLoader.prototype.moduleLoadFailure = function(moduleName, error) {
//       console.error('Error loading: ' + moduleName, error.stack);
//     };
//
//     TestLoader.load = function() {
//       new TestLoader().loadModules();
//     };
//
//     return {
//       'default': TestLoader,
//       addModuleIncludeMatcher: addModuleIncludeMatcher,
//       addModuleExcludeMatcher: addModuleExcludeMatcher
//     };
//   }
// );
// })();
//
