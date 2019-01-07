let $password = document.getElementById('password');
let $meter = document.getElementById('meter');
let $message = document.getElementById('message');
let $letter = document.getElementById('letter');
let $capital = document.getElementById('capital');
let $number = document.getElementById('number');
let $length = document.getElementById('length');
let $result = document.getElementById('result')

$password.onfocus = () => {
    $message.style.display = 'block';
    $meter.style.display = 'block';
}

$password.onblur = () => {
    $message.style.display = 'none';
    $meter.style.display = 'none';
}

$password.onkeypress = (event) => (event.keyCode == 32) ? event.preventDefault() : '';

$password.onkeyup = () => {
    (
        this.validateAlphaNumeric($letter, /[a-z]/g) & // checker for lowercase
        this.validateAlphaNumeric($capital, /[A-Z]/g) & // checker for uppercase
        this.validateAlphaNumeric($number, /[0-9!@#$%^&*]/g) & // checker for numeric and symbols
        this.validateLength($length, 8) // checker for length
    ) ?
    document.getElementById('submit').removeAttribute('disabled'):
        document.getElementById('submit').setAttribute('disabled', 'true');

    this.measurePasswordStrength();
    this.checkDuplicateEntry();
}

// Ajax Post Request to check if the input is already existing
function checkDuplicateEntry() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (JSON.parse(this.responseText).result) {
                $result.innerText = 'Duplicate Entry';
                $result.classList.remove('text-success');
                $result.classList.add('text-danger');
                const boxes = document.getElementsByTagName('hr');
                for (let i = 0; i < boxes.length; i++) {
                    boxes[i].classList.remove('bg-success');
                    boxes[i].classList.add('bg-danger');
                }
            }

        }
    };

    xhttp.open('POST', '/analyzer/check-duplicate', true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', document.getElementsByName('csrf-token')[0].getAttribute('content'));
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`password=${$password.value}`);
}

// Change the status of the boxes and text that shows the strength of the input
function measurePasswordStrength() {
    const boxes = document.getElementsByTagName('hr');
    for (let i = 0; i < boxes.length; i++) {
        if (i < this.getCounter()) {
            boxes[i].classList.remove('bg-danger');
            boxes[i].classList.add('bg-success');
        } else {
            boxes[i].classList.remove('bg-success');
            boxes[i].classList.add('bg-danger');
        }
    }
}

// return the number of valid inputs
function getCounter() {
    var counter = 0;

    if ($letter.classList.contains('valid'))
        counter++;

    if ($capital.classList.contains('valid'))
        counter++;

    if ($number.classList.contains('valid'))
        counter++;

    if ($length.classList.contains('valid'))
        counter++;

    this.changeResultText(counter);

    return counter;
}

// Change the result text depending on the number of valid input
function changeResultText(counter) {
    switch (counter) {
        case 1:
            $result.innerText = 'Not bad';
            $result.classList.remove('text-success');
            $result.classList.add('text-danger');
            break;
        case 2:
            $result.innerText = 'Good';
            $result.classList.remove('text-success');
            $result.classList.add('text-danger');
            break;
        case 3:
        case 4:
            $result.innerText = 'Strong';
            $result.classList.remove('text-danger');
            $result.classList.add('text-success');
            break;
        default:
            $result.innerText = 'Weak';
            $result.classList.remove('text-success');
            $result.classList.add('text-danger');
    }
}

// Check the alphanumeric values
function validateAlphaNumeric($target, $regex) {
    if ($password.value.match($regex)) {
        $target.classList.remove('invalid');
        $target.classList.add('valid');
        return true;
    } else {
        $target.classList.remove('valid');
        $target.classList.add('invalid');
    }
    return false;
}

// Check the length of input
function validateLength($target, $length) {
    if ($password.value.length >= $length) {
        $target.classList.remove('invalid');
        $target.classList.add('valid');
        return true;
    } else {
        $target.classList.remove('valid');
        $target.classList.add('invalid');
    }
    return false;
}

// Alternately show or hide password
document.getElementById('toggle-password').onclick = () =>
    ($password.getAttribute('type') == 'password') ?
    $password.setAttribute('type', 'text') :
    $password.setAttribute('type', 'password');
