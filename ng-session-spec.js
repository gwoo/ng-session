'use strict';

/**
 * Unit test for `ngSession`
 */
describe('Session Service', function() {

  var $session;
  
  beforeEach(module('ngSession'));
  
  
  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });


  beforeEach(inject(function($injector) {
    $session = $injector.get("$session")
  }))

  it('should set default objects', function() {
      var data = { organization: {name: "foo" } }
      var result = $session.set(data);
      expect(data).toEqualData(result);
  });

  it('should set a new object', function() {
      var data = { organization: {name: "foo" } }
      var result = $session.set(data);
      expect(data).toEqualData(result);

      var new_data = { project : { name: "bar" } }
      $session.set(new_data)
      data.project = new_data.project
      expect(data).toEqualData($session.get());
  });

  it('should set a new key and value', function() {
      var data = { organization: {name: "foo" } }
      var result = $session.set(data);
      expect(data).toEqualData(result);

      var new_data = { name: "bar" }
      $session.set("project", new_data)
      data.project = new_data
      expect(data).toEqualData($session.get());
  });

  it('should set a new key and value with dot syntax', function() {
      var data = { organization: {name: "foo" } }
      var result = $session.set(data);
      expect(data).toEqualData(result);

      $session.set("project.name", "bar")
      data.project = {name: "bar"}
      expect(data).toEqualData($session.get());
  });

  it('should get a value with dot syntax', function() {
      var data = { organization: {name: "foo" } }
      var result = $session.set(data);
      expect(data).toEqualData(result);
      expect("foo").toEqualData($session.get("organization.name"));
  });

  it('should get undefined with dot syntax', function() {
      expect(undefined).toEqualData($session.get("organization.name"));
  });

  it('should change booleans', function() {
      expect(undefined).toEqualData($session.get("foo"));
      $session.set("foo", true);
      expect(true).toEqualData($session.get("foo"));
      $session.set("foo", false);
      expect(undefined).toEqualData($session.get("foo"));

  });
});