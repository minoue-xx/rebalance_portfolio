function updateGrdTotal() {

    var curr = parseFloat($('.grdtot').val());
    var grandTotal = 0;
    $(".subtot").each(function () {
        var stval = parseFloat($(this).val());
        grandTotal += isNaN(stval) ? 0 : stval;
    });

    $('.grdtot').val(grandTotal.toFixed(2));


}

function updateActual() {


    var totactual = 0;
    var tottarget = 0;
    var totdiff = 0;

    var grdtotal = $('.grdtot').val();

    let ratio = [];
    $(".subtot").each(function (index) {
        var stval = parseFloat($(this).val());
        subTotal = isNaN(stval) ? 0 : stval;
        ratio.push(subTotal / grdtotal * 100);
    });


    $(".actual").each(function (index) {
        $(this).val(ratio[index].toFixed(2));
        var stval = parseFloat($(this).val());
        totactual += ratio[index];
    });

    let ratiodiff = ratio;
    $(".target").each(function (index) {
        var stval = parseFloat($(this).val());
        tottarget += isNaN(stval) ? 0 : stval;
        ratiodiff[index] = ratio[index] - stval;
    });

    $(".diff").each(function (index) {
        tmp = ratiodiff[index];
        $(this).val(tmp.toFixed(2));
        totdiff += Math.pow(tmp, 2);
    });

    $('.totactual').val(totactual.toFixed(2));
    $('.tottarget').val(tottarget.toFixed(2));
    $('.grddiff').val(totdiff.toFixed(2));

}

function hogehoge_qty($tblrow) {

    alert('qty change detected');
    var qty = $tblrow.find("[name=qty]").val();
    var price = $tblrow.find("[name=price]").val();
    var subTotal = parseInt(qty, 10) * parseFloat(price);
    if (!isNaN(subTotal)) {

        $tblrow.find('.subtot').val(subTotal.toFixed(2));
        updateGrdTotal();
        updateActual();

    } else {
        $tblrow.find('.subtot').val('NaN');
        $('.grdtot').val('NaN');
    }

    alert('subtotal,grdtotal updated');

}

function hogehoge_ticker($tblrow) {
    alert('ticker change detected');
    var qty = $tblrow.find("[name=qty]").val();
    if (qty == "") {
        $tblrow.find("[name=qty]").val(1);
        qty = 1;
    }
    var price = $tblrow.find("[name=price]").val();
    var subTotal = parseInt(qty, 10) * parseFloat(price);
    var ticker = $tblrow.find("[name=ticker]").val();

    var url = "https://financialmodelingprep.com/api/company/real-time-price/" + ticker + "?datatype=json";

    $.getJSON(url, function (data) {

        var price = data.price;
        if (price) {

            console.log(price.toString());
            $tblrow.find('.price').val(price.toFixed(2));

            var subTotal = parseInt(qty, 10) * parseFloat(price);

            if (!isNaN(subTotal)) {

                $tblrow.find('.subtot').val(subTotal.toFixed(2));
                updateGrdTotal();
                updateActual();
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
}

//https://www.dotnetcurry.com/jquery/1189/jquery-table-calculate-sum-all-rows
function updateQuotes_updates() {
    let $tblrows = $("#tblTickers tbody tr");
    $tblrows.each(function (index) {
        var $tblrow = $(this);

        $tblrow.find('.qty').on('change', function () {
            hogehoge_qty($tblrow);
        });
        $tblrow.find('.ticker').on('change', function () {
            hogehoge_ticker($tblrow);
        });
    });
};

function updateQuotes_updatesbyRow($tblrow) {

    $tblrow.find('.qty').on('change', function () {
        hogehoge_qty($tblrow);
    });
    $tblrow.find('.ticker').on('change', function () {
        hogehoge_ticker($tblrow);
    });
};

function updateQuotes() {
    $('.price, .subtot, .actual, .diff, .grdtot').prop('readonly', true);
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
                updateGrdTotal();
                updateActual();
            }
        });

    });
}

