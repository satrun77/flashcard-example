@extends('layouts.base')

@section('body')
    <card-gallery></card-gallery>
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
        <category-list></category-list>
    </v-navigation-drawer>
@stop
