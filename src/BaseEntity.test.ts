import BaseEntity from './BaseEntity';
import { attribute } from './Metadata/attribute';
import { ValueRequiredNotFoundError } from './Exception';

class TestEntity extends BaseEntity {

  @attribute(true, () => {
    return 'default';
  })
  private firstName: string;

  @attribute(true)
  private lastName: string;

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }
}

describe('Test BaseEntity Class', async () => {
  let instance: TestEntity;

  instance = new TestEntity({
    firstName: 'Foo',
    lastName: 'Bar'
  });

  test('Set value to attribute correctly firstName', () => {
    return expect(instance.getFirstName()).toBe('Foo');
  });

  test('Change attribute firstName to Hello', () => {
    instance.fill({
      firstName: 'Hello'
    });
    return expect(instance.getFirstName()).toBe('Hello');
  });

  test('Set throw exception in required attribute when init', () => {
    return expect(() => {
      instance.fill({
        firstName: 'Foo'
      }, true);
    }).toThrowError(ValueRequiredNotFoundError);
  });

  test('Set throw exception in required attribute', () => {
    return expect(() => {
      new TestEntity({
        firstName: 'Foo'
      });
    }).toThrowError(ValueRequiredNotFoundError);
  });

  test('Test Serialize data from entity', () => {
    instance.fill({
      firstName: 'Foo',
      lastName: 'Bar'
    });
    return expect(instance.serialize()).toEqual({
      firstName: 'Foo',
      lastName: 'Bar'
    });
  });

  test('Test set default value', () => {
    instance.fill({
      lastName: 'Bar'
    }, true);
    return expect(instance.getFirstName()).toBe('default');
  });

});
