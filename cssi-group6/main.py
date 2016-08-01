#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import jinja2
import webapp2
import random
import logging

env = jinja2.Environment(loader=jinja2.FileSystemLoader('templates'))

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

def compare(guess):
	logging.info("Hi")
	if random_word == guess: #if right on first try
		for i in range(1,6):
			first_round[i] = guess[i]
		count = 0
		print "\nYou got it!"
		print first_round
		exit()
	else: #if not right on first try
		logging.info("Hi!")
		for i in range(1,6):
			if random_word[i] == guess[i]:
				first_round[i] = guess[i]
			#elif random_word[i] == guess [i+1]:
				#first_round[i] = "()"
			elif guess[i] in random_word and guess[i] != guess[0]:
				first_round[i] = "("+guess[i]+")"
		print first_round

class MainHandler(webapp2.RequestHandler):
	# random_word = ""
	# random_word = get_random_word(words_list)

	def get(self):
		count = 10
		while (count > 0):
			user_guess = self.request.get("guess")
			compare(user_guess)
			count = count -1
			self.response.write(count)
		#main_template = env.get_template('main.html')
		#self.response.out.write(main_template.render())
		# self.response.out.write(random_word)
		
app = webapp2.WSGIApplication([
	('/', MainHandler)
], debug=True)
