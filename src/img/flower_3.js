import React, { Component } from 'react';

export default class SVG extends Component {
   render() {
      return (
         <div className='flower' style={this.props.style}>
            <svg
               width="100%"
               height="100%"
               viewBox='50 50 400 400'>
            <g>
               <path
                  d="m 201.28,108.93131 c -0.0858,19.1194 9.15,36.04569 14.14,53.87169 -12.587,-10.252 -24.52132,-22.4946 -39.85,-28.346 -19.01458,-7.25842 -42.74639,-5.39933 -59.056,7.516 -14.84365,11.75446 -13.95361,35.2243 -3.542,49.442 22.28799,30.43562 48.07572,23.40183 79.04,25.265 -17.438,3.597 -35.7655,6.61863 -51.182,15.732 -18.50564,10.9395 -34.24191,25.37325 -30.5384,51.16745 2.72475,18.97737 23.68794,34.70542 41.5524,33.87955 35.21519,-1.62799 45.27223,-26.78696 64.045,-48.982 -5.572,20.53 -16.2321,41.79462 -10.489,63.457 5.29602,19.97605 20.11839,38.90934 46.187,35.227 23.22573,-3.28076 33.75876,-19.2 36.95561,-35.91888 4.57131,-23.90697 -5.41507,-46.17278 -13.94261,-68.62512 12.62,13.047 25.12507,27.25121 41.396,35.537 18.13834,9.23675 39.00251,11.76071 56.48108,0.72053 16.55343,-10.45582 21.77401,-39.62817 13.22222,-55.51583 -8.20149,-15.23686 -26.36422,-22.13184 -43.0853,-24.4787 -13.00473,-1.82526 -26.181,-2.104 -39.186,-3.841 20.618,-3.126 43.90827,-2.58517 60.82,-16.523 15.78128,-13.00617 24.94354,-32.73355 12.85751,-54.95052 -11.37778,-20.91505 -28.3636,-21.2766 -45.05854,-18.93671 -26.24757,3.67874 -41.01743,20.45512 -57.00797,37.11923 6.44,-18.557 11.46955,-38.63682 10.129,-58.429 C 283.82286,83.458998 274.96553,61.759514 243.71634,62.862286 212.88839,63.950193 201.38322,85.925511 201.28,108.93131 z" />
            </g>

            </svg>
         </div>
      )
   }
}
