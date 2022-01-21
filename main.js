var prediction = "";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90

});
camera = document.getElementById('camera');
Webcam.attach('#camera');
function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById('result').innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';

    });

}
console.log('ml5 version :', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/igGnrZRAo/model.json', modelloaded);
function modelloaded() {
    console.log('modelloaded');

}
function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The Prediction is " + prediction;
    var utterthis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}
function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();
        if (results[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "✌";
        }
        if (results[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "👌";
        }
        if (results[0].label == "Down/Bad") {
            document.getElementById("update_emoji").innerHTML = "👎";
        }
        if (results[0].label == "Stop") {
            document.getElementById("update_emoji").innerHTML = "✋";
        }
        if (results[0].label == "Help") {
            document.getElementById("update_emoji").innerHTML = "✊";
        }
        if (results[0].label == "Okay") {
            document.getElementById("update_emoji").innerHTML = " ";
        }
    }
}