// Cordova host swarmlet test
//
// Copyright (c) 2016-2017 The Regents of the University of California.
// All rights reserved.
//
// Permission is hereby granted, without written agreement and without
// license or royalty fees, to use, copy, modify, and distribute this
// software and its documentation for any purpose, provided that the above
// copyright notice and the following two paragraphs appear in all copies
// of this software.
//
// IN NO EVENT SHALL THE UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY
// FOR DIRECT, INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES
// ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
// THE UNIVERSITY OF CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF
// SUCH DAMAGE.
//
// THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY WARRANTIES,
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE
// PROVIDED HEREUNDER IS ON AN "AS IS" BASIS, AND THE UNIVERSITY OF
// CALIFORNIA HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES,
// ENHANCEMENTS, OR MODIFICATIONS.
//

/** This "swarmlet" example, running on Cordova, illustrates the use of Cordova
 *  Host to run a swarmlet. The swarmlet loads loads a 'TestSpontaneousOnce' and 
 *  a 'Hello' accessors, initializes them, and connect them
 *  
 *  See https://www.icyphy.org/accessors/wiki/Main/CordovaHost2
 *  
 *  @module swarmlet.js
 *  @author Victor Nouvellet
 *  @version $$Id: swarmlet.js 1502 2017-04-17 21:34:03Z cxh $$
 */

exports.setup = function() {

    var dataCollection = this.instantiate('dataCollection', 'dataCollectingAccessor');
    var dataDisplay = this.instantiate('dataDisplay', 'dataDisplayingAccessor');
    var processing = this.instantiate('processing', 'processingAccessor')
   // var processingX = this.instantiate('processingX', 'processingX');
   // var processingY = this.instantiate('processingY', 'processingY');
   // var processingZ = this.instantiate('processingZ', 'processingZ');

   // this.connect(dataCollection, 'dataOutX', processingX, 'xIn');
   // this.connect(dataCollection, 'dataOutY', processingY, 'yIn');
   // this.connect(dataCollection, 'dataOutZ', processingZ, 'zIn');

    this.connect(dataCollection, 'dataOutX', processing, 'xIn');
    this.connect(dataCollection, 'dataOutY', processing, 'yIn');
    this.connect(dataCollection, 'dataOutZ', processing, 'zIn');
    this.connect(dataCollection, 'dataOutRes', processing, 'resIn');



    this.connect(dataCollection, 'dataOutX', dataDisplay, 'dataInX');
    this.connect(dataCollection, 'dataOutY', dataDisplay, 'dataInY');
    this.connect(dataCollection, 'dataOutZ', dataDisplay, 'dataInZ');
    this.connect(dataCollection, 'timeStamp', dataDisplay, 'timeStampIn');

};
var displayOn = true;
exports.initialize = function () {
    document.getElementById("mybtn").onclick = function() {
    if (displayOn) {
        document.getElementById('processing').style.display = "block";
        document.getElementById('displaying').style.display = "none";
        displayOn = false;
    }
    else {
        document.getElementById('processing').style.display = "none";
        document.getElementById('displaying').style.display = "block";
        displayOn = true;
    }
    };
};
