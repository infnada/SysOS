// @ts-nocheck

/**
 * Parsers
 */
export function parseVMwareObject(data) {
  // String
  if (typeof data === 'string') {
    return (data === 'true' ? true : data === 'false' ? false : data);
  }

  // Array
  if (Array.isArray(data)) {
    let newObj: any[] = [];
    // Non standard arrays

    // Case 1
    if (data.length === 1 && typeof data[0] === 'string') {
      return this.parseVMwareObject(data[0]);
    }

    // Case 2
    if (data.length === 1 && data[0] === Object(data[0]) && Object.keys(data[0]).length === 2 && data[0].hasOwnProperty('$') && data[0].hasOwnProperty('_')) {
      if (data[0].$.type) {
        return {
          type: data[0].$.type,
          name: this.parseVMwareObject(data[0]._)
        };
      } else {
        return this.parseVMwareObject(data[0]._);
      }
    }

    // Case 3
    if (data.length > 1) {

      const areAllObjectsWithKeyVal = data.every((el) => {
        return el === Object(el) && Object.keys(el).length === 2 && el.hasOwnProperty('name') && el.hasOwnProperty('val');
      });

      if (areAllObjectsWithKeyVal) {
        newObj = {} as any;
        data.forEach((value) => {
          if (newObj.hasOwnProperty(value.name[0])) console.log('should not happen');
          newObj[value.name[0]] = this.parseVMwareObject(value.val);
        });

        return newObj;
      }
    }

    // Parse as normal data array
    data.forEach((value, key) => {
      newObj[key] = this.parseVMwareObject(value);
    });

    return newObj;
  }

  // Object
  if (data === Object(data)) {
    let newObj: any = {};
    // Non standard objects

    // Case 1
    if (Object.keys(data).length === 2 && data.hasOwnProperty('name') && data.hasOwnProperty('val')) {
      if (newObj.hasOwnProperty(data.name[0])) console.log('should not happen 2');
      newObj[data.name[0]] = this.parseVMwareObject(data.val);

      return newObj;
    }

    // Case 2
    if (Object.keys(data).length === 2 && data.hasOwnProperty('$') && data.hasOwnProperty('_')) {
      if (data.$.type) {
        newObj.type = data.$.type;
        newObj.name = data._;
      } else {
        newObj = data._;
      }

      return newObj;
    }

    // Case 5
    if (Object.keys(data).length === 1 && data.hasOwnProperty('$') && Object.keys(data.$).length === 1 && data.$.hasOwnProperty('xsi:type')) {
      newObj.xsi_type = data.$['xsi:type'];

      return newObj;
    }

    // Parse as normal data object
    Object.entries(data).forEach(([key, value]) => {

      // Sub special Case 1
      if (key === '$' && value === Object(value) && Object.keys(value).length === 1 && value.hasOwnProperty('xsi:type')) {
        newObj.xsi_type = value['xsi:type'];
        return;
      }

      newObj[key] = this.parseVMwareObject(value);
    });

    return newObj;
  }

  // Any other data type (boolean, number...)
  return data;

}

export function setDynamicProperties(data: any): any {

  // On second iteration, data can be:
  if (typeof data === 'string' || typeof data === 'boolean' || typeof data === 'number') return data;

  return `${Object.entries(data).map(([key, value]) => {

    if (key.charAt(0) === '$') return;

    // If value is an array we don't want the 'childKey' only the 'childValues'
    if (Array.isArray(value)) {

      return `${value.map(
        (childVal) => `<${key}${Object.entries(childVal).map(([k, v]) => {

          // If has a key that starts with '$' means that is an attribute
          if (k.charAt(0) === '$') return ` ${k.substr(1)}='${v}'`;

        }).join('')}>${this.setDynamicProperties(childVal)}</${key}>`
      ).join('')}`;
    }

    if (typeof value === 'string' || typeof value === 'boolean' || typeof value === 'number') return `<${key}>${value}</${key}>`;

    if (value === Object(value)) {
      return `<${key}${Object.entries(value).map(([k, v]) => {

        // If has a key that starts with '$' means that is an attribute
        if (k.charAt(0) === '$') return ` ${k.substr(1)}='${v}'`;

      }).join('')}>${

        // If has a key that starts with '_' it's a single value
        (Object.keys(value).some((k) => k.charAt(0) === '_') ?
            value[Object.keys(value).find((k) => {
              return k.charAt(0) === '_';
            })] :
            this.setDynamicProperties(value)
        )

      }</${key}>`;
    }

    console.log('err parsing setDynamicProperties');
    return `<${key}>${value}</${key}>`;
  }).join('')}`;

}
