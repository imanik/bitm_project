<!DOCTYPE html>
<html lang="{{ config('app.locale">
    <head>

        <link href="https://fonts.googleapis.com/css?family=Oswald:400,300,700|Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css">
        <link href="resources/vendor/bootstrap-3.3.7/css/bootstrap.css" rel="stylesheet">
        <link href="resources/vendor/font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet">
        <link href="resources/vendor/simple-line-icons/simple-line-icons.min.css" rel="stylesheet">
        <link href="'resources/vendor/nprogress/nprogress.css" rel="stylesheet">

        <link href="resources/vendor/metronic/css/components.css" rel="stylesheet">
        <link href="resources/vendor/metronic/css/plugins.css" rel="stylesheet">
        <link href="resources/vendor/metronic/css/layout.css" rel="stylesheet">
        <link href="resources/vendor/metronic/css/themes/light.css" rel="stylesheet">
            <link href="css/admin-custom.css" rel="stylesheet">


    </head>
    <body class="page-container-bg-solid page-header-fixed page-footer-fixed page-sidebar-closed-hide-logo">
        <?php include_once "header.php"; ?>
        <div class="clearfix"> </div>
        <div class="page-container">
            
            <?php include_once "dashboard.php"; ?>
        </div>
        <?php include_once "footer.php"; ?>
        <script src="'resources/vendor/jquery-2.2.4.min.js" type="text/javascript"></script>
        <script src="resources/vendor/bootstrap-3.3.7/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="resources/vendor/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="resources/vendor/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="resources/vendor/nprogress/nprogress.js')}}" type="text/javascript"></script>
        @yield('script_main')
        <script src="resources/vendor/metronic/js/counterup/jquery.waypoints.min.js" type="text/javascript"></script>
        <script src="resources/vendor/metronic/js/counterup/jquery.counterup.min.js" type="text/javascript"></script>
        <script src="resources/vendor/metronic/js/app.js" type="text/javascript"></script>
        <script src="resources/vendor/metronic/js/layout.js" type="text/javascript"></script>
        <script src="resources/js/ajax-form.js" type="text/javascript"></script>
        @yield('script')
    </body>
</html>
