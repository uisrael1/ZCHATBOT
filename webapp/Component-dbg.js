/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "zchatbot/model/models"
],
function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("zchatbot.Component", {
        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Initialize OData model
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/scwm/WI_INTEGRATION_SRV/");
            this.setModel(oModel);

            // set the device model
            // this.setModel(models.createDeviceModel(), "device");

            // Create the CAI Webclient Script
            var script = document.createElement("script");
            script.src = "https://cdn.cai.tools.sap/webclient/bootstrap.js";
            script.setAttribute("data-channel-id", "bcacaa43-3e97-4928-bcce-abbf68731012");
            script.setAttribute("data-token", "7de4d5a0cb5b6a3cc0fb0c65ca48d256");
            script.setAttribute("data-expander-type", "CAI");
            script.setAttribute("data-expander-preferences", 'JTdCJTIyYWNjZW50Q29sb3IlMjIlM0ElMjIlMjMwZjAwYTAlMjIlMkMlMjJiYWNrZ3JvdW5kQ29sb3IlMjIlM0ElMjIlMjNjN2NjZjElMjIlMkMlMjJjb21wbGVtZW50YXJ5Q29sb3IlMjIlM0ElMjIlMjNmZWZlZmUlMjIlMkMlMjJleHBhbmRlckxvZ28lMjIlM0ElMjJodHRwcyUzQSUyRiUyRmxvZ29kaXguY29tJTJGbG9nbyUyRjIxNDE2NTcuanBnJTIyJTJDJTIyZXhwYW5kZXJUaXRsZSUyMiUzQSUyMiUyMiUyQyUyMm9uYm9hcmRpbmdNZXNzYWdlJTIyJTNBJTIySGVyZSUyMHRvJTIwQXNzaXN0JTIyJTJDJTIyb3BlbmluZ1R5cGUlMjIlM0ElMjJuZXZlciUyMiUyQyUyMnRoZW1lJTIyJTNBJTIyQ1VTVE9NJTIyJTdE');
            script.id = "cai-webclient-custom";
            document.head.appendChild(script);

            // enable routing
            this.getRouter().initialize();

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
        }
    });
}
);