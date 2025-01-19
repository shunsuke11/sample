(function () {
    "use strict";

    function clearZeroValues() {
        const fields = [
            '[data-vv-name^="foods-"][data-vv-name$="this_month_receiving_stock"] input',
            '[data-vv-name^="foods-"][data-vv-name$="this_month_issue"] input',
            '[data-vv-name^="foods-"][data-vv-name$="transfer"] input',
            '[data-vv-name^="foods-"][data-vv-name$="disposal"] input',
            '[data-vv-name^="foods-"][data-vv-name$="selling_price"] input',
            '[data-vv-name^="foods-"][data-vv-name$="Purchase_price"] input'
        ];

        fields.forEach(function(selector) {
            const inputs = document.querySelectorAll(selector);
            inputs.forEach(function(input) {
                if (input.value === "0") {
                    input.value = "";
                }
            });
        });
        setupInputListeners();  // 入力リスナーの設定。
    }

    function setupInputListeners() {
        const inputs = document.querySelectorAll('[data-vv-name^="foods-"] input');
        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                if (input.value === "0") {
                    input.value = "";
                }
            });
        });
    }

    fb.events.form.mounted = [function (state) {
        setTimeout(clearZeroValues, 1000);  // 初回ロード時に実行
        
        // サブテーブルのtbodyを監視
        const target = fb.getElementByCode('foods').getElementsByTagName('tbody')[0];
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    setTimeout(clearZeroValues, 300);  // 遅延を長くしてDOMの更新を待つ
                }
            });
        });
        const config = { childList: true };
        observer.observe(target, config);  // 監視開始

        return state;
    }];
})();
