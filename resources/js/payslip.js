function calculate(){
    var total = 0, grand_total = 0;
    $.each($(".purpose_list_addition .addition"), function (key, option) {
        if(!$(option).is('[disabled=disabled]')) {
            total += parseFloat($(option).val() || 0);
            console.log(total);
        }
    });
    grand_total = total;
    $.each($(".purpose_list_deduction .deduction"), function (key, option) {
        if(!$(option).is('[disabled=disabled]')) {
            grand_total -= parseFloat($(option).val() || 0);
            console.log(grand_total);
        }
    });
    $("#total").val(total);
    $("#grand_total").val(grand_total);

}

function loadDetails() {
    var employee_id = $("#employee_id").val();
    var action = $('input[name="sub-action"]').val() + "/employees/" + employee_id + "/purposes",
        method = 'get',
        form_data = "",
        response_type = "getPurposes";
    ajaxRequest(action, method, form_data, response_type);
}

function getHtmlField(type, key, option) {

    var role_class = (option.role == "plus") ? "addition" : "deduction";
    var role_html = (option.role == "plus") ? "<span class='label font-green-jungle'> + </span>" : "<span class='label font-red'> - </span>";
    var amount = (option.checked) ? 'value="'+ option.amount + '"' : 'disabled="disabled"';
    var checked_mark = (option.checked) ? 'checked="checked"' : '';
    var checkbox = '<div class="mt-checkbox-list">' +
                        '<label class="mt-checkbox mt-checkbox-outline">' +
                            '<input type="checkbox" ' + checked_mark + ' > &nbsp;' +
                            '<span></span>' +
                        '</label>' +
                    '</div>';
    var input_field = '<input  type="number" min="0" name="details['+ option.shortcode +']" class="form-control '+ role_class +'" placeholder="Amount" '+ amount +' >';
    var pupose_title = '<h3 class="uppercase">' +
                            '<a href="javascript:;">'+ option.name +'</a>' +
                        '</h3>';



    var html = '<li class="mt-list-item">' +
        '<div class="list-icon-container">' +
            checkbox +
        '</div>' +
        '<div class="list-datetime">' +
            input_field +
        '</div>' +
        '<div class="list-datetime list-role">' +
            role_html +
        '</div>' +
        '<div class="list-item-content">' +
            pupose_title +
        '</div>' +
    '</li>';
    return html;
}

function getPurposes(data) {

    var html = "", html_plus = "", html_minus = "";
    if($.isArray(data.results)) {
        $.each(data.results, function (key, option) {
            html = getHtmlField("purpose", key, option);
            if(option.role == "plus") {
                html_plus += html;
            }else if(option.role == "minus") {
                html_minus += html;
            }
        });

        $(".purpose_list_addition").html(html_plus);
        $(".purpose_list_deduction").html(html_minus);
        $("#purposes").removeClass("hide");
    }else {
        $("#purposes").addClass("hide");
    }
    calculate();
}

$(document).ready(function(){
    $("#employee_id").on("change", function() {
        loadDetails();
    });

    if($("#employee_id").val()) {
        loadDetails();
    };

    $(".purpose_list_addition,.purpose_list_deduction").on("keyup", "input",function(){
        calculate();
    });

    $(document).on("click", "input[type=checkbox]", function() {
        var purpose_field = $(this).closest(".mt-list-item").children(".list-datetime").children("input");
        if($(this).is(':checked')) {
            purpose_field.removeAttr("disabled");
        } else {
            purpose_field.val(0);
            purpose_field.attr("disabled","disabled");
        }
        calculate();
    });
});
