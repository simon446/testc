import { appendFileSync, writeFileSync } from "fs";

let log_file_key = String(new Date().getTime());

function log(str) {
    console.log(str);
    appendFileSync(`./logs/${log_file_key}.log`, str + '\n');
}

export function print(label, array) {
    log(`\n\n============ ${label} ============`);

    let digit_max_length = array.length > 0 ? Math.log10(array.length - 1) + 1 : 0;

    for (let i = 0; i < array.length; i++) {
        log(`${String(i).padStart(digit_max_length, '0')}: ${array[i]}`);
    }
}

export function set_log_file_key(key) {
    log_file_key = key;
}

export function clear_log_file() {
    writeFileSync(`./logs/${log_file_key}.log`, '');
}