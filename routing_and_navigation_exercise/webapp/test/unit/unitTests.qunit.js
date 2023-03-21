/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapipstraining/routing_and_navigation_exercise/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
