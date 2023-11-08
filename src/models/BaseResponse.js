// Example usage:
//
// import { MyShape } from ./myShape.js;
//
// class MyComponent extends React.Component {
//   //
// }
//
// MyComponent.propTypes = {
//   input: MyShape
// };

import PropTypes from "prop-types";

let _BaseResponse;
_BaseResponse = PropTypes.shape({
    "code": PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
    "data": PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.bool, PropTypes.number, PropTypes.number, PropTypes.object, PropTypes.any, PropTypes.string]),
    "message": PropTypes.string,
});

export const BaseResponse = _BaseResponse;