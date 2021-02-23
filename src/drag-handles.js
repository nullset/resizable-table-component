// import {
//   html,
//   css,
//   BetterBoolean,
//   styleMap,
//   classMap,
//   AhaElement,
// } from '../base';

import { customElement, property, LitElement, html, css } from 'lit-element';
import './table.css';
import reactiveProps from 'reactive-props';

// import '@ungap/custom-elements-builtin';

// const cellWatcher = new MutationRecord(mutations => {
//   debugger;
// });

function BooleanToString(val) {
  return val ? '' : null;
}

const propMap = new Map([
  ['leftHandle', { attr: 'left-handle', converter: Boolean }],
  ['rightHandle', { attr: 'right-handle', converter: Boolean }],
]);
const attrMap = new Map([
  ['left-handle', { prop: 'leftHandle', converter: Boolean }],
  ['right-handle', { prop: 'rightHandle', converter: Boolean }],
  ['units', { prop: 'units', converter: String }],
]);

function convertAttrToProp(node, attr) {}

export class AhaTableDragHandles extends HTMLTableSectionElement {
  static get observedAttributes() {
    return ['left-handle', 'right-handle'];
  }

  constructor() {
    super();

    this.leftHandle = true;
    this.rightHandle = true;
    this.units = '%';

    // this.addEventListener('mousedown', e => {
    //   const cell = e.target.closest('th');
    //   // const mouseDownEvent = new MouseEvent('down');
    //   // const touchStartEvent = new TouchEvent('touchstart');
    //   cell.dispatchEvent(e);
    // });
    // const template = document.createRange().createContextualFragment(`<tr>${}</tr>`)
    // this.cellObserver = cellWatcher.observe(this, {
    //   childList: true,
    //   subtree: true,
    // });
  }

  connectedCallback() {
    this.table = this.closest('table');
    this.createDragHandles();

    const resizeObserver = new ResizeObserver((entries) => {
      this.table.style.setProperty('--table-height', this.table.offsetHeight);
    });
    resizeObserver.observe(this.table);
  }

  convertAttrToProp(attr) {
    this.getAttribute(attr);
  }

  convertPropToAttr(prop) {}

  attributeChangedCallback(name, oldValue, newValue) {
    // if (name === )
  }

  // isChildOfTable(node) {
  //   return node.closest('table') === this.table;
  // }

  maxNumberOfCellsInARow() {
    const rows = this.table.querySelectorAll(':scope > * > tr');
    return Array.from(rows).reduce((acc, row) => {
      if (row === this) return acc;
      const numCells = row.querySelectorAll(':scope > th, :scope > td').length;
      if (acc < numCells) return numCells;
      return acc;
    }, 0);
  }

  createDragHandles() {
    const tr = document.createElement('tr');
    const maxCells = this.maxNumberOfCellsInARow();
    for (let i = 0; i < maxCells; i++) {
      const th = document.createElement('th', { is: 'drag-handle' });
      // if (i === 0) {
      //   const leftHandle = document.createElement('div');
      //   leftHandle.classList.add('aha-table-drag-handles__left');
      //   th.appendChild(leftHandle);
      // }
      // const rightHandle = document.createElement('div');
      // th.appendChild(rightHandle);
      tr.appendChild(th);
    }
    this.appendChild(tr);
  }

  // cells() {
  //   footers() {
  //     return this.table
  //       .getElementsByTagName('tfoot')
  //       .filter(n => this.isChildOfTable(n));
  //   }
  // }

  // headers() {
  //   return this.table
  //     .getElementsByTagName('thead')
  //     .filter(n => isChildOfTable(n) && n !== n.this);
  // }

  // bodies() {}

  // footers() {
  //   return this.table
  //     .getElementsByTagName('tfoot')
  //     .filter(n => this.isChildOfTable(n));
  // }
}

customElements.define('aha-table-drag-handles', AhaTableDragHandles, {
  extends: 'thead',
});

export class DragHandle extends HTMLTableCellElement {
  static get observedAttributes() {
    return ['width'];
  }

  constructor() {
    super();

    this.handle = document.createElement('div');
    this.appendChild(this.handle);

    // const reactiveElem = reactiveProps({ dom: true });
    // const watchedProps = {
    //   width: undefined,
    // };
    // this.table = this.closest('table');
    // this.width = `${(this.offsetWidth / this.table.offsetWidth) * 100}%`;

    // this.style.setProperty('--width', width);

    // this.style.setProperty('--right', this.offsetLeft + this.offsetWidth);
    // debugger;
    // parseFloat(
    //   this.previousElementSibling?.style?.getPropertyValue('--right') || 0,
    // ) + width,

    // reactiveElem(this, watchedProps, () => {
    //   // debugger;
    // });
  }

  connectedCallback() {
    this.table = this.closest('table');
    this.width = `${(this.offsetWidth / this.table.offsetWidth) * 100}%`;

    // this._left = (this.previousElementSibling?._left || 0) + this._width;
    // this.handle.style.left = `${this._left}%`;

    this.addEventListener('mousedown', (downEvent) => {
      if (downEvent.button !== 0) return;

      // this.closest('tr').children.forEach(node => {
      //   node.width = node.offsetWidth;
      // });

      this.table.style.width = `${this.table.offsetWidth}px`;
      // const initialWidth = downEvent.currentTarget.offsetWidth;
      let intialX = downEvent.pageX;
      const moveEvent = (e) => {
        const delta = intialX - e.pageX;
        // console.log(this.width, delta, this.table.offsetWidth);
        const nextElem = this.nextElementSibling;
        const pxWidth = this.offsetWidth;
        nextElem.width = `${pxWidth + delta}px`;
        this.width = `${pxWidth - delta}px`;
      };
      document.addEventListener('mousemove', moveEvent);
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', moveEvent);
        },
        { once: true },
      );
    });
  }
}
customElements.define('drag-handle', DragHandle, {
  extends: 'th',
});
