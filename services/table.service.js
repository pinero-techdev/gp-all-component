"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Servicio de acceso a tablas.
 */
var core_1 = require('@angular/core');
var global_service_1 = require("./global.service");
var common_service_1 = require("./common.service");
var ListRs = (function (_super) {
    __extends(ListRs, _super);
    function ListRs() {
        _super.apply(this, arguments);
    }
    return ListRs;
}(common_service_1.CommonRs));
exports.ListRs = ListRs;
var MetadataRs = (function (_super) {
    __extends(MetadataRs, _super);
    function MetadataRs() {
        _super.apply(this, arguments);
    }
    return MetadataRs;
}(common_service_1.CommonRs));
exports.MetadataRs = MetadataRs;
var UpdateRowRq = (function () {
    function UpdateRowRq() {
    }
    return UpdateRowRq;
}());
exports.UpdateRowRq = UpdateRowRq;
var UpdateRowRs = (function (_super) {
    __extends(UpdateRowRs, _super);
    function UpdateRowRs() {
        _super.apply(this, arguments);
    }
    return UpdateRowRs;
}(common_service_1.CommonRs));
exports.UpdateRowRs = UpdateRowRs;
var DeleteRowRq = (function () {
    function DeleteRowRq() {
    }
    return DeleteRowRq;
}());
exports.DeleteRowRq = DeleteRowRq;
var DeleteRowRs = (function (_super) {
    __extends(DeleteRowRs, _super);
    function DeleteRowRs() {
        _super.apply(this, arguments);
    }
    return DeleteRowRs;
}(common_service_1.CommonRs));
exports.DeleteRowRs = DeleteRowRs;
var InsertRowRq = (function () {
    function InsertRowRq() {
    }
    return InsertRowRq;
}());
exports.InsertRowRq = InsertRowRq;
var InsertRowRs = (function (_super) {
    __extends(InsertRowRs, _super);
    function InsertRowRs() {
        _super.apply(this, arguments);
    }
    return InsertRowRs;
}(common_service_1.CommonRs));
exports.InsertRowRs = InsertRowRs;
var SelectOneRowRq = (function () {
    function SelectOneRowRq() {
    }
    return SelectOneRowRq;
}());
exports.SelectOneRowRq = SelectOneRowRq;
var SelectOneRowRs = (function (_super) {
    __extends(SelectOneRowRs, _super);
    function SelectOneRowRs() {
        _super.apply(this, arguments);
    }
    return SelectOneRowRs;
}(common_service_1.CommonRs));
exports.SelectOneRowRs = SelectOneRowRs;
var TableMetadata = (function () {
    function TableMetadata() {
    }
    return TableMetadata;
}());
exports.TableMetadata = TableMetadata;
var FieldMetadata = (function () {
    function FieldMetadata(fieldMaxLength, fieldName, fieldType, id, notNull, readOnly, allowAscii, lengthInTable, restrictions, displayInfo) {
        this.fieldMaxLength = fieldMaxLength;
        this.fieldName = fieldName;
        this.fieldType = fieldType;
        this.id = id;
        this.notNull = notNull;
        this.readOnly = readOnly;
        this.allowAscii = allowAscii;
        this.lengthInTable = lengthInTable;
        this.restrictions = restrictions;
        this.displayInfo = displayInfo;
    }
    return FieldMetadata;
}());
exports.FieldMetadata = FieldMetadata;
var FieldRestriction = (function () {
    function FieldRestriction() {
    }
    return FieldRestriction;
}());
exports.FieldRestriction = FieldRestriction;
var FieldDisplayInfo = (function () {
    function FieldDisplayInfo(fieldLabel, order, displayType, checkedValue, uncheckedValue, options, referencedTable, referencedField, rowsTextArea, fieldDescriptions, textProperties, relatedField, translationInfo) {
        this.fieldLabel = fieldLabel;
        this.order = order;
        this.displayType = displayType;
        this.checkedValue = checkedValue;
        this.uncheckedValue = uncheckedValue;
        this.options = options;
        this.referencedTable = referencedTable;
        this.referencedField = referencedField;
        this.rowsTextArea = rowsTextArea;
        this.fieldDescriptions = fieldDescriptions;
        this.textProperties = textProperties;
        this.relatedField = relatedField;
        this.translationInfo = translationInfo;
    }
    return FieldDisplayInfo;
}());
exports.FieldDisplayInfo = FieldDisplayInfo;
var TranslationInfo = (function () {
    function TranslationInfo() {
        this.keyFields = [];
    }
    return TranslationInfo;
}());
exports.TranslationInfo = TranslationInfo;
var FieldOption = (function () {
    function FieldOption() {
    }
    return FieldOption;
}());
exports.FieldOption = FieldOption;
var TableService = (function (_super) {
    __extends(TableService, _super);
    function TableService(http2) {
        _super.call(this, http2);
        this.http2 = http2;
    }
    /**
     * Llamada para obtener la metadata de una tabla.
     * @returns Json con la sesión del usuario
     */
    TableService.prototype.metadata = function (tableName) {
        return this.serviceRequest(global_service_1.GlobalService.BASE_URL + "/table_svc/" + tableName + "/metadata", {});
    };
    /**
     * Llamada al WS para obtener una lista de registros.
     */
    TableService.prototype.list = function (tableName, retrieveMetadata, ordered, fieldsToOrderBy) {
        var order = true;
        var fieldsToOrder = null;
        if (ordered != null) {
            order = ordered;
        }
        if (fieldsToOrderBy != null) {
            fieldsToOrder = fieldsToOrderBy;
        }
        return this.serviceRequest(global_service_1.GlobalService.BASE_URL + "/table_svc/" + tableName + "/list", { retrieveMetadata: retrieveMetadata,
            ordered: order, fieldsToOrderBy: fieldsToOrder });
    };
    /**
     * Llamada al WS para obtener un registro.
     */
    TableService.prototype.selectOneRow = function (tableName, registro) {
        var rq = new SelectOneRowRq();
        rq.jsonRowToSelect = JSON.stringify(registro);
        console.log(rq);
        return this.serviceRequest(global_service_1.GlobalService.BASE_URL + "/table_svc/" + tableName + "/selectOneRow", rq);
    };
    /**
     * Llamada para actualizar un registro.
     */
    TableService.prototype.updateRow = function (tableName, original, modificado) {
        var rq = new UpdateRowRq();
        rq.jsonOriginalRow = JSON.stringify(original);
        rq.jsonModifiedRow = JSON.stringify(modificado);
        return this.serviceRequest(global_service_1.GlobalService.BASE_URL + "/table_svc/" + tableName + "/updateRow", rq);
    };
    /**
     * Llamada para borrar un registro.
     */
    TableService.prototype.deleteRow = function (tableName, original) {
        var rq = new DeleteRowRq();
        rq.jsonOriginalRow = JSON.stringify(original);
        return this.serviceRequest(global_service_1.GlobalService.BASE_URL + "/table_svc/" + tableName + "/deleteRow", rq);
    };
    /**
     * Llamada para insertar un registro.
     */
    TableService.prototype.insertRow = function (tableName, original) {
        var rq = new InsertRowRq();
        rq.jsonNewRow = JSON.stringify(original);
        return this.serviceRequest(global_service_1.GlobalService.BASE_URL + "/table_svc/" + tableName + "/insertRow", rq);
    };
    TableService.STRING_FIELD_TYPE = "STRING";
    TableService.NUMBER_FIELD_TYPE = "NUMBER";
    TableService.DATE_FIELD_TYPE = "DATE";
    TableService.BOOLEAN_FIELD_TYPE = "BOOLEAN";
    TableService.IMG_DISPLAY_TYPE = "IMG";
    TableService.TEXT_DISPLAY_TYPE = "TEXT";
    TableService.DROPDOWN_DISPLAY_TYPE = "DROPDOWN";
    TableService.DROPDOWN_RELATED_DISPLAY_TYPE = "DROPDOWN_RELATED";
    TableService.CHECKBOX_DISPLAY_TYPE = "CHECKBOX";
    TableService.SWITCH_DISPLAY_TYPE = "SWITCH";
    TableService.CALENDAR_DISPLAY_TYPE = "CALENDAR";
    TableService.HOUR_MINUTE_DISPLAY_TYPE = "HOUR_MINUTE";
    TableService.TEXT_AREA_DISPLAY_TYPE = "TEXT_AREA";
    TableService.WYSIWYG_DISPLAY_TYPE = "WYSIWYG";
    TableService.RESTRICTION_NOT_NULL = "NOT_NULL";
    TableService.RESTRICTION_MAX_LENGTH = "MAX_LENGTH";
    TableService.RESTRICTION_MIN_LENGTH = "MIN_LENGTH";
    TableService.RESTRICTION_MAX_VALUE = "MAX_VALUE";
    TableService.RESTRICTION_MIN_VALUE = "MIN_VALUE";
    TableService.RESTRICTION_LIST_ALLOWED_VALUES = "LIST_ALLOWED_VALUES";
    TableService.TEXT_UPPERCASE = "UPPERCASE";
    TableService.TEXT_TRIM = "TRIM";
    TableService.TEXT_NO_SPACE = "NO_SPACE";
    TableService = __decorate([
        core_1.Injectable()
    ], TableService);
    return TableService;
}(common_service_1.CommonService));
exports.TableService = TableService;
//# sourceMappingURL=table.service.js.map