<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
    <title>@yield('title', 'Moo FlashCard')</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}"/>
    <script type="text/javascript">
        var BASE_URL = '{!! url()->to('/') !!}';
    </script>
    <script src="{{ mix('js/app.js') }}" async></script>
    <meta name="description" content="@yield('meta_description', 'Collection of flash cards containing information about different topics in programming. Knowledge base for information collected on different programming topics.')" />
</head>
<body>
<v-app id="app" light v-cloak>
    @yield('navigation', '')

    @section('toolbar')
        <v-toolbar app fixed  dark color="primary" clipped-left>
            @yield('toolbar-navigation', '')
            <v-toolbar-title>
                <a href="/" class="white--text">
                    @yield('title', 'Moo FlashCard')
                </a>
            </v-toolbar-title>
            @yield('toolbar-buttons', '')
        </v-toolbar>
    @show

    <v-content>
        <v-container fluid>
            @yield('body', '')
        </v-container>
    </v-content>
</v-app>
{{--<div style="width: 100%; height:90px;margin:0px auto;">--}}
    {{--<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>--}}
    {{--<!-- responsive 3 -->--}}
    {{--<ins class="adsbygoogle"--}}
         {{--style="display:block"--}}
         {{--data-ad-client="ca-pub-9615687057922200"--}}
         {{--data-ad-slot="3098647825"--}}
         {{--data-ad-format="auto"></ins>--}}
    {{--<script>--}}
        {{--(adsbygoogle = window.adsbygoogle || []).push({});--}}
    {{--</script>--}}
{{--</div>--}}
</body>
</html>
