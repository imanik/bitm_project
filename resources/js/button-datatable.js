/* global App */

function button_datatable(grid, table, ajax_url) {
//    table.dataTable().fnDestroy();

    $(".date-picker").datepicker({autoclose:!0});

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    grid.init({
        src: table,
        onSuccess: function (grid, response) {
            // grid:        grid object
            // response:    json object of server side ajax response
            // execute some code after table records loaded
        },
        onError: function (grid) {
            // execute some code on network or other general error
        },
        onDataLoad: function (grid) {
            // execute some code on ajax data load
        },
        loadingMessage: 'Loading...',
        dataTable: {// here you can define a typical datatable settings from http://datatables.net/usage/options

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/scripts/datatable.js).
            // So when dropdowns used the scrollable div should be removed.

//            "dom": "<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'pli><'col-md-4 col-sm-12'>>",

            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.

            "lengthMenu": [
                [10, 20, 50, 100, 150, -1],
                [10, 20, 50, 100, 150, "All"] // change per page values here
            ],
            "pageLength": 10, // default record count per page
            "ajax": {
                "url": ajax_url
            },
            "order": [
                [1, "asc"]
            ], // set first column as a default sort by asc

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            buttons: [
                {extend: 'print', className: 'btn default'},
                {extend: 'copy', className: 'btn default'},
                {extend: 'pdf', className: 'btn default'},
                {extend: 'excel', className: 'btn default'},
                {extend: 'csv', className: 'btn default'},
                {
                    text: 'Reload',
                    className: 'btn default',
                    action: function (e, dt, node, config) {
                        dt.ajax.reload();
                        alert('Datatable reloaded!');
                    }
                }
            ]
        }
    });

    // handle group actionsubmit button click
    grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
        e.preventDefault();
        var action = $(".table-group-action-input", grid.getTableWrapper());
        if (action.val() !== "" && grid.getSelectedRowsCount() > 0) {
            grid.setAjaxParam("customActionType", "group_action");
            grid.setAjaxParam("customActionName", action.val());
            grid.setAjaxParam("id", grid.getSelectedRows());
            grid.getDataTable().ajax.reload();
            grid.clearAjaxParams();
        } else if (action.val() === "") {
            App.alert({
                type: 'danger',
                icon: 'warning',
                message: 'Please select an action',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        } else if (grid.getSelectedRowsCount() === 0) {
            App.alert({
                type: 'danger',
                icon: 'warning',
                message: 'No record selected',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        }
    });

    // handle table row delete button
    grid.getTableWrapper().on('click', '.table-row-delete', function (e) {
        e.preventDefault();
        var record_id = $(this).data('id');
        if (record_id) {
            var action = confirm("Do you want to delete this?");
            if (action) {
                grid.setAjaxParam("actionType", "delete_action");
                grid.setAjaxParam("record_id", record_id);
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            }
        }
    });

    // handle table row delete button
    grid.getTableWrapper().on('click', '.table-row-resend', function (e) {
        e.preventDefault();
        var record_id = $(this).data('id');
        if (record_id) {
            var action = confirm("Do you want to resend this message?");
            if (action) {
                grid.setAjaxParam("actionType", "resend_action");
                grid.setAjaxParam("record_id", record_id);
                grid.getDataTable().ajax.reload();
                grid.clearAjaxParams();
            }
        }
    });

    //grid.setAjaxParam("customActionType", "group_action");
    //grid.getDataTable().ajax.reload();
    //grid.clearAjaxParams();

    // handle datatable custom tools
    $('#datatable_ajax_tools > li > a.tool-action').on('click', function () {
        var action = $(this).attr('data-action');
        grid.getDataTable().button(action).trigger();
    });
}
$(document).ready(function () {
    if ($("#table_ajax_datatable").length && $("#table_ajax_url").length) {
        var table = $("#table_ajax_datatable");
        var ajax_url = $("#table_ajax_url").val();
        window.grid = new Datatable();
        button_datatable(window.grid, table, ajax_url);
    }
});
