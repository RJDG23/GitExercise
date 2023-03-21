sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/ui/core/ValueState",
        "sap/m/MessageBox"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, ValueState, MessageBox) {
        "use strict";

        return Controller.extend("sapips.training.routingandnavigationexercise.controller.Overview", {
            onInit: function (){

            },
            //Triggered whenever an Input has been changed
            //oEvent - Event instance
            onInputChange: function (oEvent) {
                var oInput = oEvent.getSource(),
                    sText = oInput.getValue();

                if (sText.length === 0) {
                    oInput.setValueState(ValueState.Error);
                } else {
                    oInput.setValueState(ValueState.None);
                }
            },

            //Triggered when the button is pressed
            //
            //oEvent - Event instance
            onPress: function () {
                var oView = this.getView(),
                    oResourceBundle = oView.getModel("i18n").getResourceBundle(),
                    oInput1 = oView.byId("idInput1"),
                    oInput2 = oView.byId("idInput2");

                //Check if Input fields have values
                this.fnCheckFields(oInput1, oInput2);

                //Send error message if at least one of the input fields have error. Navigate if none have errors.
                if (oInput1.getValueState() === ValueState.Error || oInput2.getValueState() === ValueState.Error) {
                    MessageBox.error(oResourceBundle.getText("ErrorMessage"));
                } else {
                    this.fnNavigateToDetailPage(oInput1.getValue(), oInput2.getValue());
                }
            },

            //Checks if values in Input fields are valid
            //oInput1 - Input object
            //oInput1 - Input Object
            fnCheckFields: function (oInput1, oInput2) {
                var sData1 = oInput1.getValue(),
                    sData2 = oInput2.getValue();

                //Check if Input fields have values
                if (!sData1 && sData2) {
                    oInput1.setValueState(ValueState.Error);
                    oInput2.setValueState(ValueState.None);

                } else if (sData1 && !sData2) {
                    oInput1.setValueState(ValueState.None);
                    oInput2.setValueState(ValueState.Error);

                } else if (!sData1 && !sData2) {
                    oInput1.setValueState(ValueState.Error);
                    oInput2.setValueState(ValueState.Error);
                }
            },

            //Triggers navigation and passes parameters
            //sData1 - 1st parameter passed for navigation
            //sData2 - 2nd parameter passed for navigation
            fnNavigateToDetailPage: function (sData1, sData2) {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("Detail", {
                    Param1: sData1,
                    Param2: sData2
                });
            }
        });
    });