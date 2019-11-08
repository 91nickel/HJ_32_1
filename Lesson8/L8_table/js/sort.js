'use strict';

function handleTableClick(event) {
    if (event.target.tagName === 'TH') {
        let element = event.target;
        let dir = element.dataset.dir;

        if (dir === undefined || dir === '-1') {
            dir = 1;
        } else {
            dir = -1;
        }
        element.dataset.dir = dir;
        
        event.currentTarget.dataset.sortBy = element.dataset.propName;
        sortTable(element.dataset.propName, dir);
    }
}