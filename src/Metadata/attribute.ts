import 'reflect-metadata';

export function attribute(
  required: boolean = false,
  defaultValue: object = null) {
  return (
    target: any,
    propertyKey: string
  ) => {
    let attributeList = [];
    if (Reflect.hasMetadata('attributeList', target)) {
      attributeList = Reflect.getMetadata('attributeList', target);
    }
    attributeList.push({
      defaultValue,
      required,
      name: propertyKey,
    });
    Reflect.defineMetadata('attributeList', attributeList, target);
  };
}
