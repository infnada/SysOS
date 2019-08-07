/**
 * Generic codec for JavaScript objects that implements a mapping between
 * JavaScript objects and XML nodes that maps each field or element to an
 * attribute or child node, and vice versa.
 *
 * Atomic Values:
 *
 * Consider the following example.
 *
 * (code)
 * var obj = new Object();
 * obj.foo = "Foo";
 * obj.bar = "Bar";
 * (end)
 *
 * This object is encoded into an XML node using the following.
 *
 * (code)
 * var enc = new mxCodec();
 * var node = enc.encode(obj);
 * (end)
 *
 * The output of the encoding may be viewed using <mxLog> as follows.
 *
 * (code)
 * mxLog.show();
 * mxLog.debug(mxUtils.getPrettyXml(node));
 * (end)
 *
 * Finally, the result of the encoding looks as follows.
 *
 * (code)
 * <Object foo="Foo" bar="Bar"/>
 * (end)
 *
 * In the above output, the foo and bar fields have been mapped to attributes
 * with the same names, and the name of the constructor was used for the
 * nodename.
 *
 * Booleans:
 *
 * Since booleans are numbers in JavaScript, all boolean values are encoded
 * into 1 for true and 0 for false. The decoder also accepts the string true
 * and false for boolean values.
 *
 * Objects:
 *
 * The above scheme is applied to all atomic fields, that is, to all non-object
 * fields of an object. For object fields, a child node is created with a
 * special attribute that contains the fieldname. This special attribute is
 * called "as" and hence, as is a reserved word that should not be used for a
 * fieldname.
 *
 * Consider the following example where foo is an object and bar is an atomic
 * property of foo.
 *
 * (code)
 * var obj = {foo: {bar: "Bar"}};
 * (end)
 *
 * This will be mapped to the following XML structure by mxObjectCodec.
 *
 * (code)
 * <Object>
 *   <Object bar="Bar" as="foo"/>
 * </Object>
 * (end)
 *
 * In the above output, the inner Object node contains the as-attribute that
 * specifies the fieldname in the enclosing object. That is, the field foo was
 * mapped to a child node with an as-attribute that has the value foo.
 *
 * Arrays:
 *
 * Arrays are special objects that are either associative, in which case each
 * key, value pair is treated like a field where the key is the fieldname, or
 * they are a sequence of atomic values and objects, which is mapped to a
 * sequence of child nodes. For object elements, the above scheme is applied
 * without the use of the special as-attribute for creating each child. For
 * atomic elements, a special add-node is created with the value stored in the
 * value-attribute.
 *
 * For example, the following array contains one atomic value and one object
 * with a field called bar. Furthermore it contains two associative entries
 * called bar with an atomic value, and foo with an object value.
 *
 * (code)
 * var obj = ["Bar", {bar: "Bar"}];
 * obj["bar"] = "Bar";
 * obj["foo"] = {bar: "Bar"};
 * (end)
 *
 * This array is represented by the following XML nodes.
 *
 * (code)
 * <Array bar="Bar">
 *   <add value="Bar"/>
 *   <Object bar="Bar"/>
 *   <Object bar="Bar" as="foo"/>
 * </Array>
 * (end)
 *
 * The Array node name is the name of the constructor. The additional
 * as-attribute in the last child contains the key of the associative entry,
 * whereas the second last child is part of the array sequence and does not
 * have an as-attribute.
 *
 * References:
 *
 * Objects may be represented as child nodes or attributes with ID values,
 * which are used to lookup the object in a table within <mxCodec>. The
 * <isReference> function is in charge of deciding if a specific field should
 * be encoded as a reference or not. Its default implementation returns true if
 * the fieldname is in <idrefs>, an array of strings that is used to configure
 * the <mxObjectCodec>.
 *
 * Using this approach, the mapping does not guarantee that the referenced
 * object itself exists in the document. The fields that are encoded as
 * references must be carefully chosen to make sure all referenced objects
 * exist in the document, or may be resolved by some other means if necessary.
 *
 * For example, in the case of the graph model all cells are stored in a tree
 * whose root is referenced by the model's root field. A tree is a structure
 * that is well suited for an XML representation, however, the additional edges
 * in the graph model have a reference to a source and target cell, which are
 * also contained in the tree. To handle this case, the source and target cell
 * of an edge are treated as references, whereas the children are treated as
 * objects. Since all cells are contained in the tree and no edge references a
 * source or target outside the tree, this setup makes sure all referenced
 * objects are contained in the document.
 *
 * In the case of a tree structure we must further avoid infinite recursion by
 * ignoring the parent reference of each child. This is done by returning true
 * in <isExcluded>, whose default implementation uses the array of excluded
 * fieldnames passed to the mxObjectCodec constructor.
 *
 * References are only used for cells in mxGraph. For defining other
 * referencable object types, the codec must be able to work out the ID of an
 * object. This is done by implementing <mxCodec.reference>. For decoding a
 * reference, the XML node with the respective id-attribute is fetched from the
 * document, decoded, and stored in a lookup table for later reference. For
 * looking up external objects, <mxCodec.lookup> may be implemented.
 *
 * Expressions:
 *
 * For decoding JavaScript expressions, the add-node may be used with a text
 * content that contains the JavaScript expression. For example, the following
 * creates a field called foo in the enclosing object and assigns it the value
 * of <mxConstants.ALIGN_LEFT>.
 *
 * (code)
 * <Object>
 *   <add as="foo">mxConstants.ALIGN_LEFT</add>
 * </Object>
 * (end)
 *
 * The resulting object has a field called foo with the value "left". Its XML
 * representation looks as follows.
 *
 * (code)
 * <Object foo="left"/>
 * (end)
 *
 * This means the expression is evaluated at decoding time and the result of
 * the evaluation is stored in the respective field. Valid expressions are all
 * JavaScript expressions, including function definitions, which are mapped to
 * functions on the resulting object.
 *
 * Expressions are only evaluated if <allowEval> is true.
 *
 * Constructor: mxObjectCodec
 *
 * Constructs a new codec for the specified template object.
 * The variables in the optional exclude array are ignored by
 * the codec. Variables in the optional idrefs array are
 * turned into references in the XML. The optional mapping
 * may be used to map from variable names to XML attributes.
 * The argument is created as follows:
 *
 * (code)
 * var mapping = new Object();
 * mapping['variableName'] = 'attribute-name';
 * (end)
 *
 * Parameters:
 *
 * template - Prototypical instance of the object to be
 * encoded/decoded.
 * exclude - Optional array of fieldnames to be ignored.
 * idrefs - Optional array of fieldnames to be converted to/from
 * references.
 * mapping - Optional mapping from field- to attributenames.
 */
