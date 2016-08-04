function get_random_word(words){
    var randomIndex = Math.floor(Math.random() * words.length); 
	var randomElement = words[randomIndex];
	return randomElement;
}

var words_list = ['bingo','bacon','tears','dream','click','stick','right','taken','group','chair','water','store','brain',"youth",'about','apple','mouth','house','check','break','barns','start','chase','train','choir','clash','cough','grape','melon','fruit','steak','fries','chips','badge','watch','trunk','tiger','stage','happy'];

var random_word;
var first_in_word;
var first_round;
var count;
var score = 0; 


function start_game(){
	count = 5;
	$("#boxed").html(count);
    random_word = get_random_word(words_list);
    console.log(random_word);
    //document.write(random_word)
    first_in_word = random_word[0];
    first_round = [first_in_word, "_ ", "_ ", "_ ", "_ "];
    $("#output").html(first_round);
}

function redirect_to_winner(){
    $("#playWin").html("Correct word: " + first_round);
	window.location.replace("/winner");
}

function double_letter(str, letter){
		x=str.replace(/[^letter]/g, "").length;
		return x;
}

function compare(random_w, guess){

	if (random_w==guess){
		for(i=0; i<5; i++){
			first_round[i]="[" + guess[i] + "]";
		}
		redirect_to_winner();
	}
	else{
		for (i=0; i<5; i++)
		{
			if (random_w[i]==guess[i])
			{
				first_round[i]="[" + guess[i] + "]";
			}
		    else if (random_w.includes(guess[i]) == true && first_round.toString().indexOf("[") == -1)
			{
				var in_random=random_w.replace(/[^random_w[i]]/g, "").length;
				var in_guess = guess.replace(/[^random_w[i]]/g, "").length;
				if(in_random>=in_guess)
				{
					first_round[i]="("+guess[i]+")";
				}
			}
		$("#output").html(first_round);
		}
		count = count -1;
		$("#boxed").html(count);
	}
}



function doGuess(){
   var user_guess = $("#user").val();
   if (user_guess.length != 5)
   {
   	 alert("Please enter a five letter word!!")
   }
   else
   {
   $("#output").html(user_guess)
   compare(random_word,user_guess);
   }

   if (count < 1)
   {
   	 alert("YOU LOSE");
   	 window.location.reload();
   }
}

function setup(){
    start_game();
    // var count = 10
    $("#myButton").click(doGuess); 	
}

$(document).ready(setup)