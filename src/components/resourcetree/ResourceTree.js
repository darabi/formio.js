import $ from 'jquery';
import 'bootstrap/js/dist/modal';
import 'bootstrap-treeview/src/js/bootstrap-treeview';
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
  }

  get defaultSchema() {
    return ResourceTreeComponent.schema();
  }

  /**
   * Creates a new button to add a resource instance
   * @returns {HTMLElement} - The "Add Resource" button html element.
   */
  addButton() {
    const addButton = this.ce('button', {
      class: 'btn btn-primary'
    });
    const addIcon   = this.ce('i', {
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
      const table    = this.ce('table', {
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
      super.disabled = true;
      $('#tree').treeview({
        data: this.getTree(),
        showCheckbox: true,
        multiSelect: true
      });
  }

  getTree() {
    const response = [
      {
        id: '000000000000000000000523',
        name: 'Sport',
        children: [
          {
            id: '000000000000000000000520',
            name: 'Olympische Spiele'
          },
          {
            id: '000000000000000000000524',
            name: 'Leichtathletik'
          },
          {
            id: '000000000000000000000525',
            name: 'Ballsport'
          },
          {
            id: '000000000000000000000526',
            name: 'Wintersport'
          },
          {
            id: '000000000000000000000527',
            name: 'Motorsport'
          },
          {
            id: '000000000000000000000528',
            name: 'Wassersport'
          },
          {
            id: '000000000000000000000529',
            name: 'Reiten'
          },
          {
            id: '000000000000000000000530',
            name: 'Fußball'
          },
          {
            id: '000000000000000000000531',
            name: 'Kampfsport'
          },
          {
            id: '000000000000000000000532',
            name: 'Radsport'
          },
          {
            id: '000000000000000000000533',
            name: 'Turnen'
          },
          {
            id: '000000000000000000000534',
            name: 'Fechten'
          },
          {
            id: '000000000000000000000535',
            name: 'Extremsport'
          },
          {
            id: '000000000000000000000536',
            name: 'Schießen'
          },
          {
            id: '000000000000000000000537',
            name: 'Sonstiges'
          }
        ]
      },
      {
        id: '000000000000000000000538',
        name: 'Wirtschaft',
        children: [
          {
            id: '000000000000000000000539',
            name: 'Unternehmen'
          },
          {
            id: '000000000000000000000540',
            name: 'Märkte'
          },
          {
            id: '000000000000000000000541',
            name: 'Verbraucher'
          },
          {
            id: '000000000000000000000542',
            name: 'Service'
          },
          {
            id: '000000000000000000000543',
            name: 'Geld und Finanzen'
          },
          {
            id: '000000000000000000000544',
            name: 'Mittelstand'
          },
          {
            id: '000000000000000000000545',
            name: 'Industrie'
          },
          {
            id: '000000000000000000000546',
            name: 'Mobilität'
          },
          {
            id: '000000000000000000000547',
            name: 'Auto'
          },
          {
            id: '000000000000000000000548',
            name: 'Gesundheit'
          },
          {
            id: '000000000000000000000549',
            name: 'Energie'
          }
        ]
      },
      {
        id: '000000000000000000000550',
        name: 'Kultur',
        children: [
          {
            id: '000000000000000000000551',
            name: 'Musik'
          },
          {
            id: '000000000000000000000552',
            name: 'Literatur'
          },
          {
            id: '000000000000000000000553',
            name: 'TV'
          },
          {
            id: '000000000000000000000554',
            name: 'Kino'
          },
          {
            id: '000000000000000000000555',
            name: 'Kunst'
          },
          {
            id: '000000000000000000000556',
            name: 'Medien'
          }
        ]
      },
      {
        id: '000000000000000000000557',
        name: 'Wissenschaft',
        children: [
          {
            id: '000000000000000000000558',
            name: 'Gesundheit und Medizin'
          },
          {
            id: '000000000000000000000559',
            name: 'Technik'
          },
          {
            id: '000000000000000000000560',
            name: 'Umwelt'
          },
          {
            id: '000000000000000000000561',
            name: 'Ernährung'
          },
          {
            id: '000000000000000000000562',
            name: 'Forschung'
          },
          {
            id: '000000000000000000000563',
            name: 'Bildung'
          },
          {
            id: '000000000000000000000564',
            name: 'Klima'
          },
          {
            id: '000000000000000000000565',
            name: 'Digitales'
          }
        ]
      },
      {
        id: '000000000000000000000566',
        name: 'Politik',
        children: [
          {
            id: '000000000000000000000567',
            name: 'Deutschland'
          },
          {
            id: '000000000000000000000568',
            name: 'Europa'
          },
          {
            id: '000000000000000000000569',
            name: 'Ausland'
          }
        ]
      },
      {
        id: '000000000000000000000570',
        name: 'Lifestyle',
        children: [
          {
            id: '000000000000000000000571',
            name: 'Reise'
          },
          {
            id: '000000000000000000000572',
            name: 'Mode'
          },
          {
            id: '000000000000000000000573',
            name: 'Architektur'
          },
          {
            id: '000000000000000000000574',
            name: 'Freizeit'
          },
          {
            id: '000000000000000000000575',
            name: 'Familie'
          }
        ]
      }
    ];

    if (!response) {
      return [];
    }

    // TODO: id, name, children must be defined in the component editor/schema
    this.idAttribute = 'id';
    this.titleAttribute = 'name';
    this.childrenAttribute = 'children';
    this.prepareTreeAttributes(response);
    return response;
  }

  prepareTreeAttributes(response) {
    response.map((val) => {
      if (Array.isArray(val)) {
        val.forEach((v) => {
          this.prepareTreeAttributes(v);
        });
      }
      if (val.hasOwnProperty(this.titleAttribute)) {
        val.text = val[this.titleAttribute];
      }
      if (val.hasOwnProperty(this.childrenAttribute)) {
        this.prepareTreeAttributes(val[this.childrenAttribute]);
        val.nodes = val[this.childrenAttribute];
      }
    });
    return [
      {
        text: 'Parent 1',
        nodes: [
          {
            text: 'Child 1',
            nodes: [
              {
                text: 'Grandchild 1'
              },
              {
                text: 'Grandchild 2'
              }
            ]
          },
          {
            text: 'Child 2'
          }
        ]
      },
      {
        text: 'Parent 2'
      },
      {
        text: 'Parent 3'
      },
      {
        text: 'Parent 4'
      },
      {
        text: 'Parent 5'
      }
    ];
  }
}
