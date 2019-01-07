@extends('layouts.app')

@section('content')
    <div class="container">
        @include('inc.messages')
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <div class="card">
                    <div class="card-header bg-info text-white">
                        <strong>Password</strong>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('analyzer.store') }}" method="POST">
                            @csrf
                            <div class="form-group has-feedback">
                                <label for="password"></label>
                                <input type="password" name="password" id="password" class="form-control" placeholder="Enter Password" aria-describedby="meter">
                                <span class="fa fa-fw fa-eye" id="toggle-password"></span>
                                <small id="meter" class="text-muted">
                                    <hr class="bg-danger"/><hr class="bg-danger"/>
                                    <hr class="bg-danger"/><hr class="bg-danger"/>
                                    <span class="float-right text-danger" id="result">Weak</span>
                                </small>
                            </div>
                            <button type="submit" class="btn btn-primary float-right" id="submit" disabled>Save</button>
                        </form>
                    </div>
                    <div class="card-footer">
                        <div class="form-group" id="message">
                            <small>
                            <p>Password must contain the following:</p>
                            <ul style="list-style:none">
                                <li id="letter" class="invalid">A <b>lowercase</b> letter</li>
                                <li id="capital" class="invalid">A <b>capital (uppercase)</b> letter</li>
                                <li id="number" class="invalid">A <b>number</b> or <b>symbols</b></li>
                                <li id="length" class="invalid">Minimum <b>8 characters</b></li>
                            </ul>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection