import 'reflect-metadata';
import { ValueRequiredNotFoundError } from './Exception';

interface Mapping {
  [key: string]: string | {
    name: string;
    setFn(value);
  }
}

export default abstract class BaseEntity {
  private attributeMetaList;

  public constructor(data: object = {}) {
    if (Reflect.hasMetadata('attributeList', this)) {
      this.attributeMetaList = Reflect.getMetadata('attributeList', this);
      this.fill(data, true);
    }
  }

  public fill(data: object, init: boolean = false) {
    for (const attribute of this.attributeMetaList) {
      if (
        attribute.defaultValue &&
        data[attribute.name] === undefined &&
        init
      ) {
        data[attribute.name] = attribute.defaultValue();
      }
      if (data[attribute.name] === undefined && attribute.required && init) {
        throw new ValueRequiredNotFoundError(attribute.name);
      }
      if (data[attribute.name] !== undefined) {
        this.fillValue(attribute.name, data[attribute.name]);
      }
    }
  }

  private fillValue(key: string, value: any) {
    this[key] = value;
  }

  public serialize(mapping: Mapping = {}) {
    const serializeData = {};
    this.attributeMetaList.forEach(attribute => {
      const key = Object.keys(mapping).length
        ? mapping[attribute.name]
        : attribute.name;
      if (typeof key === 'object') {
        serializeData[key.name] = key.setFn(this[attribute.name]);
      } else {
        serializeData[key] = this[attribute.name];
      }
    });
    return serializeData;
  }
}
