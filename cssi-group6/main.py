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

class MainHandler(webapp2.RequestHandler):
    def get(self):
        global random_word
        start_game()
        count = 10
        while (count > 0):
            user_guess = self.request.get("guess", "     ") # default value so it doesnt freak
            if (len(user_guess) == 5):
                compare(self,random_word,user_guess)
                count = count -1
            else:
                self.response.write("Please put in a five letter word")
                user_guess = "     "
        game={"clue":str(first_round)}
    	main_template = env.get_template('main.html')
        self.response.out.write(main_template.render(game))
        self.response.write("Correct word: " + random_word) 
  # this might be best in a post function 

class WinHandler(webapp2.RequestHandler):
    def get(self):
        template2 = env.get_template("win.html")
        self.response.write(template2.render())
        
app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/winner', WinHandler)
], debug=True)
