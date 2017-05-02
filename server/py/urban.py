from bs4 import BeautifulSoup
from urllib import urlopen
import os
import sys
import json
import ast


def main (args):
    word = cut_word(str(args))
    p = 'http://www.urbandictionary.com/'+ word
    words = get_word(p)
    words = json.dumps(ast.literal_eval(json.dumps(words)))

    print words
    sys.stdout.flush()
    #print str(words)

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
    data = {}
    result = {x.get_text().strip() for x in words}
    while i < len(result):
        m = 'Meaning ' +str(i)
        w = result.pop()
        if len(data) is 0:
            data = {m:w}
        else:
            data.update({m:w})

        i = i +1

    return data

#If word has any spaces removes them so
def cut_word(word):
    if word.find(' ') != -1:
        word = word.replace(" ", "")
        return word
    else:
        return word

if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
