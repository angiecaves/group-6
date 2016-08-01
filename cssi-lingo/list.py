import random

words_list = ['bingo','bills','bacon','tears','dream','click','stick','right','happy','dryer','taken','cruise','group','chair','water','store','brain',"youth",'about','apple','mouth','house','check','break','start','barns','start','bars','chase','train','choir','clash','cough','grape','melon','fruit','steak','fries','pepsi','sprite','chips','badge']

def get_random_word(words):
	return random.choice(words)


random_word = get_random_word(words_list)

letters_in_random = []
for i in range(len(random_word)):
	letters_in_random += random_word[i]
first_in_word = random_word[0]

print "Word: " + random_word
print letters_in_random
first_round = [first_in_word, "_ ", "_ ", "_ ", "_ "]
print first_round

end = 10
def compare(guess):
	if random_word == guess: #if right on first try
		for i in range(1,5):
				first_round[i] = guess[i]
		count = 0
		print "\nYou got it!"
		print first_round
		end = 0
	else: #if not right on first try
		for i in range(1,5):
			if random_word[i] == guess[i]:
				first_round[i] = guess[i]
		print first_round
	return end


count = 10
while (count > 0 or end != 0):
	user_guess = raw_input("\nPut in your guess: ")
	compare(user_guess)
	count = count -1
	print count


