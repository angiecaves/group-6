function get_random_word(words){
    var randomIndex = Math.floor(Math.random() * words.length); 
    var randomElement = words[randomIndex];
    return randomElement;
}

var words_list = ['bingo','bacon','tears','dream','click','stick','right','taken','group','chair','water','store','brain',"youth",'about','mouth','house','break','barns','chase','train','choir','clash','cough','grape','melon','fruit','steak','fries','chips','badge','watch','trunk','tiger','stage'];

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

function in_word(word, letter)
{
    var instances = 0;
    for (var i = 0; i < word.length;i++)
    {
       if (word[i] == letter)
       {
         instances++; 
       }
    }
    return instances;
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
            var guessed_letter = guess[i];
            if (random_w[i]== guessed_letter )
            {
                first_round[i]="["+guessed_letter+"]";
            }
            else if (in_word(random_w,guessed_letter) > in_word(first_round, "("+guessed_letter+")"))
            {
                first_round[i]="("+guessed_letter+")";
            }
            else
            {
              first_round[i]=guessed_letter;
            }

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
      // $("#failure").append("<br>" + user_guess);
      // $("#output").html(user_guess)

      compare(random_word,user_guess);
      $("#failure").append("<br>" + first_round.join(""));
   }

   if (count < 1)
   {
     alert("YOU LOSE! The correct word was: " + random_word );
     window.location.reload();
   }
}

function setup(){
    start_game();
    // var count = 10
    $("#myButton").click(doGuess);  
}

$(document).ready(setup)
