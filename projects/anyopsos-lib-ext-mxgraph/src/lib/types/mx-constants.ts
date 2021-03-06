import {mxRectangle} from './mx-rectangle';

export interface mxConstants {
  DEFAULT_HOTSPOT: number;
  MIN_HOTSPOT_SIZE: number;
  MAX_HOTSPOT_SIZE: number;
  RENDERING_HINT_EXACT: string;
  RENDERING_HINT_FASTER: string;
  RENDERING_HINT_FASTEST: string;
  DIALECT_SVG: string;
  DIALECT_VML: string;
  DIALECT_MIXEDHTML: string;
  DIALECT_PREFERHTML: string;
  DIALECT_STRICTHTML: string;
  NS_SVG: string;
  NS_XHTML: string;
  NS_XLINK: string;
  SHADOWCOLOR: string;
  VML_SHADOWCOLOR: string;
  SHADOW_OFFSET_X: number;
  SHADOW_OFFSET_Y: number;
  SHADOW_OPACITY: number;
  NODETYPE_ELEMENT: number;
  NODETYPE_ATTRIBUTE: number;
  NODETYPE_TEXT: number;
  NODETYPE_CDATA: number;
  NODETYPE_ENTITY_REFERENCE: number;
  NODETYPE_ENTITY: number;
  NODETYPE_PROCESSING_INSTRUCTION: number;
  NODETYPE_COMMENT: number;
  NODETYPE_DOCUMENT: number;
  NODETYPE_DOCUMENTTYPE: number;
  NODETYPE_DOCUMENT_FRAGMENT: number;
  NODETYPE_NOTATION: number;
  TOOLTIP_VERTICAL_OFFSET: number;
  DEFAULT_VALID_COLOR: string;
  DEFAULT_INVALID_COLOR: string;
  OUTLINE_HIGHLIGHT_COLOR: string;
  OUTLINE_HIGHLIGHT_STROKEWIDTH: number;
  HIGHLIGHT_STROKEWIDTH: number;
  HIGHLIGHT_SIZE: number;
  HIGHLIGHT_OPACITY: number;
  CURSOR_MOVABLE_VERTEX: string;
  CURSOR_MOVABLE_EDGE: string;
  CURSOR_LABEL_HANDLE: string;
  CURSOR_TERMINAL_HANDLE: string;
  CURSOR_BEND_HANDLE: string;
  CURSOR_VIRTUAL_BEND_HANDLE: string;
  CURSOR_CONNECT: string;
  HIGHLIGHT_COLOR: string;
  CONNECT_TARGET_COLOR: string;
  INVALID_CONNECT_TARGET_COLOR: string;
  DROP_TARGET_COLOR: string;
  VALID_COLOR: string;
  INVALID_COLOR: string;
  EDGE_SELECTION_COLOR: string;
  VERTEX_SELECTION_COLOR: string;
  VERTEX_SELECTION_STROKEWIDTH: number;
  EDGE_SELECTION_STROKEWIDTH: number;
  VERTEX_SELECTION_DASHED: boolean;
  EDGE_SELECTION_DASHED: boolean;
  GUIDE_COLOR: string;
  GUIDE_STROKEWIDTH: number;
  OUTLINE_COLOR: string;
  OUTLINE_STROKEWIDTH: number;
  HANDLE_SIZE: number;
  LABEL_HANDLE_SIZE: number;
  HANDLE_FILLCOLOR: string;
  HANDLE_STROKECOLOR: string;
  LABEL_HANDLE_FILLCOLOR: string;
  CONNECT_HANDLE_FILLCOLOR: string;
  LOCKED_HANDLE_FILLCOLOR: string;
  OUTLINE_HANDLE_FILLCOLOR: string;
  OUTLINE_HANDLE_STROKECOLOR: string;
  DEFAULT_FONTFAMILY: string;
  DEFAULT_FONTSIZE: number;
  DEFAULT_TEXT_DIRECTION: string;
  LINE_HEIGHT: number;
  WORD_WRAP: string;
  ABSOLUTE_LINE_HEIGHT: boolean;
  DEFAULT_FONTSTYLE: number;
  DEFAULT_STARTSIZE: number;
  DEFAULT_MARKERSIZE: number;
  DEFAULT_IMAGESIZE: number;
  ENTITY_SEGMENT: number;
  RECTANGLE_ROUNDING_FACTOR: number;
  LINE_ARCSIZE: number;
  ARROW_SPACING: number;
  ARROW_WIDTH: number;
  ARROW_SIZE: number;
  PAGE_FORMAT_A4_PORTRAIT: mxRectangle;
  PAGE_FORMAT_A4_LANDSCAPE: mxRectangle;
  PAGE_FORMAT_LETTER_PORTRAIT: mxRectangle;
  PAGE_FORMAT_LETTER_LANDSCAPE: mxRectangle;
  NONE: string;
  STYLE_PERIMETER: string;
  STYLE_SOURCE_PORT: string;
  STYLE_TARGET_PORT: string;
  STYLE_PORT_CONSTRAINT: string;
  STYLE_PORT_CONSTRAINT_ROTATION: string;
  STYLE_SOURCE_PORT_CONSTRAINT: string;
  STYLE_TARGET_PORT_CONSTRAINT: string;
  STYLE_OPACITY: string;
  STYLE_FILL_OPACITY: string;
  STYLE_STROKE_OPACITY: string;
  STYLE_TEXT_OPACITY: string;
  STYLE_TEXT_DIRECTION: string;
  STYLE_OVERFLOW: string;
  STYLE_ORTHOGONAL: string;
  STYLE_EXIT_X: string;
  STYLE_EXIT_Y: string;
  STYLE_EXIT_PERIMETER: string;
  STYLE_ENTRY_X: string;
  STYLE_ENTRY_Y: string;
  STYLE_ENTRY_PERIMETER: string;
  STYLE_WHITE_SPACE: string;
  STYLE_ROTATION: string;
  STYLE_FILLCOLOR: string;
  STYLE_POINTER_EVENTS: string;
  STYLE_SWIMLANE_FILLCOLOR: string;
  STYLE_MARGIN: string;
  STYLE_GRADIENTCOLOR: string;
  STYLE_GRADIENT_DIRECTION: string;
  STYLE_STROKECOLOR: string;
  STYLE_SEPARATORCOLOR: string;
  STYLE_STROKEWIDTH: string;
  STYLE_ALIGN: string;
  STYLE_VERTICAL_ALIGN: string;
  STYLE_LABEL_WIDTH: string;
  STYLE_LABEL_POSITION: string;
  STYLE_VERTICAL_LABEL_POSITION: string;
  STYLE_IMAGE_ASPECT: string;
  STYLE_IMAGE_ALIGN: string;
  STYLE_IMAGE_VERTICAL_ALIGN: string;
  STYLE_GLASS: string;
  STYLE_IMAGE: string;
  STYLE_IMAGE_WIDTH: string;
  STYLE_IMAGE_HEIGHT: string;
  STYLE_IMAGE_BACKGROUND: string;
  STYLE_IMAGE_BORDER: string;
  STYLE_FLIPH: string;
  STYLE_FLIPV: string;
  STYLE_NOLABEL: string;
  STYLE_NOEDGESTYLE: string;
  STYLE_LABEL_BACKGROUNDCOLOR: string;
  STYLE_LABEL_BORDERCOLOR: string;
  STYLE_LABEL_PADDING: string;
  STYLE_INDICATOR_SHAPE: string;
  STYLE_INDICATOR_IMAGE: string;
  STYLE_INDICATOR_COLOR: string;
  STYLE_INDICATOR_STROKECOLOR: string;
  STYLE_INDICATOR_GRADIENTCOLOR: string;
  STYLE_INDICATOR_SPACING: string;
  STYLE_INDICATOR_WIDTH: string;
  STYLE_INDICATOR_HEIGHT: string;
  STYLE_INDICATOR_DIRECTION: string;
  STYLE_SHADOW: string;
  STYLE_SEGMENT: string;
  STYLE_ENDARROW: string;
  STYLE_STARTARROW: string;
  STYLE_ENDSIZE: string;
  STYLE_STARTSIZE: string;
  STYLE_SWIMLANE_LINE: string;
  STYLE_ENDFILL: string;
  STYLE_STARTFILL: string;
  STYLE_DASHED: string;
  STYLE_DASH_PATTERN: string;
  STYLE_FIX_DASH: string;
  STYLE_ROUNDED: string;
  STYLE_CURVED: string;
  STYLE_ARCSIZE: string;
  STYLE_ABSOLUTE_ARCSIZE: string;
  STYLE_SOURCE_PERIMETER_SPACING: string;
  STYLE_TARGET_PERIMETER_SPACING: string;
  STYLE_PERIMETER_SPACING: string;
  STYLE_SPACING: string;
  STYLE_SPACING_TOP: string;
  STYLE_SPACING_LEFT: string;
  STYLE_SPACING_BOTTOM: string;
  STYLE_SPACING_RIGHT: string;
  STYLE_HORIZONTAL: string;
  STYLE_DIRECTION: string;
  STYLE_ELBOW: string;
  STYLE_FONTCOLOR: string;
  STYLE_FONTFAMILY: string;
  STYLE_FONTSIZE: string;
  STYLE_FONTSTYLE: string;
  STYLE_ASPECT: string;
  STYLE_AUTOSIZE: string;
  STYLE_FOLDABLE: string;
  STYLE_EDITABLE: string;
  STYLE_BENDABLE: string;
  STYLE_MOVABLE: string;
  STYLE_RESIZABLE: string;
  STYLE_RESIZE_WIDTH: string;
  STYLE_RESIZE_HEIGHT: string;
  STYLE_ROTATABLE: string;
  STYLE_CLONEABLE: string;
  STYLE_DELETABLE: string;
  STYLE_SHAPE: string;
  STYLE_EDGE: string;
  STYLE_JETTY_SIZE: string;
  STYLE_SOURCE_JETTY_SIZE: string;
  STYLE_TARGET_JETTY_SIZE: string;
  STYLE_LOOP: string;
  STYLE_ORTHOGONAL_LOOP: string;
  STYLE_ROUTING_CENTER_X: string;
  STYLE_ROUTING_CENTER_Y: string;
  FONT_BOLD: number;
  FONT_ITALIC: number;
  FONT_UNDERLINE: number;
  SHAPE_RECTANGLE: string;
  SHAPE_ELLIPSE: string;
  SHAPE_DOUBLE_ELLIPSE: string;
  SHAPE_RHOMBUS: string;
  SHAPE_LINE: string;
  SHAPE_IMAGE: string;
  SHAPE_ARROW: string;
  SHAPE_ARROW_CONNECTOR: string;
  SHAPE_LABEL: string;
  SHAPE_CYLINDER: string;
  SHAPE_SWIMLANE: string;
  SHAPE_CONNECTOR: string;
  SHAPE_ACTOR: string;
  SHAPE_CLOUD: string;
  SHAPE_TRIANGLE: string;
  SHAPE_HEXAGON: string;
  ARROW_CLASSIC: string;
  ARROW_CLASSIC_THIN: string;
  ARROW_BLOCK: string;
  ARROW_BLOCK_THIN: string;
  ARROW_OPEN: string;
  ARROW_OPEN_THIN: string;
  ARROW_OVAL: string;
  ARROW_DIAMOND: string;
  ARROW_DIAMOND_THIN: string;
  ALIGN_LEFT: string;
  ALIGN_CENTER: string;
  ALIGN_RIGHT: string;
  ALIGN_TOP: string;
  ALIGN_MIDDLE: string;
  ALIGN_BOTTOM: string;
  DIRECTION_NORTH: string;
  DIRECTION_SOUTH: string;
  DIRECTION_EAST: string;
  DIRECTION_WEST: string;
  TEXT_DIRECTION_DEFAULT: string;
  TEXT_DIRECTION_AUTO: string;
  TEXT_DIRECTION_LTR: string;
  TEXT_DIRECTION_RTL: string;
  DIRECTION_MASK_NONE: number;
  DIRECTION_MASK_WEST: number;
  DIRECTION_MASK_NORTH: number;
  DIRECTION_MASK_SOUTH: number;
  DIRECTION_MASK_EAST: number;
  DIRECTION_MASK_ALL: number;
  ELBOW_VERTICAL: string;
  ELBOW_HORIZONTAL: string;
  EDGESTYLE_ELBOW: string;
  EDGESTYLE_ENTITY_RELATION: string;
  EDGESTYLE_LOOP: string;
  EDGESTYLE_SIDETOSIDE: string;
  EDGESTYLE_TOPTOBOTTOM: string;
  EDGESTYLE_ORTHOGONAL: string;
  EDGESTYLE_SEGMENT: string;
  PERIMETER_ELLIPSE: string;
  PERIMETER_RECTANGLE: string;
  PERIMETER_RHOMBUS: string;
  PERIMETER_HEXAGON: string;
  PERIMETER_TRIANGLE: string;
}
