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

def get_random_word(words):
    return random.choice(words)

words_list = ['bingo','bills','bacon','tears','dream','click','stick','right','happy','dryer','taken','cruise','group','chair','water','store','brain',"youth",'about','apple','mouth','house','check','break','start','barns','start','bars','chase','train','choir','clash','cough','grape','melon','fruit','steak','fries','pepsi','sprite','chips','badge']

random_word = get_random_word(words_list)

letters_in_random = []
for i in range(len(random_word)):
    letters_in_random += random_word[i]
first_in_word = random_word[0]
logging.info("Word: " + random_word) # was print
logging.info(letters_in_random)# was print
first_round = [first_in_word, "_ ", "_ ", "_ ", "_ "]
logging.info(first_round) # was print


def compare(guess):
    if random_word == guess: #if right on first try
        for i in range(0,5):
            first_round[i] = guess[i]
        count = 0
        logging.info("\nYou got it!") # was print
        logging.info(first_round) # was print
        # random_word = get_random_word(words_list) # dont trust this line
        exit()
    else: #if not right on first try
        for i in range(0,5):
            if random_word[i] == guess[i]:
                first_round[i] = guess[i]
            elif guess[i] in random_word and guess[i] != guess[0]:
                first_round[i] = "("+guess[i]+")"
        logging.info(first_round) # was print

class MainHandler(webapp2.RequestHandler):
    def get(self):
        count = 10
        game={"clue":str(first_round)}
    	main_template = env.get_template('main.html')
        while (count > 0):
            user_guess = self.request.get("guess", "lingo") # default value so it doesnt freak
            compare(user_guess)
            count = count -1
        self.response.out.write(main_template.render(game))
        self.response.write("Correct word: " + random_word) 
  # this might be best in a post function 
        
        
app = webapp2.WSGIApplication([
    ('/', MainHandler)
], debug=True)
