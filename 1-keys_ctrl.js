/**
 * @Created by emil on 24/10/2015.
 *
 * @name        single SERVO
 * @desc        test for robot arm
 */



var j5 = require('johnny-five');
var keypress = require('keypress');
var _port = "/dev/tty.usbmodem1411"
    ,   _board = new j5.Board(_port)
    ,   _pin = 9
    ,   _servo
    ,   a = 90
    ;


keypress(process.stdin);


_board.on("ready", function(){
    console.log("ready");
    _servo = new j5.Servo(_pin);



    this.repl.inject({
        board   : _board,
        s       : _servo
    });

    _servo.to(a, 500);




    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', function (ch, key) {

        if ( !key ) return;


        if ( key.name == 'q' ) {

            console.log('Quitting');
            process.exit();

        } else if ( key.name == 'up' ) {

            console.log('up');

        } else if ( key.name == 'down' ) {

            console.log('down');

        } else if ( key.name == 'left' ) {

            console.log('Left');


            if(a<180){
                _servo.to(a+=10);
            }


            //========== / left
        } else if ( key.name == 'right' ) {

            console.log('Right');


            if(a>0){
                _servo.to(a-=10);
            }

            //========== / right

        } else if ( key.name == 'space' ) {

            console.log('Stopping');

        }


    });



});
