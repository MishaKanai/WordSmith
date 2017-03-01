export default function tagCrossNodeWord(node, startIndex, endIndex) {
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
