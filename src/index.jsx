import React from "react";
import RDOM from "react-dom";
import './style.scss';

import Portal from './portal/Portal.jsx';

RDOM.render(<Portal />, document.querySelector("#root"));