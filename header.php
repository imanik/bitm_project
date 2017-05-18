<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner ">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a href="{{url('/')}}">
                <img src="{{ asset('img/logo.png')}}" alt="logo" class="logo-default"/>
            </a>

            <div class="menu-toggler sidebar-toggler">
                <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
            </div>

        </div>
        <!-- END LOGO -->
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
        <!-- END RESPONSIVE MENU TOGGLER -->
        <!-- BEGIN PAGE TOP -->
        <div class="page-top">
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="top-menu">
                <ul class="nav navbar-nav pull-right">

                    <li class="separator hide"> </li>
                    <li class="dropdown dropdown-extended dropdown-inbox dropdown-dark">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">
                            <i class="icon-user"></i>
                            <span class="font-grey-salsa"> Hi  </span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-default">
                            <li>
                                <a href="javascript:;" class="load-sms-records" data-action="{{url('api/sms/reports')}}">
                                    <span class="details">
                                        <span class="label label-sm label-icon label-primary">
                                            <i class="fa fa-cloud-download"></i>
                                        </span>
                                        <span>Use Delivery Reports</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;" class="load-sms-records" data-action="{{url('api/sms/logs')}}">
                                    <span class="details">
                                        <span class="label label-sm label-icon label-success">
                                            <i class="fa fa-cloud"></i>
                                        </span>
                                        <span>Use Logs</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <span class="details">
                                        <span class="label label-sm label-icon label-danger">
                                            <i class="fa fa-sign-out"></i>
                                        </span>
                                        <span>Logout</span>
                                    </span>
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    
                                </form>
                            </li>
                        </ul>
                    </li>
                    <li class="separator hide"> </li>

                </ul>
            </div>
        </div>
        <!-- END PAGE TOP -->
    </div>

    <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
