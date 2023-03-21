sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
], 

function (Controller, History, UIComponent) {
    "use strict";

    return Controller.extend("sapips.training.routingandnavigationexercise.controller.Detail", {
        //Lifecycle event. Allows this._onObjectMatched to trigger when
        //attachPatternMatched event happens

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
        },

        //When triggered, puts passed parameters in Input fields
        //
        //oEvent - Event instance
        _onObjectMatched: function (oEvent) {
            var sParam1 = oEvent.getParameter("arguments").Param1;
            var oText1 = this.getView().byId("idInput1");
            oText1.setValue(sParam1);

            var sParam2 = oEvent.getParameter("arguments").Param2;
            var oText2 = this.getView().byId("idInput2");
            oText2.setValue(sParam2);
        },

        //When triggered, when back button is pressed. 
        //Triggers navigation back to previous page.
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash && sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("RouteOverview");
            }
        }
    });

});