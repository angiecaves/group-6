function get_random_word(words){
    var randomIndex = Math.floor(Math.random() * words.length); 
	var randomElement = words[randomIndex];
	return randomElement;
}

var words_list = ['bingo','bills','bacon','tears','dream','click','stick','right','happy','taken','group','chair','water','store','brain',"youth",'about','apple','mouth','house','check','break','barns','start','chase','train','choir','clash','cough','grape','melon','fruit','steak','fries','chips','badge'];

var random_word;
var first_in_word;
var first_round;
var count;

function start_game(){
	count = 10
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


function compare(random_w, guess){

	if (random_w==guess){
		for(i=0; i<5; i++){
			first_round[i]=guess[i];
		}
		redirect_to_winner();
	}
	else{
		for (i=0; i<5; i++)
		{
			if (random_w[i]==guess[i])
			{
				first_round[i]=guess[i];
			}
		    else if (random_w.includes(guess[i]) == true && guess[i] != guess[0] && random_w[i] != guess[i])
			{
				first_round[i]="("+guess[i]+")";

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