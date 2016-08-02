function get_random_word(words){
    return random.choice(words);
}

var words_list = ['bingo','bills','bacon','tears','dream','click','stick','right','happy','dryer','taken','group','chair','water','store','brain',"youth",'about','apple','mouth','house','check','break','start','barns','start','bars','chase','train','choir','clash','cough','grape','melon','fruit','steak','fries','pepsi','sprite','chips','badge'];

var random_word;
var first_in_word;
var first_round

function start_game(){
    random_word = get_random_word(words_list);
    first_in_word = random_word[0];
    first_round = [first_in_word, "_ ", "_ ", "_ ", "_ "];
}

function compare(random_w, guess){
	if random_w==guess{
		for(i=0; i<5; i++){
			first_round[i]=guess[i];
		}
		count=0;
		console.log("You got it!");
		console.log(first_round);
	}
	else{
		for (i=0; i<5; i++){
			if (random_w[i]==guess[i])
			{
				first_round[i]=guess[i];
			}
		    else if (random_w.includes(guess[i]) && guess[i] != guess[0])
			{
				first_round[i]="("+guess+")";
			}
		console.log(first_round);
		}
	}
}