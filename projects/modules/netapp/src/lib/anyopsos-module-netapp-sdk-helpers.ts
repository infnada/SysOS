// @ts-nocheck

/**
 * Parsers
 */
export function parseNetAppObject(data, parent?) {

  if (!parent) parent = {};

  Object.entries(data).forEach(([key, value]) => {

    if (Array.isArray(value) && value.length === 1 && value[0] !== Object(value[0])) {
      parent[key] = (value[0] === 'true' ? true : value[0] === 'false' ? false : value[0]);
    } else if (Array.isArray(value) && value.length === 1 && value[0] === Object(value[0])) {
      parent[key] = this.parseNetAppObject(value[0], parent[key]);
    } else if (Array.isArray(value) && value.length > 1 && value[0] === Object(value[0])) {
      parent[key] = value;

      Object.entries(value).forEach(([k, v]) => {
        parent[key][k] = this.parseNetAppObject(v, parent[k]);
      });

    } else {
      parent[key] = value;
    }
  });

  return parent;

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
