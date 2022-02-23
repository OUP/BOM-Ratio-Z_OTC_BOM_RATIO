sap.ui.define([], function () {
  "use strict";

  let _sIdPrefix;
  let _oPvalTable;
  let _oFvalTable;
  let _oAllTable;
  let _oPedTable;

  const oController = {
    onInit: function () {
      _sIdPrefix =
        "oup.otc.zotcbomratio::sap.suite.ui.generic.template.ObjectPage.view.Details::ZOTC_C_VALUE_SIMULATION--";

      // grid table
      _oPvalTable = this.byId(
        _sIdPrefix + "to_pval::com.sap.vocabularies.UI.v1.LineItem::gridTable"
      );
      _oFvalTable = this.byId(
        _sIdPrefix + "to_fval::com.sap.vocabularies.UI.v1.LineItem::gridTable"
      );
      _oAllTable = this.byId(
        _sIdPrefix + "to_all::com.sap.vocabularies.UI.v1.LineItem::gridTable"
      );
      _oPedTable = this.byId(
        _sIdPrefix + "to_ped::com.sap.vocabularies.UI.v1.LineItem::gridTable"
      );
    },

    onAfterRendering: function () {
      _oPvalTable.attachBusyStateChanged(this._onBusyStateChanged);
      _oFvalTable.attachBusyStateChanged(this._onBusyStateChanged);
      _oAllTable.attachBusyStateChanged(this._onBusyStateChanged);
      _oPedTable.attachBusyStateChanged(this._onBusyStateChanged);

      // destory or remove row action template in product value simulation table
      try {
        _oPvalTable.getRowActionTemplate().destroy();
      } catch (error) {
        // row action template is not available
      }
    },

    /* =========================================================== */
    /* internal methods                                            */
    /* =========================================================== */

    _onBusyStateChanged: function (oEvent) {
      const bBusy = oEvent.getParameter("busy");

      if (!bBusy) {
        const oTable = oEvent.getSource();
        let oTpc = null;

        // grid table
        if (sap.ui.table.TablePointerExtension) {
          oTpc = new sap.ui.table.TablePointerExtension(oTable);
        } else {
          oTpc = new sap.ui.table.extensions.Pointer(oTable);
        }

        // columns
        const aColumns = oTable.getColumns();
        for (let i = aColumns.length; i >= 0; i--) {
          oTpc.doAutoResizeColumn(i);
        }
      }
    },
  };

  return oController;
});
