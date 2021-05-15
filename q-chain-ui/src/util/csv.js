/* global window */
/* eslint-disable max-len */
import Papa from 'papaparse';
import {saveAs} from 'file-saver';

export default class CsvService {
    static downloadFieldDataCSV(data, filename = 'data') {
        let workedData;

        const csv = Papa.unparse(workedData, {quotes: false, delimiter: ';'});
        saveAs(new window.Blob([csv], {type: 'text/csv;charset=utf-8'}), `${filename}.csv`);
    }
}
