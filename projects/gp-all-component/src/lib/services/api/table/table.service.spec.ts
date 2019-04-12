import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
    TableService,
    InsertRowRq,
    DeleteRowRq,
    UpdateRowRq,
    SelectOneRowRq,
} from './table.service';
import { GlobalService } from '../../core/global.service';
import { TestBed, async } from '@angular/core/testing';

describe('TableServiceSpec', () => {
    let service: TableService;
    const applicationApiUrl = '/test-app';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GlobalService, TableService],
        }).compileComponents();
    }));

    beforeEach(() => {
        GlobalService.setBaseUrl(applicationApiUrl);
        service = TestBed.get(TableService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should select one row', () => {
        const request = new SelectOneRowRq();
        const tableName = 'table-test';
        const original = 'row-test';
        const url = `${applicationApiUrl}/table_svc/${tableName}/selectOneRow`;
        request.jsonRowToSelect = JSON.stringify(original);

        spyOn(service, 'post').and.callThrough();
        spyOn(GlobalService, 'getBASE_URL').and.callThrough();

        service.selectOneRow(tableName, original).subscribe();

        expect(service.post).toHaveBeenCalledWith(url, request);
        expect(GlobalService.getBASE_URL).toHaveBeenCalled();
    });

    it('should update row', () => {
        const request = new UpdateRowRq();
        const tableName = 'table-test';
        const original = 'row-test';
        const mod = 'mod';
        const url = `${applicationApiUrl}/table_svc/${tableName}/updateRow`;
        request.jsonOriginalRow = JSON.stringify(original);
        request.jsonModifiedRow = JSON.stringify(mod);

        spyOn(service, 'post').and.callThrough();
        spyOn(GlobalService, 'getBASE_URL').and.callThrough();

        service.updateRow(tableName, original, mod).subscribe();

        expect(service.post).toHaveBeenCalledWith(url, request);
        expect(GlobalService.getBASE_URL).toHaveBeenCalled();
    });

    it('should delete row', () => {
        const request = new DeleteRowRq();
        const tableName = 'table-test';
        const original = 'row-test';
        const url = `${applicationApiUrl}/table_svc/${tableName}/deleteRow`;
        request.jsonOriginalRow = JSON.stringify(original);

        spyOn(service, 'post').and.callThrough();
        spyOn(GlobalService, 'getBASE_URL').and.callThrough();

        service.deleteRow(tableName, original).subscribe();

        expect(service.post).toHaveBeenCalledWith(url, request);
        expect(GlobalService.getBASE_URL).toHaveBeenCalled();
    });

    it('should insert row', () => {
        const request = new InsertRowRq();
        const tableName = 'table-test';
        const original = 'row-test';
        const url = `${applicationApiUrl}/table_svc/${tableName}/insertRow`;
        request.jsonNewRow = JSON.stringify(original);

        spyOn(service, 'post').and.callThrough();
        spyOn(GlobalService, 'getBASE_URL').and.callThrough();

        service.insertRow(tableName, original).subscribe();

        expect(service.post).toHaveBeenCalledWith(url, request);
        expect(GlobalService.getBASE_URL).toHaveBeenCalled();
    });
});
