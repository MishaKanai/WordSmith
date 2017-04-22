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
    console.log(selection.anchorOffset);
    console.log(selection.focusOffset);
    console.log(selection.anchorNode.cloneNode(true));
    console.log(selection.focusNode.cloneNode(true));

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

    //TODO:
    //convert to iterative implementation.

    let textAccBefore = '';
    let textAccDuring = '';
    let textAccAfter = '';
    let selectionStartHit = false;
    let selectionEndHit = false;

    let traverseList = (parentNode) => {
        const wholeText = parentNode.wholeText;
        if (parentNode === anchorNode && parentNode === focusNode) {
            console.log("here");
            const min = Math.min(selection.anchorOffset, selection.focusOffset);
            const max = Math.max(selection.anchorOffset, selection.focusOffset);
            const before = wholeText.slice(0, min);
            const during = wholeText.slice(min, max);
            const after = wholeText.slice(max);

            textAccBefore += before;
            textAccDuring += during;
            textAccAfter += after;

            selectionStartHit = true;
            selectionEndHit = true;

            return new Array (parentNode);
        } else if (parentNode === anchorNode) {
            if (!selectionStartHit) {
                const before = wholeText.slice(0, selection.anchorOffset);
                const during = wholeText.slice(selection.anchorOffset);

                textAccBefore += before;
                textAccDuring += during;
                selectionStartHit = true;
            } else {
                const during = wholeText.slice(0, selection.anchorOffset);
                const after = wholeText.slice(selection.anchorOffset);
                textAccDuring += during;
                textAccAfter += after;
                selectionEndHit = true;
            }

            return new Array (parentNode);
        } else if (parentNode === focusNode) {

            if (!selectionStartHit) {
                const before = wholeText.slice(0, selection.focusOffset);
                const during = wholeText.slice(selection.focusOffset);

                textAccBefore += before;
                textAccDuring += during;
                selectionStartHit = true;
            } else {
                const during = wholeText.slice(0, selection.focusOffset);
                const after = wholeText.slice(selection.focusOffset);
                textAccDuring += during;
                textAccAfter += after;
                selectionEndHit = true;
            }
            return new Array (parentNode);
        } else if (parentNode.nodeType === Node.TEXT_NODE) {
            if (selectionEndHit) {
                textAccAfter += wholeText;
            } else if (selectionStartHit) {
                textAccDuring += wholeText;
            } else {
                textAccBefore += wholeText;
            }
            return new Array (parentNode);
        } else {
            //traverse list recursively
            const childNodes = parentNode.childNodes;

            var returnList = [];
            for (let i = 0; i < childNodes.length; i++) {
                let currChild = childNodes[i];
                const result = traverseList(currChild, anchorNode, focusNode)
                returnList = returnList.concat(result);
            }
            return returnList;
        }
    }

    // generate list of textNodes while filling text accumulators
    traverseList(parentNode);

    console.log("before:", textAccBefore);
    console.log("during:", textAccDuring);
    console.log("after:", textAccAfter);

    let start = textAccBefore.length;
    let end = (textAccBefore+textAccDuring).length;
    var word = textAccDuring;

    //good for debugging
    console.log("start index: ", start);
    console.log("end index: ", end);
    console.log("word extracted: ",word);

    const wholeAccText = textAccBefore + textAccDuring + textAccAfter;
    //In Firefox, double clicking does NOT select the word.
    //Therefore we must extract the word at the start/end position, when start == end
    if (start == end) {
        let t = getWordAt(wholeAccText, start);
        start = t[0];
        end = t[1];
        word = wholeAccText.slice(start, end)
    }



    //recursively insert .special-target spans into word, split across leaves
    tagCrossNodeWord(parentNode, start, end);

    //tag last .special-target with id="popover-target", for popover targeting
    const specialtargetarray = document.getElementsByClassName('special-target');
    const lasttarget = specialtargetarray.item(specialtargetarray.length -1);
    lasttarget.id = "popover-target";

    //trim whitespace from selected text.
    word = word.trim();

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
