@extends('layouts.base')

@section('body')
    <login-form method="post" action="{{ route('login') }}">
        @csrf
    </login-form>
@endsection
