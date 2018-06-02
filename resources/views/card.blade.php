@extends('layouts.base')

@section('meta_description'){{ $card->meta_description }}@stop

@section('body')
    <card :card="{{ $card->toJson() }}" :in-gallery="false"></card>
@stop
