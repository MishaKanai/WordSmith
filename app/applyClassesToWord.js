export default function tagCrossNodeWord(node, startIndex, endIndex) {
    var si = startIndex;
    var ei = endIndex;

    if (node.nodeType === Node.TEXT_NODE ) {
        console.log("it's a text node!");
        if (node.length < si) {
            console.log("length less that start intex");
            return [si - node.textContent.length, ei - node.textContent.length];
        }
        else {
            //reminder: this is a text node

            //create target
            let target = document.createElement('span');
            target.className = 'special-target';
            target.style.color = "blue";
            target.innerHTML = node.textContent.slice(si, ei);

            let nextSib = node.nextSibling;
            let parent = node.parentNode;
            //insert target after our node.
            let insertedSpanNode = parent.insertBefore(target, nextSib);

            //insert any remainder
            if (ei < node.length) {
                let tail = document.createTextNode(node.textContent.slice(ei, node.length));
                let insertedTailNode = parent.insertBefore(tail, nextSib);
            }
            //trim the html of our node to before spanned text.
            node.innerHTML = node.textContent.slice(0, si);

            if (ei > node.length)
                return [0, ei - node.textContent.length];
            else
                return [0,0];
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
                console.log("skipping special target");
                continue;
            }
            console.log("--------------");
            console.log("si: ", si);
            console.log("ei: ",ei);
            let resultTuple = tagCrossNodeWord(children[i], si, ei);
            console.log("onreturn:",resultTuple);
            si = resultTuple[0];
            ei = resultTuple[1];
            if (si === 0 && ei === 0)
                break;
        }
        return [si, ei];

    } else {
        console.log("it's something else!");
        if (node.firstChild() !== null) {
            //non-text-node
            let children = node.childNodes;

            for (let i=0; i<children.length; i++) {
                console.log("--------------");
                console.log("si: ", si);
                console.log("ei: ",ei);
                let resultTuple = tagCrossNodeWord(children[i], si, ei);
                console.log("onreturn:",resultTuple);
                si = resultTuple[0];
                ei = resultTuple[1];
                if (si === 0 && ei === 0)
                    break;
            }
        }
        return [si, ei];
    }
}
