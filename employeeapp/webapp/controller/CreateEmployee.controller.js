sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/core/ValueState",
        "sap/m/MessageToast",
        "sap/m/MessageBox"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, ValueState, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend("sapips.training.employeeapp.controller.CreateEmployee", {
            onInit: function () {
                var oView = this.getView();
                this.fnCheckValidation(oView);
            },

            onCancelCreate: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash && sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("RouteEmployeeList");
                }
            },

            onSaveCreate: function () {
                var oView = this.getView();

                var oModel = this.getOwnerComponent().getModel("EmployeesList");

                var oEmployeeID = oView.byId("iEID"),
                    oFirstName = oView.byId("iFirstName"),
                    oLastName = oView.byId("iLastName"),
                    oAge = oView.byId("iAge"),
                    oDateHire = oView.byId("dpDateHire"),
                    oCareerLevel = oView.byId("cbCareerLevel"),
                    oCurrentProject = oView.byId("cbCurrentProject");

                var sEmployeeID = this.getEmployeeID(oFirstName.getValue(), oLastName.getValue()).trim();

                var oData = {
                    "EmployeeID": sEmployeeID,
                    "FirstName": oFirstName.getValue(),
                    "LastName": oLastName.getValue(),
                    "Age": oAge.getValue(),
                    "DateHire": new Date(oDateHire.getValue()),
                    "CareerLevel": oCareerLevel.getSelectedKey(),
                    "CurrentProject": oCurrentProject.getSelectedKey(),
                };

                oModel.create("/Employee", oData, {
                    success: function () {
                        MessageToast.show("Employee has been created.");
                    },

                    error: function () {
                        MessageToast.show("Failed to create employee.");
                    }
                });

                this.getRouter().navTo("RouteEmployeeList");
            },

            onNavBack: function () {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash && sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("RouteEmployeeList");
                }
            },

            onInputChange: function (oEvent) {
                var oModel = this.getOwnerComponent().getModel("EmployeesList");

                var oInput = oEvent.getSource(),
                    sText = oInput.getValue();

                if (sText.length === 0) {
                    oInput.setValueState(ValueState.Error);
                } else {
                    oInput.setValueState(ValueState.None);
                }

                if (oInput.getId().includes('iAge')) {
                    var age = parseInt(oInput.getValue());
                    if (age < 0 || age > 90) {
                        oInput.setValue("");
                        oInput.setValueState(ValueState.Error);
                        MessageBox.warning("Age cannot be less than 0 and greater than 90.");
                    }
                }

                if (oInput.getId().includes('dpDateHire')) {
                    var dateToday = new Date();
                    if (new Date(oInput.getValue()) > dateToday) {
                        oInput.setValue("");
                        oInput.setValueState(ValueState.Error);
                        MessageBox.warning("You cannot input future dates.");
                    }
                }

                if (oInput.getId().includes('cbCareerLevel')) {
                    // @ts-ignore
                    oModel.read("/CareerList(CareerID='" + oInput.getSelectedKey() + "')", {
                        success: function (oCareer) {},
                        error: function () {
                            oInput.setValue("");
                            oInput.setValueState(ValueState.Error);
                            MessageBox.warning("Valid entries from the list only.");
                        }
                    });
                }

                if (oInput.getId().includes('cbCurrentProject')) {
                    // @ts-ignore
                    oModel.read("/ProjectList(ProjectID='" + oInput.getSelectedKey() + "')", {
                        success: function (oCareer) {},

                        error: function () {
                            oInput.setValue("");
                            oInput.setValueState(ValueState.Error);
                            MessageBox.warning("Valid entries from the list only.");
                        }
                    });
                }
            },

            fnCheckValidation: function (oView) {
                var oFirstName = oView.byId("iFirstName");
                oFirstName.attachBrowserEvent("keypress", function (event) {
                    var inputValue = event.which;
                    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
                        event.preventDefault();
                    }
                });

                var oLastName = oView.byId("iLastName");
                oLastName.attachBrowserEvent("keypress", function (event) {
                    var inputValue = event.which;
                    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
                        event.preventDefault();
                    }
                });

                var oAge = oView.byId("iAge");
                oAge.attachBrowserEvent("keypress", function (event) {
                    var keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 0, 8];
                    if (!($.inArray(event.which, keyCodes) >= 0)) {
                        event.preventDefault();
                    }
                });
            },

            getEmployeeID: function (firstName, lastName) {
                var dateToday = new Date();
                return "EMPID" + firstName.toUpperCase() + lastName.toUpperCase() + dateToday.getDate() + dateToday.getMonth() + 1;
            },

            getRouter: function () {
                return sap.ui.core.UIComponent.getRouterFor(this);
            }

        });
    });