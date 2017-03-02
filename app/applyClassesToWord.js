function tagCrossNodeWord(node, startIndex, endIndex) {
    console.log("-----------------------call---");
    let copy = node.cloneNode(true);
    console.log(copy);
    console.log("si:",startIndex);
    console.log("ei:",endIndex);

    console.log("parent claled at top of function:", copy.parentNode);
    console.log("parentElem:", copy.parentElement);
    var si = startIndex;
    var ei = endIndex;

    if (node.nodeType === Node.TEXT_NODE ) {
        console.log("it's a text node!");
        if (node.textContent.length < si) {
            console.log("length less that start intex");
            console.log("--------------------------return");
            return [si - node.textContent.length, ei - node.textContent.length];
        }
        else {
            console.log("length > start index. So we start our selection in here.");
            //reminder: this is a text node

            //cache node text
            let text = node.textContent;
            node.innerHTML = '';
            let spanText = text.slice(si, ei);
            //create target
            let target = document.createElement('span');
            target.className = 'special-target';
            target.style.color = "blue";
            target.innerHTML = spanText;
            console.log("sliced for inside span:\n si: ", target.innerHTML);

            var parent = node.parentNode;
            var nextSib = node.nextSibling;

            console.log("nextSibling", nextSib);//null means we append to end so its ok

            //insert target after our node.
            let insertedSpanNode = parent.insertBefore(target, nextSib);

            //insert any remaining tail
            if (ei < text.length) {
                console.log("parent pre-tail", parent.cloneNode(true));

                let tail = document.createTextNode(text.slice(ei, text.length));
                let insertedTailNode = parent.insertBefore(tail, nextSib);

                console.log("parent post-tail", parent.cloneNode(true));

                /*
                  let tail = document.createElement('span');
                  tail.className = 'tail';
                  tail.innerHTML = text.slice(ei, text.length);
                  let insertedTailNode = parent.insertBefore(tail, nextSib);
                  console.log("### parent", parent.cloneNode(true));
                  //parent.append(text.slice(ei, text.length));*/
            }

            //trim the html of our node to before spanned text.
            console.log("this is what's in our clone node first: ", text);
            //subtract size of target text from si
            node.textContent = text.slice(0, si);
            console.log("this is what's in our node after innerHTML change: ", node.textContent);

            if (ei > node.length) {
                console.log("--------------------------RETURN1");
                return [0, ei - (node.textContent.length + insertedSpanNode.textContent.length)];
            }
            else {
                console.log("--------------------------return");
                return [0,0];
            }
        }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        console.log("it's an element node!");
        var children;
        if (node.hasChildNodes) {
            children = node.childNodes;
        }
        else children = node.children;

        for (let i=0; i<children.length; i++) {
            if (children[i].className == "special-target") {
                console.log("skipping special target", children[i]);
                continue;
            } else {
                console.log("normal target:");
                console.log(children[i]);
            }
            console.log("si: ", si);
            console.log("ei: ",ei);
            let resultTuple = tagCrossNodeWord(children[i], si, ei);
            console.log("onreturn:",resultTuple);
            si = resultTuple[0];
            ei = resultTuple[1];
            if (si <= 0 && ei <= 0)
                break;
        }
        console.log("returning from ", node);
        console.log("with values si:",si);
        console.log("and ei:",ei);
        console.log("--------------------------return");
        return [si, ei];

    } else {
        console.log("it's something else!");
        if (node.firstChild() !== null) {
            //non-text-node
            let children = node.childNodes;

            var l = children.length
            for (let i=0; i<l; i++) {
                console.log("--------------");
                console.log("si: ", si);
                console.log("ei: ",ei);
                let resultTuple = tagCrossNodeWord(children[i], si, ei);
                console.log("onreturn:",resultTuple);
                si = resultTuple[0];
                ei = resultTuple[1];
                if (si <= 0 && ei <= 0)
                    break;
            }
        }
        console.log("--------------------------return");
        return [si, ei];
    }
}



