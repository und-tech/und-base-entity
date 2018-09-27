import 'reflect-metadata';

export function Attribute(required: boolean = false, defaultValue: object = null) {
  return (
    target: any,
    propertyKey: string
  ) => {
    let attributeList = [];
    if (Reflect.hasMetadata('attributeList', target)) {
      attributeList = Reflect.getMetadata('attributeList', target);
    }
    attributeList.push({
      name: propertyKey,
      defaultValue: defaultValue,
      required: required
    });
    Reflect.defineMetadata('attributeList', attributeList, target);
  };
}