export interface mxObjectCodec {
  constructor(template: any, exclude: any, idrefs: any, mapping: any);
  /**
   * Returns the name used for the nodenames and lookup of the codec when
   * classes are encoded and nodes are decoded. For classes to work with
   * this the codec registry automatically adds an alias for the classname
   * if that is different than what this returns. The default implementation
   * returns the classname of the template class.
   */
  getName(): any;
  /**
   * Returns a new instance of the template for this codec.
   */
  cloneTemplate(): any;
  /**
   * Returns the fieldname for the given attributename.
   * Looks up the value in the <reverse> mapping or returns
   * the input if there is no reverse mapping for the
   * given name.
   */
  getFieldName(attributename: any): any;
  /**
   * Returns the attributename for the given fieldname.
   * Looks up the value in the <mapping> or returns
   * the input if there is no mapping for the
   * given name.
   */
  getAttributeName(fieldname: any): any;
  /**
   * Returns true if the given attribute is to be ignored by the codec. This
   * implementation returns true if the given fieldname is in <exclude> or
   * if the fieldname equals <mxObjectIdentity.FIELD_NAME>.
   *
   * Parameters:
   *
   * obj - Object instance that contains the field.
   * attr - Fieldname of the field.
   * value - Value of the field.
   * write - Boolean indicating if the field is being encoded or decoded.
   * Write is true if the field is being encoded, else it is being decoded.
   */
  isExcluded(obj: any, attr: any, value: any, write: any): boolean;
  /**
   * Returns true if the given fieldname is to be treated
   * as a textual reference (ID). This implementation returns
   * true if the given fieldname is in <idrefs>.
   *
   * Parameters:
   *
   * obj - Object instance that contains the field.
   * attr - Fieldname of the field.
   * value - Value of the field.
   * write - Boolean indicating if the field is being encoded or decoded.
   * Write is true if the field is being encoded, else it is being decoded.
   */
  isReference(obj: any, attr: any, value: any, write: any): boolean;
  /**
   * Encodes the specified object and returns a node
   * representing then given object. Calls <beforeEncode>
   * after creating the node and <afterEncode> with the
   * resulting node after processing.
   *
   * Enc is a reference to the calling encoder. It is used
   * to encode complex objects and create references.
   *
   * This implementation encodes all variables of an
   * object according to the following rules:
   *
   * - If the variable name is in <exclude> then it is ignored.
   * - If the variable name is in <idrefs> then <mxCodec.getId>
   * is used to replace the object with its ID.
   * - The variable name is mapped using <mapping>.
   * - If obj is an array and the variable name is numeric
   * (ie. an index) then it is not encoded.
   * - If the value is an object, then the codec is used to
   * create a child node with the variable name encoded into
   * the "as" attribute.
   * - Else, if <encodeDefaults> is true or the value differs
   * from the template value, then ...
   * - ... if obj is not an array, then the value is mapped to
   * an attribute.
   * - ... else if obj is an array, the value is mapped to an
   * add child with a value attribute or a text child node,
   * if the value is a function.
   *
   * If no ID exists for a variable in <idrefs> or if an object
   * cannot be encoded, a warning is issued using <mxLog.warn>.
   *
   * Returns the resulting XML node that represents the given
   * object.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * obj - Object to be encoded.
   */
  encode(enc: any, obj: any): any;
  /**
   * Encodes the value of each member in then given obj into the given node using
   * <encodeValue>.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * obj - Object to be encoded.
   * node - XML node that contains the encoded object.
   */
  encodeObject(enc: any, obj: any, node: any): void;
  /**
   * Converts the given value according to the mappings
   * and id-refs in this codec and uses <writeAttribute>
   * to write the attribute into the given node.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * obj - Object whose property is going to be encoded.
   * name - XML node that contains the encoded object.
   * value - Value of the property to be encoded.
   * node - XML node that contains the encoded object.
   */
  encodeValue(enc: any, obj: any, name: any, value: any, node: any): void;
  /**
   * Writes the given value into node using <writePrimitiveAttribute>
   * or <writeComplexAttribute> depending on the type of the value.
   */
  writeAttribute(enc: any, obj: any, name: any, value: any, node: any): void;
  /**
   * Writes the given value as an attribute of the given node.
   */
  writePrimitiveAttribute(enc: any, obj: any, name: any, value: any, node: any): void;
  /**
   * Writes the given value as a child node of the given node.
   */
  writeComplexAttribute(enc: any, obj: any, name: any, value: any, node: any): void;
  /**
   * Converts true to "1" and false to "0" is <isBooleanAttribute> returns true.
   * All other values are not converted.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * obj - Objec to convert the attribute for.
   * name - Name of the attribute to be converted.
   * value - Value to be converted.
   */
  convertAttributeToXml(enc: any, obj: any, name: any, value: any): any;
  /**
   * Returns true if the given object attribute is a boolean value.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * obj - Objec to convert the attribute for.
   * name - Name of the attribute to be converted.
   * value - Value of the attribute to be converted.
   */
  isBooleanAttribute(enc: any, obj: any, name: any, value: any): boolean;
  /**
   * Converts booleans and numeric values to the respective types. Values are
   * numeric if <isNumericAttribute> returns true.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * attr - XML attribute to be converted.
   * obj - Objec to convert the attribute for.
   */
  convertAttributeFromXml(dec: any, attr: any, obj: any): any;
  /**
   * Returns true if the given XML attribute is a numeric value.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * attr - XML attribute to be converted.
   * obj - Objec to convert the attribute for.
   */
  isNumericAttribute(dec: any, attr: any, obj: any): any;
  /**
   * Hook for subclassers to pre-process the object before
   * encoding. This returns the input object. The return
   * value of this function is used in <encode> to perform
   * the default encoding into the given node.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * obj - Object to be encoded.
   * node - XML node to encode the object into.
   */
  beforeEncode(enc: any, obj: any, node: any): any;
  /**
   * Hook for subclassers to post-process the node
   * for the given object after encoding and return the
   * post-processed node. This implementation returns
   * the input node. The return value of this method
   * is returned to the encoder from <encode>.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * obj - Object to be encoded.
   * node - XML node that represents the default encoding.
   */
  afterEncode(enc: any, obj: any, node: any): any;
  /**
   * Parses the given node into the object or returns a new object
   * representing the given node.
   *
   * Dec is a reference to the calling decoder. It is used to decode
   * complex objects and resolve references.
   *
   * If a node has an id attribute then the object cache is checked for the
   * object. If the object is not yet in the cache then it is constructed
   * using the constructor of <template> and cached in <mxCodec.objects>.
   *
   * This implementation decodes all attributes and childs of a node
   * according to the following rules:
   *
   * - If the variable name is in <exclude> or if the attribute name is "id"
   * or "as" then it is ignored.
   * - If the variable name is in <idrefs> then <mxCodec.getObject> is used
   * to replace the reference with an object.
   * - The variable name is mapped using a reverse <mapping>.
   * - If the value has a child node, then the codec is used to create a
   * child object with the variable name taken from the "as" attribute.
   * - If the object is an array and the variable name is empty then the
   * value or child object is appended to the array.
   * - If an add child has no value or the object is not an array then
   * the child text content is evaluated using <mxUtils.eval>.
   *
   * For add nodes where the object is not an array and the variable name
   * is defined, the default mechanism is used, allowing to override/add
   * methods as follows:
   *
   * (code)
   * <Object>
   *   <add as="hello"><![CDATA[
   *     function(arg1) {
   *       mxUtils.alert('Hello '+arg1);
   *     }
   *   ]]></add>
   * </Object>
   * (end)
   *
   * If no object exists for an ID in <idrefs> a warning is issued
   * using <mxLog.warn>.
   *
   * Returns the resulting object that represents the given XML node
   * or the object given to the method as the into parameter.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * node - XML node to be decoded.
   * into - Optional objec to encode the node into.
   */
  decode(dec: any, node: any, into: any): any;
  /**
   * Calls <decodeAttributes> and <decodeChildren> for the given node.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * node - XML node to be decoded.
   * obj - Objec to encode the node into.
   */
  decodeNode(dec: any, node: any, obj: any): void;
  /**
   * Decodes all attributes of the given node using <decodeAttribute>.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * node - XML node to be decoded.
   * obj - Objec to encode the node into.
   */
  decodeAttributes(dec: any, node: any, obj: any): void;
  /**
   * Returns true if the given attribute should be ignored. This implementation
   * returns true if the attribute name is "as" or "id".
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * attr - XML attribute to be decoded.
   * obj - Objec to encode the attribute into.
   */
  isIgnoredAttribute(dec: any, attr: any, obj: any): boolean;
  /**
   * Reads the given attribute into the specified object.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * attr - XML attribute to be decoded.
   * obj - Objec to encode the attribute into.
   */
  decodeAttribute(dec: any, attr: any, obj: any): void;
  /**
   * Decodes all children of the given node using <decodeChild>.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * node - XML node to be decoded.
   * obj - Objec to encode the node into.
   */
  decodeChildren(dec: any, node: any, obj: any): void;
  /**
   * Reads the specified child into the given object.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * child - XML child element to be decoded.
   * obj - Objec to encode the node into.
   */
  decodeChild(dec: any, child: any, obj: any): void;
  /**
   * Returns the template instance for the given field. This returns the
   * value of the field, null if the value is an array or an empty collection
   * if the value is a collection. The value is then used to populate the
   * field for a new instance. For strongly typed languages it may be
   * required to override this to return the correct collection instance
   * based on the encoded child.
   */
  getFieldTemplate(obj: any, fieldname: any, child: any): any;
  /**
   * Sets the decoded child node as a value of the given object. If the
   * object is a map, then the value is added with the given fieldname as a
   * key. If the fieldname is not empty, then setFieldValue is called or
   * else, if the object is a collection, the value is added to the
   * collection. For strongly typed languages it may be required to
   * override this with the correct code to add an entry to an object.
   */
  addObjectValue(obj: any, fieldname: any, value: any, template: any): void;
  /**
   * Returns true if the given node is an include directive and
   * executes the include by decoding the XML document. Returns
   * false if the given node is not an include directive.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the encoding/decoding process.
   * node - XML node to be checked.
   * into - Optional object to pass-thru to the codec.
   */
  processInclude(dec: any, node: any, into: any): boolean;
  /**
   * Hook for subclassers to pre-process the node for
   * the specified object and return the node to be
   * used for further processing by <decode>.
   * The object is created based on the template in the
   * calling method and is never null. This implementation
   * returns the input node. The return value of this
   * function is used in <decode> to perform
   * the default decoding into the given object.
   *
   * Parameters:
   *
   * dec - <mxCodec> that controls the decoding process.
   * node - XML node to be decoded.
   * obj - Object to encode the node into.
   */
  beforeDecode(dec: any, node: any, obj: any): any;
  /**
   * Hook for subclassers to post-process the object after
   * decoding. This implementation returns the given object
   * without any changes. The return value of this method
   * is returned to the decoder from <decode>.
   *
   * Parameters:
   *
   * enc - <mxCodec> that controls the encoding process.
   * node - XML node to be decoded.
   * obj - Object that represents the default decoding.
   */
  afterDecode(dec: any, node: any, obj: any): any;
}
