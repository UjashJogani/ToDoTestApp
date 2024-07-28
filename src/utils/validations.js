// To check if value is empty or not
export function isEmpty(value) {
    if (value != undefined) {
        if (value == null || value == '' || (value.length != undefined && value.length == 0)) {
            return true;
        }
        else {
            return false;
        }
    }
}
