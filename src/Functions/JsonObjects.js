/**
 * Deep diff between two object, using lodash BY @Yimiprod
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */

import _ from 'lodash'
export const GetDiferenstOfObjects = (object, base) => {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}


export const isObjectEmpty = (object) => {
    for(var key in object) {
        if(object.hasOwnProperty(key))
            return false;
    }
    return true;
}