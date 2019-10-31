function updateQuotes_updates() {
    let $tblrows = $("#tblTickers tbody tr");
    $tblrows.each(function (index) {
        var $tblrow = $(this);

        $tblrow.find('.qty').on('change', function () {

            var qty = $tblrow.find("[name=qty]").val();
            var price = $tblrow.find("[name=price]").val();
            var subTotal = parseInt(qty, 10) * parseFloat(price);
            if (!isNaN(subTotal)) {

                $tblrow.find('.subtot').val(subTotal.toFixed(2));

                var grandTotal = 0;
                $(".subtot").each(function () {
                    var stval = parseFloat($(this).val());
                    grandTotal += isNaN(stval) ? 0 : stval;
                });
                $('.grdtot').val(grandTotal.toFixed(2));
                alert('getJSON request succeeded!');
            } else {
                $tblrow.find('.subtot').val('NaN');
                $('.grdtot').val('NaN');
            }
        });

        $tblrow.find('.ticker').on('change', function () {

            var qty = $tblrow.find("[name=qty]").val();
            var price = $tblrow.find("[name=price]").val();
            var subTotal = parseInt(qty, 10) * parseFloat(price);

            var ticker = $tblrow.find("[name=ticker]").val();
            var qty = $tblrow.find("[name=qty]").val();

            var url = "https://financialmodelingprep.com/api/company/real-time-price/" + ticker + "?datatype=json";

            $.getJSON(url, function (data) {

                var price = data.price;
                if (price) {

                    console.log(price.toString());
                    $tblrow.find('.price').val(price.toFixed(2));

                    var subTotal = parseInt(qty, 10) * parseFloat(price);

                    if (!isNaN(subTotal)) {

                        $tblrow.find('.subtot').val(subTotal.toFixed(2));

                        var grandTotal = 0;
                        $(".subtot").each(function () {
                            var stval = parseFloat($(this).val());
                            grandTotal += isNaN(stval) ? 0 : stval;
                        });
                        $('.grdtot').val(grandTotal.toFixed(2));
                        alert('getJSON request succeeded!');
                    } else {
                        $tblrow.find('.subtot').val('NaN');
                        $('.grdtot').val('NaN');
                    }
                } else {
                    $tblrow.find('.price').val('NaN');
                    $tblrow.find('.subtot').val('NaN');
                    $('.grdtot').val('NaN');
                    alert('getJSON request failed!');
                }
            });
        });
    });
}

function updateQuotes() {
    $('.price, .subtot, .grdtot').prop('readonly', true);
    let $tblrows = $("#tblTickers tbody tr");

    $tblrows.each(function (index) {
        let $tblrow = $(this);

        const ticker = $tblrow.find("[name=ticker]").val();
        const qty = $tblrow.find("[name=qty]").val();

        let url = "https://financialmodelingprep.com/api/company/real-time-price/" + ticker + "?datatype=json";

        $.getJSON(url, function (data) {

            const price = data.price;
            console.log(price.toString());
            $tblrow.find('.price').val(price.toFixed(2));

            const subTotal = parseInt(qty, 10) * parseFloat(price);

            if (!isNaN(subTotal)) {

                $tblrow.find('.subtot').val(subTotal.toFixed(2));

                var grandTotal = 0;
                $(".subtot").each(function () {
                    var stval = parseFloat($(this).val());
                    grandTotal += isNaN(stval) ? 0 : stval;
                });

            }
        });
    });
}