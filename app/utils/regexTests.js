
exports.regexTestISODate = function(input){
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(input)) return false;
    const d = new Date(input);
    return d.toISOString()===input;
}