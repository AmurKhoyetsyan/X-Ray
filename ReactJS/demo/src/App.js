import React from 'react';
import XRay from 'reactjs-x-ray';
import img1 from './img/1.png';
import img2 from './img/2.png';

function App() {
  return (
    <div style={{maxWidth: '200px', width: '100%'}}>
      <div style={{padding: '100px', width: '100%'}}>
          <XRay
              images={
                  [img1, img2]
              }
              beyond={false}
              diameter={100}
              cursor={true}
              responsive={true}
              type={'circle'}
              backgroundColor={'transparent'}
              resize={[
                  {
                      screen: 1199,
                      diameter: 100
                  },
                  {
                      screen: 991,
                      diameter: 50
                  }
              ]}
          />
      </div>
      <div style={{padding: '100px', width: '100%'}}>
          <XRay
              images={
                  [img1, img2]
              }
              type={'magnifyingGlass'}
              beyond={true}
              diameter={100}
              cursor={true}
              responsive={true}
              backgroundColor={'transparent'}
              resize={[
                  {
                      screen: 1199,
                      diameter: 100
                  },
                  {
                      screen: 991,
                      diameter: 50
                  }
              ]}
          />
      </div>
    </div>
  );
}

export default App;
