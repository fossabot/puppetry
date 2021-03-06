import React from "react";
import { Icon } from "antd";
import AbstractComponent from "component/AbstractComponent";

export class Description extends AbstractComponent {
  render() {
    const { schema, target } = this.props;
    if ( !schema ) {
      return null;
    }
    const msg = schema.description.replace( `{target}`, target ),
          match = msg.match( /\[(.+)\]\(((.+))\)/ );
    if ( match ) {
      const [ divider, text, url ] = match,
            [ lhand, rhand ] = msg.split( divider );
      return ( <p><Icon type="exclamation-circle-o" />{ " " }
        { lhand } <a onClick={this.onExtClick} href={ url }>{ text }</a>
        { rhand }</p> );
    }
    return ( <p><Icon type="exclamation-circle-o" /> { msg }</p> );
  }

}
