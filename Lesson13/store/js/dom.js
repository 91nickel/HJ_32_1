'use strict';

function createElement(node) {
    console.log(node);
    if (typeof node === 'string') {
        const result = document.createElement('span');
        result.innerText = node;
        return result;
    }

    if (typeof node === 'object') {
        const result = document.createElement(node.name);

        if (node.props) {
            for (const i in node.props) {
                try {
                    result.classList.add(node.props[i]);
                } catch (e) {
                    console.log(node.props[i].split(' '));
                    node.props[i].split(' ').forEach(el => {
                        if (el === '') {
                            return;
                        }
                        result.classList.add(el);
                    });;

                    //console.log(e);
                }
            }
        }

        if (node.childs) {
            for (const i in node.childs) {
                result.appendChild(createElement(node.childs[i]));
            }
        }

        console.log(result);
        return result;
    }
}