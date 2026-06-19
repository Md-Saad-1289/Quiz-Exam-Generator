let examData;

let answers={};

let time;

let timer;

let submitted=false;




function copyPrompt(){


let box=document.getElementById("promptBox");


navigator.clipboard.writeText(box.value);


alert("Prompt Copied");

}




function startExam(){



examData=
JSON.parse(
document.getElementById("jsonInput").value
);



document.getElementById("home").style.display="none";

document.getElementById("exam").style.display="block";



document.getElementById("title").innerHTML=
examData.exam_title;



time=examData.time*60;



showQuestions();


startTimer();


}





function showQuestions(){


let area=document.getElementById("questions");


area.innerHTML="";



examData.questions.forEach(q=>{



let div=document.createElement("div");


div.className="question";



div.innerHTML=`

<h3>
${q.id}. ${q.question}
</h3>



${q.options.map(option=>`

<label class="option">

<input 
type="radio"
name="q${q.id}"
value="${option}"
onclick="selectOption(${q.id},this)">

${option}

</label>

`).join("")}


`;



area.appendChild(div);



});



}





function selectOption(id,input){



if(submitted) return;



if(answers[id]){


input.checked=false;

return;


}



answers[id]=input.value;



let options=
document.getElementsByName("q"+id);



options.forEach(o=>{

o.disabled=true;

});



}





function startTimer(){


timer=setInterval(()=>{


let min=Math.floor(time/60);

let sec=time%60;



document.getElementById("timer").innerHTML=

min+":"+String(sec).padStart(2,"0");



time--;



if(time<0){


submitExam();


}



},1000);



}







function submitExam(){


if(submitted)return;


submitted=true;


clearInterval(timer);



document.querySelectorAll("input")
.forEach(i=>{

i.disabled=true;

});



let text=

"Exam: "+examData.exam_title+
"\n\n";



examData.questions.forEach(q=>{


text+=

"Q"+q.id+": "+

(answers[q.id] || "Not Answered")

+"\n";


});





document.getElementById("result").innerHTML=`

<h2>Answer Sheet</h2>


<textarea id="answerText">

${text}

</textarea>


<br>


<button onclick="copyAnswer()">

Copy Answer

</button>


`;



}







function copyAnswer(){


let box=
document.getElementById("answerText");



navigator.clipboard.writeText(box.value);



alert("Answer Copied");


  }
