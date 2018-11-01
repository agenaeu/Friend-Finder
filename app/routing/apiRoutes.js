// routing 
let possibleFriends = require("../data/friends");
let arrayOfScoreSums = [];
let differenceOfScoreSums = [];
let lowestScoreDifference = [];
let bestMatch = {
    name: "",
    gender: "",
    sexualPreference: "",
    photo: "",
    difference: Infinity
};
let add = function (a, b) {
    return (parseInt(a) + parseInt(b));
};
module.exports = function (app) {
    // if user visits this page then they will see a JSON object of an array of possible friends
    app.get('/api/friends', function (req, res) {
        res.json(possibleFriends);
    });

    // Post data will be the information the visitor puts in which will be sent out to the server
    app.post('/api/friends', function (req, res) {
        let userData = req.body;
        possibleFriends.splice(0, 0, userData);
        //console.log(userData);
        //console.log(possibleFriends);


        let sumAllScores = function () {
            for (let i = 0; i < possibleFriends.length; i++) {
                let matchScoreArray = possibleFriends[i].scores;
                //console.log(matchScoreArray);
                // reduce reduces the values in an array to a single number
                let scoreSum = parseInt(matchScoreArray.reduce(add, 0));
                //console.log(scoreSum);
                arrayOfScoreSums.push(scoreSum);
                //console.log(arrayOfScoreSums);
                possibleFriends[i].total = scoreSum;
            };
        };
        let findDifference = function () {
            for (let i = 1; i < arrayOfScoreSums.length; i++) {

                let totalDifference = Math.abs(arrayOfScoreSums[0] - arrayOfScoreSums[i]);
                //console.log(totalDifference);
                differenceOfScoreSums.push(totalDifference);
                possibleFriends[i].difference = totalDifference;
               // console.log(differenceOfScoreSums);
            };
        };

        let lowestDifference = function () {
            // console.log(differenceOfScoreSums);
            let min = (Math.min(...differenceOfScoreSums));

            //console.log(min);
            lowestScoreDifference.push(min);
            //console.log(lowestScoreDifference[0]);


            for (let i = 1; i < possibleFriends.length; i++) {


                if ((lowestScoreDifference[0] === possibleFriends[i].difference) && (possibleFriends[i].gender === possibleFriends[0].sexualPreference)) {

                    possibleFriends[i].isBest = true;
                    // console.log(possibleFriends[i]);
                    bestMatch = possibleFriends[i];


                }

            }
        };
        let findBestMatch = function () {
            sumAllScores();
            findDifference();
            lowestDifference();
        }
        if (possibleFriends.length > 1) {
            findBestMatch();
            //res.json(true); 
            console.log(bestMatch);
            res.json(bestMatch);
            
        }
        else {
            res.json(false);
        }
        
      //  possibleFriends = [];
       // possibleFriends.splice(0, 1);
    });





  /*   app.post('/api/clear', function (req, res) {
        possibleFriends.length = [];
        
    
        res.json({ ok: true });
    
    }); */






    


};
