const REACT_ELEMENT_TYPE$1 = Symbol['for']('react.element');
const ReactCurrentOwner_1 = {
  current: null
}

const ReactElement = function (type, key, ref, self, source, owner, props) {
  let element = {
    $$typeof: REACT_ELEMENT_TYPE$1,
    type,
    key,
    ref,
    props,
    _owner: owner
  };

  {
    element._store = {};

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    Object.freeze(element.props);
    Object.freeze(element);
  }

  return element;
}

ReactElement.createElement = function (type, config, children) {
  let propName;

  let props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  if (config != null) {
    ref = config.ref;
    key = '' + config.key;
    self = config.self;
    source = config.source;
    for (propName in config) {
      props[propName] = config[propName];
    }
  }
  props.children = children;
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
}

ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  factory.type = type;
  return factory;
}
const reactelement = ReactElement.createElement('div',
  { className: 'app' },
  'hello world'
)
console.log(reactelement)