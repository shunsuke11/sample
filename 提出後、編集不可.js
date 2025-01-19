(function () {
    'use strict';
    kv.events.record.mounted = [function (state) {
        if (state.record.submission.value == '本部提出') {
            document.getElementsByClassName('kv-fb-content')[0].style.display = 'none';
        }
    }];
})();