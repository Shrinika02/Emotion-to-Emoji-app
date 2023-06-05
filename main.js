prediction_1=""
prediction_2=""
Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90,
})
camera=document.getElementById('camera')
Webcam.attach(camera)

function capture_image(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="snapshot" src="'+data_uri+'">'
    })
}
console.log('ml5 version:', ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',model_loaded)

function model_loaded(){
    console.log("model_loaded")
}

function speak(){
     var synth = window.speechSynthesis;
     speak_data_1 = "The first prediction is " + prediction_1;
      speak_data_2 = "And the second prediction is " + prediction_2;
       var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
        synth.speak(utterThis);
     }

     function check(){
         img=document.getElementById("snapshot")
         classifier.classify(img,got_results)
     }

     function got_results(error, results){
         if (error){
             console.error(error)
   }
    else{
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML=results[0].label
        document.getElementById("result_emotion_name_2").innerHTML=results[1].label
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(prediction_1=="happy"){
            document.getElementById("result_emoji_1").innerHTML="&#128522;"
        }
        if(prediction_1=="sad"){
            document.getElementById("result_emoji_1").innerHTML="&#128532;"
        }
        if(prediction_1=="angry"){
            document.getElementById("result_emoji_1").innerHTML="&#128548;"
        }
        if(prediction_2=="happy"){
            document.getElementById("result_emoji_2").innerHTML="&#128522;"
        }
        if(prediction_2=="sad"){
            document.getElementById("result_emoji_2").innerHTML="&#128532;"
        }
        if(prediction_2=="angry"){
            document.getElementById("result_emoji_2").innerHTML="&#128548;"
        }
     }
     }