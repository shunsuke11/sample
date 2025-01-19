/* テーブルの内容を日付で並び替えする */

(function() {
    "use strict";

    const TABLE_FIELD_CODE = 'foods';  // テーブルフィールドのフィールドコード
    const DATE_FIELD_CODE  = 'order';    // 数値フィールドのフィールドコード（テーブル内）
    const SORT_ORDER = { ASCENDING: '昇順', DESCENDING: '降順' };

    const INITIAL_SORT_ORDER = SORT_ORDER.ASCENDING;  // ここで昇順か降順を選択

    function sortTable(record) {
        // テーブルの要素を数値フィールドの昇順または降順でソート
        if (record[TABLE_FIELD_CODE] && record[TABLE_FIELD_CODE].value) {
            record[TABLE_FIELD_CODE].value.sort(function(a, b) {
                let dateA = new Date(a.value[DATE_FIELD_CODE].value);
                let dateB = new Date(b.value[DATE_FIELD_CODE].value);
                return INITIAL_SORT_ORDER === SORT_ORDER.ASCENDING ? dateA - dateB : dateB - dateA;
            });
        }
        return record;
    }

    fb.events.form.mounted = [function(event) {
        let record = sortTable(event.record);
        return { record: record };
    }];

    fb.events.form.submit = [function(event) {
        let record = sortTable(event.record);
        return { record: record };
    }];
})();
