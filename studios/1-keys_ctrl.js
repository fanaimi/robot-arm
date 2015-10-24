/**
 * @Created by emil on 24/10/2015.
 *
 * @name        1-keys_ctrl.js
 * @desc        studio for robot arm: controlling with keyboard
 */



var j5 = require('johnny-five');
var keypress = require('keypress');
var _port = "/dev/tty.usbmodem1411"
    ,   _board = new j5.Board(_port)
    ,   _pin = 9
    ,   _pin1 = 10
    ,   _pin2 = 11
    ,   _pin3 = 12

    ,   _servo
    ,   _servo1
    ,   _servo2
    ,   _servo3

    ,   a = 90
    ,   a1 = 90
    ,   a2 = 90
    ,   a3 = 125
    ;


keypress(process.stdin);


_board.on("ready", function(){
    console.log("ready");
    _servo = new j5.Servo(_pin);
    _servo1 = new j5.Servo(_pin1);
    _servo2 = new j5.Servo(_pin2);
    _servo3 = new j5.Servo(_pin3);



    this.repl.inject({
        board   : _board
        , s       : _servo
        , s1       : _servo1
        , s2       : _servo2
        , s3       : _servo3
    });

    _servo.to(a, 500);
    _servo1.to(a1, 500);
    _servo2.to(a2, 500);
    _servo3.to(a3, 500);




    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);

    process.stdin.on('keypress', function (ch, key) {

        if ( !key ) return;

        console.log("=> " +key.name);

        if ( key.name == 'q' ) {
            console.log('Quitting and resetting');
            _servo.to(90, 500);
            _servo1.to(90, 500);
            _servo2.to(90, 500);
            _servo3.to(125, 500);
            process.exit();
        }//quit


        /**
         *  UP and DOWN for servo1
         *
         */
        else if ( key.name == 'up' ) {
            console.log('up');
            if(a1 < 180){
                _servo1.to(a1+=5);
            }
            // ================= / up
        } else if ( key.name == 'down' ) {
            console.log('down');
            if(a1 >0){
                _servo1.to(a1-=5);
            }
        }// ================= / down




        /**
         *  LEFT and RIGHT for servo
         *  BASE ROTATION
         */
        else if ( key.name == 'left' ) {
            console.log('Left');
            if(a<180){
                _servo.to(a+=5);
            }
            //========== / left
        } else if ( key.name == 'right' ) {
            console.log('Right');
            if(a>0){
                _servo.to(a-=5);
            }
        }//========== / right


        /**
         *  R and F for servo2
         *  UP / DOWN
         */
        else if ( key.name == 'r' ) {
            console.log('r');
            if(a2>0){
                _servo2.to(a2-=5);
            }
            //========== / R

        } else if ( key.name == 'f' ) {
            console.log('f');
            if(a2<180){
                _servo2.to(a2+=5);
            }
        }//========== / F





        /**
         *  T and G for servo3 -CLAW
         *  OPEN / CLOSE
         */
        else if ( key.name == 't' ) {
            console.log('t ' + a3);
            if(a3>125){
                _servo3.to(a3-=5);
            }
            //========== / R

        } else if ( key.name == 'g' ) {
            console.log('g ' + a3);
            if(a3<165){
                _servo3.to(a3+=5);
            }
        }//========== / F




        else if ( key.name == 'space=====' ) {

            console.log('Stopping');

        }


    });



});
