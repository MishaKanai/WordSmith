function tagCrossNodeWord(node, startIndex, endIndex) {
    var si = startIndex;
    var ei = endIndex;

    if (node.nodeType === Node.TEXT_NODE ) {
        if (node.textContent.length < si) {
            return [si - node.textContent.length, ei - node.textContent.length];
        }
        else {
            //reminder: this is a text node

            //cache node text
            let text = node.textContent;
            node.innerHTML = '';
            let spanText = text.slice(si, ei);
            //create target
            let target = document.createElement('span');
            target.className = 'special-target';
            //target.style.backgroundColor = "green";
            target.style.color = "purple";
            target.style.fontSize = "150%";
            target.innerHTML = spanText;
            console.log("sliced for inside span:\n si: ", target.innerHTML);

            var parent = node.parentNode;
            var nextSib = node.nextSibling;
            //null means we append to end in insertBefore so its ok

            //insert target after our node.
            let insertedSpanNode = parent.insertBefore(target, nextSib);

            //insert any remaining tail
            if (ei < text.length) {
                let tail = document.createTextNode(text.slice(ei, text.length));
                let insertedTailNode = parent.insertBefore(tail, nextSib);

            }

            //trim the html of our node to before spanned text.
            //subtract size of target text from si
            node.textContent = text.slice(0, si);

            if (ei > node.length) {
                return [0, ei - (node.textContent.length + insertedSpanNode.textContent.length)];
            }
            else {
                return [0,0];
            }
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        var children;
        if (node.hasChildNodes) {
            children = node.childNodes;
        }
        else children = node.children;

        for (let i=0; i<children.length; i++) {
            if (children[i].className == "special-target") {
                continue;
            } else {
                console.log(children[i]);
            }
            let resultTuple = tagCrossNodeWord(children[i], si, ei);
            si = resultTuple[0];
            ei = resultTuple[1];
            if (si <= 0 && ei <= 0)
                break;
        }
        return [si, ei];

    } else {
        if (node.firstChild() !== null) {
            //non-text-node
            let children = node.childNodes;

            var l = children.length
            for (let i=0; i<l; i++) {
                let resultTuple = tagCrossNodeWord(children[i], si, ei);
                si = resultTuple[0];
                ei = resultTuple[1];
                if (si <= 0 && ei <= 0)
                    break;
            }
        }
        return [si, ei];
    }
}



export default function insertTargets(selection) {
    console.log(selection);

    //clear previous highlighting and targeting
    $(".special-target").each(function() {
        $(this).replaceWith($(this).text());
    });

    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;

    var word;

    //We will prepare the parameters we need to pass to tagCrossNodeWord
    // i.e. A mutual parent node to anchorNode and focusNode,
    //      And the startIndexes and endIndexes in the parent's textContent
    //      That refer to the word in questions.

    //find common parent of anchorNode and focusNode
    //http://stackoverflow.com/a/2453811
    var fp = $(focusNode).parents();
    var ap = $(anchorNode).parents();
    for (var i=0; i<ap.length; i++) {
        if (fp.index(ap[i]) != -1) {
            // common parent
            console.log("common parent: (?): ",fp[fp.index(ap[i])]);
            break;
        }
    }
    const parentNode = fp[fp.index(ap[i])];

    if (parentNode.className == "ql-editor") {
        //selection has missed text.
        //leave to default behavior
        return null;
    }

    var textAccumulator = '';
    var anchorNodeHit = false;
    var focusNodeHit = false;
    var textAccumulateUntilSplit = '';

    //TODO:
    //The function below is ASYNCHRONOUS
    //this means that occasionally we may get nodes appended out of order.
    //This will have to be resolved in an iterative implementation with a queue.

    // *Traverse the list recursively, getting the text nodes in-order.
    //    After reconstructing the text, we will send to tagCrossNodeWord
    // *Simultaneously accumulate textAccumulateUntilSplit until selection end
    //  so we know the index of the word to send to tagCrossNodeWord
    let traverseList = (parentNode, anchorNode, focusNode) => {
        if (parentNode === anchorNode) {
            anchorNodeHit = true;
            if (anchorNode == focusNode) {
                textAccumulateUntilSplit += parentNode.wholeText.slice(
                    0,
                    (selection.anchorOffset + selection.focusOffset)/2
                );
                //prevent textAccumulateUntilSplit from continuing
                focusNodeHit = true;
            }
            else if (focusNodeHit == true) {
                var fo = parentNode.focusOffset;
                //if F.O. is undefined, we want nothing (slice will give everything)
                if (typeof fo == 'undefined') {
                    fo = 0;
                }
                textAccumulateUntilSplit +=
                parentNode.wholeText.slice(0, fo);
            }
            else
                textAccumulateUntilSplit += parentNode.wholeText;
            textAccumulator += parentNode.wholeText;

            return new Array (parentNode);
        }
        else if (parentNode === focusNode) {
            focusNodeHit = true;
            if (anchorNodeHit == true) {
                var fo = parentNode.focusOffset;
                //if F.O. is undefined, we want nothing (slice will give everything)
                if (typeof fo == 'undefined') {
                    fo = 0;
                }
                textAccumulateUntilSplit +=
                    parentNode.wholeText.slice(0, fo);
            }
            else
                textAccumulateUntilSplit += parentNode.wholeText;
            textAccumulator += parentNode.wholeText;

            return new Array (parentNode);
        }
        else if (parentNode.nodeType === Node.TEXT_NODE) {
            if (!(anchorNodeHit && focusNodeHit))
                textAccumulateUntilSplit += parentNode.wholeText;
            textAccumulator += parentNode.wholeText;
            return new Array (parentNode);
        }

        //traverse list recursively
        const childNodes = parentNode.childNodes;

        var returnList = [];
        for (let i = 0; i < childNodes.length; i++) {
            let currChild = childNodes[i];
            let result = traverseList(currChild, anchorNode, focusNode)
            returnList = returnList.concat(result);
        }
        return returnList;
    }

    // generate list of textNodes
    //while filling text accumulators
    var traversal = traverseList(parentNode, anchorNode, focusNode);

    //these are important for debugging.
    console.log("textAccumulator", textAccumulator);
    console.log("TEXTACCUMULATEUNTILSPLIT", textAccumulateUntilSplit);


    let wholeText = textAccumulator;

    // tuple t
    const t = getWordAt(textAccumulator, textAccumulateUntilSplit.length);
    const start = t[0];
    const end = t[1];
    var word = (textAccumulator).slice(start,end);

    //good for debugging
    console.log("start index: ", start);
    console.log("end index: ", end);
    console.log("word extracted: ",word);

    if (start < 0)
        return null;

    //recursively insert .special-target spans into word, split across leaves
    tagCrossNodeWord(parentNode, start, end);

    //tag last .special-target with id="popover-target", for popover targeting
    const specialtargetarray = document.getElementsByClassName('special-target');
    const lasttarget = specialtargetarray.item(specialtargetarray.length -1);
    lasttarget.id = "popover-target";

    //trim whitespace from word.
    word = word.trim().replace(/(^\W*)|(\W*$)/g, '').trim();
    //check for 1 letter words, and inner whitespace, and ignore
    if (word.length < 2 || word.split(' ').length > 1) {
        //do nothing
        return null;
    }

    return [word, lasttarget];

}

//nifty function to get the word at index pos
//much easier this way
//Taken and modified slightly from:
//http://stackoverflow.com/a/5174867
function getWordAt(str, pos) {

    // Perform type conversions.
    str = String(str);
    pos = Number(pos) >>> 0;

    // Search for the word's beginning and end.
    let left = str.slice(0, pos + 1).search(/\S+$/),
        right = str.slice(pos).search(/\s/);

    // The last word in the string is a special case.
    if (right < 0) {
        return [left, str.length];
    }

    // Return the word, using the located bounds to extract it from the string.
    return [left, right + pos];
}
