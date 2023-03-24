sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/ValueState",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, ValueState, MessageToast, MessageBox, JSONModel) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.EditEmployee", {
            onInit: function () {
                this.getRouter().getRoute('EditEmployee').attachPatternMatched(this._onObjectMatched, this);
            },

            _onObjectMatched: function (oEvent) {
                var oView = this.getView();

                var oModel = this.getOwnerComponent().getModel("EmployeesList");

                var sEmployeeID = oEvent.getParameter("arguments").EmployeeID;

                // @ts-ignore
                oModel.read("/Employee(EmployeeID='"+ sEmployeeID +"')", {
                    urlParameters: {
                        $expand: "CareerList,ProjectList,Skill"
                    },
                    success: function (oEmployee) {
                        var oEmployeeProfile = new JSONModel(oEmployee);
                        oView.setModel(oEmployeeProfile, "EmployeeName");
                        oView.getModel("EmployeeName").refresh();
                    },
                    error: function () {}
                });
            },

            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            }

        });
    });