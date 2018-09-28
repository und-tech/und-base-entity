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
    expect(instance.getFirstName()).toBe('Foo');
    expect(instance.getLastName()).toBe('Bar');
  });

  test('Change attribute firstName to Hello', () => {
    instance.fill({
      firstName: 'Hello'
    });
    expect(instance.getFirstName()).toBe('Hello');
    expect(instance.getLastName()).toBe('Bar');
  });

  test('Set throw exception in required attribute when init', () => {
    expect(() => {
      instance.fill(
        {
          firstName: 'Foo'
        },
        true
      );
    }).toThrowError(ValueRequiredNotFoundError);
  });

  test('Set throw exception in required attribute', () => {
    expect(() => {
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
    expect(instance.serialize()).toEqual({
      firstName: 'Foo',
      lastName: 'Bar'
    });
    expect(
      instance.serialize({
        firstName: 'first_name',
        lastName: 'last_name'
      })
    ).toEqual({
      first_name: 'Foo',
      last_name: 'Bar'
    });
  });

  test('Test set default value', () => {
    instance.fill(
      {
        lastName: 'Bar'
      },
      true
    );
    expect(instance.getFirstName()).toBe('default');
  });
});
