from bs4 import BeautifulSoup
from urllib import urlopen
import os
def get_word(word):
    path = 'http://www.urbandictionary.com/'+ word
    #This block finds all data from the class titled 'meaning'
    #and stores it in words
    html = urlopen(path).read()
    soup = BeautifulSoup(html, "html5lib")
    words = soup.findAll("div", { "class" : "meaning" })
    meaning_list = []

    #This block analyzes each word in 'words' and cleans it
    #returning a cleaned list of 'meanings'
    i= 0
    while i < len(words):
        current_meaning = words[i].get_text().strip()
        meaning = "Meaning " + str(i+1) + ": " + current_meaning
        meaning_list.append(meaning)
        i = i +1
    return meaning_list
