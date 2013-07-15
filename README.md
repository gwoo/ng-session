ng-session
----------

Angular Service for managing session state.

	$session.set({name: "foo"});
	$session.get(); // {name: "foo"}
	$session.get("name"); // "foo"

	$session.set({name: {first: "bar"});
	$session.get("name.first"); // "bar"

Enjoy!