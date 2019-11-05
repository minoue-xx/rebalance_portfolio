function updateVirtual() {


    let price = [];
    $(".price").each(function (index) {
        price.push(parseFloat($(this).val()));
    });

    let qty = [];
    $(".qty").each(function (index) {
        qty.push(parseFloat($(this).val()));
    });

    let qty2add = [];
    $(".qty2add").each(function (index) {
        qty2add.push(parseFloat($(this).val()));
    });

    let totcost = 0;
    $(".cost").each(function (index) {
        tmp = qty2add[index] * price[index];
        $(this).val(tmp);
        totcost += tmp;
    });
    $('.totcost').val(totcost.toFixed(2));

    $(".subtot_v").each(function (index) {
        tmp = (qty2add[index] + qty[index]) * price[index];
        $(this).val(tmp);
    });

    let grandTotal = 0;
    $(".subtot_v").each(function () {
        let stval = parseFloat($(this).val());
        grandTotal += isNaN(stval) ? 0 : stval;
    });
    $('.grdtot_v').val(grandTotal.toFixed(2));


    let ratio = [];
    $(".subtot_v").each(function (index) {
        let stval = parseFloat($(this).val());
        subTotal = isNaN(stval) ? 0 : stval;
        ratio.push(subTotal / grandTotal * 100);
    });

    let totactual = 0;
    $(".actual_v").each(function (index) {
        $(this).val(ratio[index].toFixed(2));
        let stval = parseFloat($(this).val());
        totactual += ratio[index];
    });

    let tottarget = 0;
    let ratiodiff = ratio;
    $(".target_v").each(function (index) {
        let stval = parseFloat($(this).val());
        tottarget += isNaN(stval) ? 0 : stval;
        ratiodiff[index] = ratio[index] - stval;
    });
    if (tottarget != 100) {
        alert('Target% does not add up to 100%');
    }

    let totdiff = 0;
    $(".diff_v").each(function (index) {
        tmp = ratiodiff[index];
        $(this).val(tmp.toFixed(2));
        totdiff += Math.pow(tmp, 2);
    });

    $('.totactual_v').val(totactual.toFixed(2));
    $('.tottarget_v').val(tottarget.toFixed(2));
    $('.grddiff_v').val(totdiff.toFixed(2));


}


function updateGrdTotal() {

    let grandTotal = 0;
    $(".subtot").each(function () {
        let stval = parseFloat($(this).val());
        grandTotal += isNaN(stval) ? 0 : stval;
    });

    $('.grdtot').val(grandTotal.toFixed(2));


}

function updateActual() {


    let totactual = 0;
    let tottarget = 0;
    let totdiff = 0;

    let grdtotal = $('.grdtot').val();

    let ratio = [];
    $(".subtot").each(function (index) {
        let stval = parseFloat($(this).val());
        subTotal = isNaN(stval) ? 0 : stval;
        ratio.push(subTotal / grdtotal * 100);
    });


    $(".actual").each(function (index) {
        $(this).val(ratio[index].toFixed(2));
        let stval = parseFloat($(this).val());
        totactual += ratio[index];
    });

    let ratiodiff = ratio;
    $(".target").each(function (index) {
        let stval = parseFloat($(this).val());
        tottarget += isNaN(stval) ? 0 : stval;
        ratiodiff[index] = ratio[index] - stval;
    });
    if (tottarget != 100) {
        alert('Target% does not add up to 100%');
    }

    $(".diff").each(function (index) {
        tmp = ratiodiff[index];
        $(this).val(tmp.toFixed(2));
        totdiff += Math.pow(tmp, 2);
    });

    $('.totactual').val(totactual.toFixed(2));
    $('.tottarget').val(tottarget.toFixed(2));
    $('.grddiff').val(totdiff.toFixed(2));

}

function hogehoge_target($tblrow) {

    alert('target change detected');
    newFunction(); // WHY??

    function newFunction() {
        updateActual();
    }
}

function hogehoge_qty($tblrow) {

    alert('qty change detected');
    let qty = $tblrow.find(".qty").val();
    let price = $tblrow.find(".price").val();
    let subTotal = parseInt(qty, 10) * parseFloat(price);
    if (!isNaN(subTotal)) {

        $tblrow.find('.subtot').val(subTotal.toFixed(2));
        updateGrdTotal();
        updateActual();

    } else {
        $tblrow.find('.subtot').val('NaN');
        $('.grdtot').val('NaN');
    }

    alert('subtotal and grdtotal updated');

}

function hogehoge_ticker($tblrow) {
    alert('ticker change detected');
    let qty = $tblrow.find(".qty").val();
    if (qty == "") {
        $tblrow.find(".qty").val(1);
        qty = 1;
    }
    let price = $tblrow.find(".price").val();
    let subTotal = parseInt(qty, 10) * parseFloat(price);
    let ticker = $tblrow.find(".ticker").val();

    let url = "https://financialmodelingprep.com/api/company/real-time-price/" + ticker + "?datatype=json";

    $.getJSON(url, function (data) {

        let price = data.price;
        if (price) {

            console.log(price.toString());
            $tblrow.find('.price').val(price.toFixed(2));

            let subTotal = parseInt(qty, 10) * parseFloat(price);

            if (!isNaN(subTotal)) {

                $tblrow.find('.subtot').val(subTotal.toFixed(2));
                updateGrdTotal();
                updateActual();
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
    let $tblrows = $("#tblCurrent tbody tr");
    $tblrows.each(function (index) {
        let $tblrow = $(this);

        $tblrow.find('.qty').on('change', function () {
            hogehoge_qty($tblrow);
        });
        $tblrow.find('.ticker').on('change', function () {
            hogehoge_ticker($tblrow);
        });
        $tblrow.find('.target').on('change', function () {
            hogehoge_target($tblrow);
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
    $tblrow.find('.target').on('change', function () {
        hogehoge_target($tblrow);
    });
};

function updateQuotes() {
    $('.price, .subtot, .actual, .diff, .grdtot').prop('readonly', true);
    let $tblrows = $("#tblCurrent tbody tr");

    $tblrows.each(function (index) {
        let $tblrow = $(this);

        const ticker = $tblrow.find(".ticker").val();
        const qty = $tblrow.find(".qty").val();

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

