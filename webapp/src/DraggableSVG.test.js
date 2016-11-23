import React from 'react';
import ReactDOM from 'react-dom';
import DraggableSVG from './DraggableSVG';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <DraggableSVG width={800} height={600} scale={10}>
      <rect x={40} y={30} width={6} height={2}
        style={{fillOpacity: '0.1'}}>
      </rect>
    </DraggableSVG>,
    div
  );
});

it('drag and drop shifts viewBox', () => {
  const div = document.createElement('div');
  return new Promise(
    function (resolve, reject) {
      ReactDOM.render(
        <DraggableSVG width={800} height={600} scale={10}>
          <rect x={40} y={30} width={6} height={2}
            style={{fillOpacity: '0.1'}}>
          </rect>
        </DraggableSVG>,
        div,
        function () {
          this.handleMouseMove({clientX: 30, clientY: 50});
          expect(this.state.dx).toBe(0);
          expect(this.state.dy).toBe(0);
          this.startDrag({clientX: 10, clientY: 20});
          this.handleMouseMove({clientX: 30, clientY: 50});
          expect(this.state.dx).toBe(-2);
          expect(this.state.dy).toBe(-3);
          this.stopDrag();
          expect(this.state.start).toBe(null);
          resolve();
        },
      );
    },
  );
});
