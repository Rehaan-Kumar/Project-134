sound_1 = "";
model_status = "";
objects = [];

function preload() {
    sound_1 = loadSound("Alarm.mp3")
}

function setup() {
    canvas = createCanvas(640, 460)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(620, 460)
    video.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded")
    setTimeout(function () {
        model_status = true
    }, 5000)
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results
    }
}

function draw() {
    image(video, 0, 0, 640, 460)
    if (model_status != "") {
        objectDetector.detect(video, gotResults)
        for(i=0 ; i<objects.length ; i++) {
            fill("red")
            percent = Math.floor(objects[i].confidence *100)
            text(objects[i].label + " " + percent + "%" , objects[i].x+15 , objects[i].y+15)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[0].width , objects[0].height)
            if (objects[i].label == "person") {
                document.getElementById("baby").innerHTML = "Baby Found"
                sound_1.stop()
            } else {
                document.getElementById("baby").innerHTML = "Baby Not Found"
                sound_1.play()
                sound_1.setVolume(1)
                sound_1.rate(1)
            }    
        }
    }
}