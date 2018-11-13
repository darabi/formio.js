import $ from 'jquery';
import _ from 'lodash';

window.jQuery = $;
window.$ = $;
import 'bootstrap/js/dist/modal';
import treeview from './bootstrap-treeview';
import Formio from '../../Formio';
import SelectComponent from '../select/Select';
import TagsComponent from '../tags/Tags';

export default class ResourceTreeComponent extends TagsComponent {
  static schema(...extend) {
    return SelectComponent.schema({
      type: 'resourcetree',
      label: 'Resource tree',
      key: 'resourcetree',
      dataSrc: 'resource',
      resource: '',
      project: '',
      template: '<span>{{ item.data }}</span>'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Resource tree',
      group: 'advanced',
      icon: 'fa fa-sitemap',
      weight: 90,
      documentation: 'http://help.form.io/userguide/#resourcetree',
      schema: ResourceTreeComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.component.dataSrc = 'resource';
    this.component.data = {
      resource: this.component.resource
    };
    this.treeRedrawn = false;
  }

  get defaultSchema() {
    return ResourceTreeComponent.schema();
  }

  getValue() {
    if (this.data[this.component.key]) {
      return this.data[this.component.key];
    }
    return null;
  }

  /**
   * Creates a new button to add a resource instance
   * @returns {HTMLElement} - The "Add Resource" button html element.
   */
  addButton() {
    const addButton = this.ce('button', {
      class: 'btn btn-primary'
    });
    const addIcon = this.ce('i', {
      class: this.iconClass('plus')
    });
    addButton.appendChild(addIcon);
    addButton.appendChild(this.text(` ${this.component.addResourceLabel || 'Add Resource'}`));

    this.addEventListener(addButton, 'click', (event) => {
      event.preventDefault();
    });

    return addButton;
  }

  addInput(input, container) {
    const table = this.ce('table', {
      class: 'table table-bordered'
    });
    const template = `
        <div>
          <tbody>
            <tr>
              <td id="tags">
              </td>
            </tr>
            <tr>
              <div id="tree"></div>
            </tr>
          </tbody>
        </div>`;
    container.appendChild(table);
    table.innerHTML = template;
    super.addInput(input, table.querySelector('#tags'));
    // super.disabled = true;
    var jqinit = $('#tree');
    if (jqinit.treeview === undefined) {
      jqinit.treeview = treeview;
    }
    this.getTree().then((res, err) => {
      if (err) {
        console.warn('Error retrieving the tree nodes {}', err);
      }
      $('#tree').treeview({
        data: res && (!err) ? res : [],
        showCheckbox: true,
        multiSelect: false,
        selectable: false,
        onNodeChecked: (event, data) => {
          this.nodeChecked(data);
        },
        onNodeUnchecked: (event, data) => {
          this.nodeUnchecked(data);
        }
      });
      if (!this.treeRedrawn) {
        this.treeRedrawn = true;
        this.triggerRedraw();
      }
    });
  }

  nodeChecked(node) {
    const newVal = {
      value: node,
      label: _.get(node, this.component.titleAttribute),
      id: _.get(node, this.component.idAttribute)
    };
    super.setValue([...super.getValue(), newVal]);
    this.data[this.component.key] = [...this.data[this.component.key], node];
    this.choices.render();
  }

  nodeUnchecked(node) {
    console.log('Implement nodeUnchecked! {}', node);
  }

  prepareTreeAttributes(response) {
    if (!response || !Array.isArray(response)) {
      return;
    }
    response.map((val) => {
      if (Array.isArray(val)) {
        val.forEach((v) => {
          this.prepareTreeAttributes(v);
        });
      }
      // FIXME: if objects have a 'text' or 'nodes' attribute, they must be backed up here and restored upon selection
      if (val.hasOwnProperty('text')) {
        val._text = val.text;
      }
      if (val.hasOwnProperty('nodes')) {
        val._nodes = val.nodes;
      }
      val.text = _.get(val, this.component.titleAttribute);
      const children = _.get(val, this.component.childrenAttribute);
      if (children) {
        this.prepareTreeAttributes(children);
        val.nodes = children;
      }
    });
  }

  getTree() {
    if (this.component.url && this.component.url.trim() !== '') {
      return Formio.makeStaticRequest(this.component.url, 'GET').then((res, err) => {
        if (!res || err) {
          return [];
        }
        return this.handleTreeResponse(res);
      });
    }
    else {
      const fakeData = {
        id: '000000000000000000000500',
        name: 'Kategorien',
        children: [
          {
            id: '000000000000000000000523',
            name: 'Sport',
            children: [{
              id: '000000000000000000000520',
              name: 'Olympische Spiele'
            }, {
              id: '000000000000000000000524',
              name: 'Leichtathletik'
            }, {
              id: '000000000000000000000525',
              name: 'Ballsport'
            }, {
              id: '000000000000000000000526',
              name: 'Wintersport'
            }, {
              id: '000000000000000000000527',
              name: 'Motorsport'
            }, {
              id: '000000000000000000000528',
              name: 'Wassersport'
            }, {
              id: '000000000000000000000529',
              name: 'Reiten'
            }, {
              id: '000000000000000000000530',
              name: 'Fußball'
            }, {
              id: '000000000000000000000531',
              name: 'Kampfsport'
            }, {
              id: '000000000000000000000532',
              name: 'Radsport'
            }, {
              id: '000000000000000000000533',
              name: 'Turnen'
            }, {
              id: '000000000000000000000534',
              name: 'Fechten'
            }, {
              id: '000000000000000000000535',
              name: 'Extremsport'
            }, {
              id: '000000000000000000000536',
              name: 'Schießen'
            }, {
              id: '000000000000000000000537',
              name: 'Sonstiges'
            }]
          },
          {
            id: '000000000000000000000538',
            name: 'Wirtschaft',
            children: [{
              id: '000000000000000000000539',
              name: 'Unternehmen'
            }, {
              id: '000000000000000000000540',
              name: 'Märkte'
            }, {
              id: '000000000000000000000541',
              name: 'Verbraucher'
            }, {
              id: '000000000000000000000542',
              name: 'Service'
            }, {
              id: '000000000000000000000543',
              name: 'Geld und Finanzen'
            }, {
              id: '000000000000000000000544',
              name: 'Mittelstand'
            }, {
              id: '000000000000000000000545',
              name: 'Industrie'
            }, {
              id: '000000000000000000000546',
              name: 'Mobilität'
            }, {
              id: '000000000000000000000547',
              name: 'Auto'
            }, {
              id: '000000000000000000000548',
              name: 'Gesundheit'
            }, {
              id: '000000000000000000000549',
              name: 'Energie'
            }]
          }, {
            id: '000000000000000000000550',
            name: 'Kultur',
            children: [{
              id: '000000000000000000000551',
              name: 'Musik'
            }, {
              id: '000000000000000000000552',
              name: 'Literatur'
            }, {
              id: '000000000000000000000553',
              name: 'TV'
            }, {
              id: '000000000000000000000554',
              name: 'Kino'
            }, {
              id: '000000000000000000000555',
              name: 'Kunst'
            }, {
              id: '000000000000000000000556',
              name: 'Medien'
            }]
          }, {
            id: '000000000000000000000557',
            name: 'Wissenschaft',
            children: [{
              id: '000000000000000000000558',
              name: 'Gesundheit und Medizin'
            }, {
              id: '000000000000000000000559',
              name: 'Technik'
            }, {
              id: '000000000000000000000560',
              name: 'Umwelt'
            }, {
              id: '000000000000000000000561',
              name: 'Ernährung'
            }, {
              id: '000000000000000000000562',
              name: 'Forschung'
            }, {
              id: '000000000000000000000563',
              name: 'Bildung'
            }, {
              id: '000000000000000000000564',
              name: 'Klima'
            }, {
              id: '000000000000000000000565',
              name: 'Digitales'
            }]
          }, {
            id: '000000000000000000000566',
            name: 'Politik',
            children: [{
              id: '000000000000000000000567',
              name: 'Deutschland'
            }, {
              id: '000000000000000000000568',
              name: 'Europa'
            }, {
              id: '000000000000000000000569',
              name: 'Ausland'
            }]
          }, {
            id: '000000000000000000000570',
            name: 'Lifestyle',
            children: [{
              id: '000000000000000000000571',
              name: 'Reise'
            }, {
              id: '000000000000000000000572',
              name: 'Mode'
            }, {
              id: '000000000000000000000573',
              name: 'Architektur'
            }, {
              id: '000000000000000000000574',
              name: 'Freizeit'
            }, {
              id: '000000000000000000000575',
              name: 'Familie'
            }]
          }
        ]
      };
      return Promise.resolve(this.handleTreeResponse(fakeData));
    }
  }

  handleTreeResponse(res) {
    if (!this.component.showRootNode) {
      const children = _.get(res, this.component.childrenAttribute);
      if (children) {
        res = children;
      }
      else {
        res = [];
      }
    }
    else {
      res = [res];
    }
    this.prepareTreeAttributes(res);
    return res;
  }
}

