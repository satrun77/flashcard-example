@extends('layouts.base')

@section('body')
    <admin-form
            card-action="{{ route('save-card') }}"
            category-action="{{ route('save-category') }}"
    ></admin-form>
@stop

@section('toolbar-buttons')
    <v-spacer></v-spacer>

    @guest
        <v-btn href="{{ route('login') }}">{{ __('Login') }}</v-btn>
    @else
        <v-chip color="primary" text-color="white">
            <v-avatar>
                <v-icon>account_circle</v-icon>
            </v-avatar>
            {{ Auth::user()->name }}
        </v-chip>

        <v-btn flat type="button" onclick="document.getElementById('logout-form').submit();">{{ __('Logout') }}</v-btn>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
    @endguest
@stop

@section('toolbar-navigation')
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
@stop

@section('navigation')
    <v-navigation-drawer
            v-model="drawer"
            clipped
            fixed
            app
    >
        <admin-list></admin-list>
    </v-navigation-drawer>
@stop
