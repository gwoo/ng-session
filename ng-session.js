'use strict';

/*
* A Session service.
*/
angular.module('ngSession', ['ngCookie'])
  .factory('$session', ['$cookieStore', function(cookies) {
    return new function() {
      /*
        Current session data.
      */
      this.scope = {}
      this.data = {}
      this.name = ""

      /*
        Initialize the current session.
      */
      this.init = function ($rootScope) {
        this.scope = $rootScope
        this.name = this.scope.app || "app"

        var c = cookies.get()
        this.data = c || {}
        return this.store()
      }

      /*
        Clear the current session.
      */
      this.clear = function () {
        this.data = {}
        cookies.remove(this.name)
        this.scope =  this.scope.$new(true)
        this.scope.$destroy()
        this.scope.$root = this.scope
      }

      /*
        Clear the current session.
      */
      this.store = function () {
        cookies.put(this.name, this.data)
        angular.extend(this.scope, this.data)
        return this.scope
      }

      /*
        Set the key for the current session.
        @param mixed key As a string, expects value to be provided. This key can use dot syntax for
                        deeper object nesting. As an object, key will merge with the current session.
        @param mixed value As null, the key is expected to be an object. As any other it will be
                          merged with the current session.
      */
      this.set = function (key, value) {
        if (typeof value === "undefined") {
          angular.extend(this.data, key)
          return this.store()
        }
        var parts = key.split(".")

        if (parts.length == -1) {
          this.data[key] = value
          return this.store()
        }
        var co = this.data, k;
        for(var i = 0; i < parts.length; i++) {
          if (k) co = (co[k] ? co[k] : co[k] = {});
          k = parts[i];
        }
        co[k] = value;
        return this.store()
      }

      /*
        Get a key from the current session.
        @param mixed key As null, the current session is returned. As a string, the key will be
                        matched with the current session to return the value. Use dot syntax to access
                        keys in nested objects.
      */
      this.get = function(key) {
        if (!key) return this.scope

        var parts = key.split("."), co = this.scope;
        for(var i = 0; i < parts.length; i++) {
          if (!co[parts[i]]) return
          co = co[parts[i]]
        }
        return co;
      }
    }
  }]);