export default function insertTargets(selection, e) {
    console.log(selection);

    //clear previous highlighting and targeting
    $(".special-target").each(function() {
        $(this).replaceWith($(this).text());
    });

    const anchorNode = selection.anchorNode;
    const focusNode = selection.focusNode;

    var word;
    var target;
    //if (anchorNode !== focusNode) {
    if (true) {
        //this is occurs when selection is across different leaves.
        //We will prepare the parameters we need to pass to tagCrossNodeWord
        // i.e. A mutual parent node to anchorNode and focusNode,
        //      And the startIndexes and endIndexes in the parent's textContent
        //      That refer to the word in questions.
        console.log("an != fn");

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
            return[null, null];
        }

        var textAccumulator = '';
        var anchorNodeHit = false;
        var focusNodeHit = false;
        var textAccumulateUntilSplit = '';

        //TODO:
        //The function below is ASYNCHRONOUS
        //this means that occasionally we get nodes appended out of order.
        //This will have to be resolved in an iterative implementation with a queue.

        // *Traverse the list recursively, getting the text nodes in-order.
        //    After reconstructing the text, we will send to tagCrossNodeWord
        // *Simultaneously accumulate textAccumulateUntilSplit until selection end
        //  so we know the index of the word to send to tagCrossNodeWord
        let traverseList = (parentNode, anchorNode, focusNode) => {
            if (parentNode === anchorNode) {
                anchorNodeHit = true;
                if (anchorNode == focusNode) {
                    console.log("in with", parentNode.cloneNode(true));
                    textAccumulateUntilSplit += parentNode.wholeText.slice(
                        0,
                        (selection.anchorOffset + selection.focusOffset)/2
                    );
                    //prevent textAccumulateUntilSplit from continuing
                    focusNodeHit=true;
                }
                else if (focusNodeHit == true) {
                    textAccumulateUntilSplit +=
                        parentNode.wholeText.slice(0, parentNode.anchorOffset);
                }
                else
                    textAccumulateUntilSplit += parentNode.wholeText;
                textAccumulator += parentNode.wholeText;

                return new Array (parentNode);
            }
            else if (parentNode === focusNode) {
                focusNodeHit = true;
                if (anchorNodeHit == true) {
                    //asymmetry is in case focusNode is a text node.
                    var fo = parentNode.focusOffset;
                    console.log("fo:",fo);
                    if (typeof fo == 'undefined') {
                        console.log("XXXXXXXXXXXXXXXX");
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
        const t = getWordAt(textAccumulator, textAccumulateUntilSplit.length-1);
        const start = t[0];
        const end = t[1];
        var word = (textAccumulator).slice(start,end);

        //good for debugging
        console.log("start index: ", start);
        console.log("end index: ", end);
        console.log("word extracted: ",word);

        //recursively insert .special-target spans into word, split across leaves
        tagCrossNodeWord(parentNode, start, end);

        //tag last .special-target with id="popover-target", for popover targeting
        const specialtargetarray = document.getElementsByClassName('special-target');
        const lasttarget = specialtargetarray.item(specialtargetarray.length -1);
        lasttarget.id = "popover-target";

        target = lasttarget;
    } else {
        //selection is across the same leaf node.
        console.log("an == fn");

        const node = selection.anchorNode;
        const text = node.textContent;
        var start = selection.anchorOffset;
        var end = selection.focusOffset;


        word = text.slice(start,end);

        const t = getWordAt(text, (start + end)/ 2);
        console.log(t);
        start = t[0];
        end = t[1];
        word = text.slice(start,end);

        //insert popover target
        let popover_target = document.createElement('span');
        popover_target.id = 'popover-target';
        popover_target.className = 'special-target'
        popover_target.innerHTML = word;
        popover_target.style.color = "blue";

        let parentElem = node.parentElement;
        console.log("parentElem0", parentElem.parentNode.cloneNode(true));
        parentElem.replaceChild( document.createTextNode(text.slice(0, start)), node );
        console.log("parentElem1", parentElem.parentNode.cloneNode(true));
        parentElem.append(popover_target)
        console.log("parentElem2", parentElem.parentNode.cloneNode(true));
        parentElem.append(text.slice(end, text.length));
        console.log("parentElem3", parentElem.parentNode.cloneNode(true));

        target = popover_target;
    }
    //trim whitespace from word.
    word = word.trim().replace(/(^\W*)|(\W*$)/g, '').trim();
    //check for 1 letter words, and inner whitespace, and ignore
    if (word.length < 2 || word.split(' ').length > 1) {
        //do nothing
        return;
    } else e.preventDefault();

    return [word, target];

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
