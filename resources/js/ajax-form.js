/* global App, NProgress */

function appAlert(message, status) {
    var container = ".page-content";
    var place = "prepend";
    status = (status !== 'undefined') ? status : 'danger';
    App.alert({
        type: status,
        icon: status,
        message: message,
        container: container,
        place: place
    });
}
function validation_check(data) {
    if (data.validation) {
        appAlert("Validation error found", "danger");
        var errors = data.errors;
        for (var field in errors) {
            var group = $(".has-error-" + field);
            if (group.length) {
                if (group.children(".help-block").length) {
                    group.children(".help-block").remove();
                }
                if (!group.hasClass("has-error")) {
                    group.addClass("has-error");
                }
                group.append("<span class='help-block'><strong>" + errors[field][0] + "</strong></span>");
            }
        }
    }
}

function sms_records(data) {
    if (data.success) {
        appAlert(data.message, 'success');
        if(window.grid) {
            window.grid.getDataTable().ajax.reload();
        }
    }else {
        appAlert(data.message, 'danger');
    }
}

function form_response(data) {
    if (data.success) {
        $(".has-error").children(".help-block").remove();
        $(".has-error").removeClass("has-error");
        appAlert(data.message, 'success');
        if (data.results !== undefined) {
            if (data.results.redirect_to !== undefined) {
                window.location = data.results.redirect_to;
            }
        }
    } else if(data.validation) {
        validation_check(data);
    }else {
        appAlert(data.message, 'danger');
    }
}

function getEmployees(data) {
    console.log(data);
    var option_html = "<option value=''>-- Select Employee --</option>";
    $.each(data.results, function (key, option) {
        option_html += "<option value='" + option.id + "'>" + option.name + "</option>";
    });
    $("#employee_id").next(".select2").remove();
    $("#employee_id").html(option_html);
    $('#employee_id').select2();
}

function ajaxRequest(action, method, form_data, response_type) {
    NProgress.start();
    $.ajax({
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = parseInt(evt.loaded / evt.total);
                    NProgress.set(percentComplete);
                }
            }, false);
            return xhr;
        },
        url: action,
        type: method,
        data: form_data,
        cache: false,
        contentType: false,
        processData: false
    }).done(function (data) {
        switch (response_type) {
            case "form_response":
                form_response(data);
                break;

            case "sms_records":
                sms_records(data);
                break;

            case "getEmployees":
                getEmployees(data);
                break;

            case "getPurposes":
                getPurposes(data);
                break;

            default:
                appAlert("Response type failed!", "danger");
        }
    }).fail(function () {
        appAlert("Something wrong happened", "danger");
    }).always(function () {
        NProgress.done();
    });
}


$("#ajax-form").on("submit", function (e) {
    e.preventDefault();
    var form_data = new FormData(this),
        action = $('input[name="action"]').val(),
        method = $('input[name="method"]').val(),
        response_type = "form_response";
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    ajaxRequest(action, method, form_data, response_type);
});

$(".load-sms-records").on("click", function (e) {
    e.preventDefault();
        var form_data = "",
        action = $(this).data("action"),
        method = "get",
        response_type = "sms_records";
    ajaxRequest(action, method, form_data, response_type);
});

$(document).ready(function(){
    $("#company_id").on("change", function() {
        var department = $("#company_id").val();
        if($("#employee_id").length) {
            var action = $('input[name="sub-action"]').val() + "/companies/" + department + "/employees",
                method = 'get',
                form_data = "",
                response_type = "getEmployees";
            ajaxRequest(action, method, form_data, response_type);
        }
    });

});
