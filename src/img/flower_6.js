import React, { Component } from 'react';

export default class SVG extends Component {
    render() {
        return (
            <div className='flower' style={this.props.style}>
            	<svg width="100%" height="100%" viewBox="-309 -305 600 600" >
				<defs>
				<path id="Cresc" transform="translate(-148,0) rotate(160.611)" d="M-51.3030215 -140.9538931 A150 150 0 1 1 -51.3030215 140.9538931 A140.9538931 140.9538931 0 0 0 -51.3030215 -140.9538931Z"/>
				</defs>
				<g transform="scale(0.99,-0.99)">
				<g transform="rotate(209.5077)">
				<use href='#Cresc' />
				<use transform="rotate(72)" href='#Cresc' />
				<use transform="rotate(144)" href='#Cresc' />
				<use transform="rotate(216)" href='#Cresc' />
				<use transform="rotate(288)" href='#Cresc' />
				</g>
				<path d="M0 108 A108 108 0 1 1 0 -108 A124.707658 124.707658 0 0 0 0 108Z M0 108 A108 108 0 1 0 0 -108 A124.707658 124.707658 0 0 1 0 108Z"/>
				</g>
				</svg>
            </div>
        )
    }
}

