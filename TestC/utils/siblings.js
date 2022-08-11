export function compute_siblings(bitmap) {
    let sets = new Array();

    for (let i = 0; i < bitmap.length; i++) {
        for (let j = i; j < bitmap.length; j++) {
            if (i === j) {
                continue;
            }

            const bitmap1 = bitmap[i];
            const bitmap2 = bitmap[j];

            if (bitmap1 === bitmap2) {
                let found = false;
                
                let k = 0;
                for (; k < sets.length; k++) {
                    if (sets[k].has(i) || sets[k].has(j)) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    sets.push(new Set([i, j]));
                } else if (sets[k].has(i)) {
                    sets[k].add(j);
                } else if (sets[k].has(j)) {
                    sets[k].add(i);
                }
            }
        }
    }

    // Add the missing items to individual sets
    const items = new Set();
    for (let i = 0; i < bitmap.length; i++) {
        items.add(i);
    }
    for (let i = 0; i < sets.length; i++) {
        sets[i].forEach(e => items.delete(e));
    }
    items.forEach(e => sets.push(new Set([e])));

    return sets;
}

export function pick(bitmap, array) {
    const result = [];

    for (let i = 0; i < bitmap.length; i++) {
        if (bitmap[i] === '1') {
            result.push(array[i]);
        }
    }
    
    return result;
}