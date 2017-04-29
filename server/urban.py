
from bs4 import BeautifulSoup
from urllib import urlopen
import os
import sys
import json


def main (args):
    p = 'http://www.urbandictionary.com/'+ str(args)
    words = get_word(p) 
    meaning = range(len(words))

    for m, w in zip(meaning, words):
        print 'Meaning {0}:  {1}'.format(m, w)
        
#Returns a list of meanings from given word
def get_meaning(path):
    
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

#makes a dictionary for given words
#Param: 'word' current word passed in
def make_dict(word):
    
    #This block makes the path of the given word
    #and gets the all the meanings of the word
    #which is then stored in a dict 
    #the key is the word and value is the list of meanings
    
    path = 'http://www.urbandictionary.com/'+ word
    get_meaning(path)
    dic = {}
    dic[word] = get_meaning(path); 
    return dic



#gets all words from dictionary word data
#returns clean list of all words from 'a-z'
def get_data(path):
    alpha = []
    final = []
    i = 0
    
    #This loop searches the given local path and gets all files with '.txt' extension
    for file in os.listdir(path):
        if file.endswith(".txt"):
            alpha.append(path+file)
    
    #This loop cleans all data from .txt files cutting last two index off 
    #The last two indexs is the syallable count ex. theword:2

    while i < len(alpha):
        d = pd.read_csv(alpha[i],sep=" ", header = None)
        data = d[0].tolist()
        for x in data:
            final.append(x[:-2])
        i = i +1
   
    return final

#gets words from cleaned lists and returns final dictionary
def get_words(data):
    dic = {}
    x = iter(data)
    
    #This loop takes all cleaned word list and gets each word, adding them to the dictionary
    #finally returning a complete dictionary
    while True:
        try:
            words = x.next()
            dic = make_dict(words)
        except StopIteration as e:
             break
    return dic
def get_word(path):
    
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
   

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))