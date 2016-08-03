function get_random_word(words){
    var randomIndex = Math.floor(Math.random() * words.length); 
	var randomElement = words[randomIndex];
	return randomElement;
}

var words_list = ['bingo','bills','bacon','tears','dream','click','stick','right','happy','dryer','taken','group','chair','water','store','brain',"youth",'about','apple','mouth','house','check','break','start','barns','start','bars','chase','train','choir','clash','cough','grape','melon','fruit','steak','fries','pepsi','sprite','chips','badge'];

var random_word;
var first_in_word;
var first_round

function start_game(){
    random_word = get_random_word(words_list);
    //document.write(random_word)
    first_in_word = random_word[0];
    first_round = [first_in_word, "_ ", "_ ", "_ ", "_ "];
    $("#output").html(first_round.toString());
}

function redirect_to_winner(){
	window.location.replace("/winner")
}

function compare(random_w, guess){
	if (random_w==guess){
		$("#output").html(guess)
		for(i=0; i<5; i++){
			first_round[i]=guess[i];
		}
		count=0;
		$("#output").html(first_round);
		redirect_to_winner();
	}
	else{
		for (i=0; i<5; i++)
		{
			if (random_w[i]==guess[i])
			{
				first_round[i]=guess[i];
			}
		    else if (random_w.includes(guess[i]) && guess[i] != guess[0])
			{
				first_round[i]="("+guess[i]+")";
			}
		$("#output").html(first_round);
		}
	}
}

function redirect_to_original(){
	history.back();
}

function doGuess(){
   var user_guess = $("#user").val();
   $("#output").html(user_guess)
   compare(random_word,user_guess);
}

function setup(){
    start_game();
    // var count = 10
    $("#myButton").click(doGuess);
}

$(document).ready(setup)