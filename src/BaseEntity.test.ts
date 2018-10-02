import BaseEntity from './BaseEntity';
import { attribute } from './Metadata/attribute';

class TestEntity extends BaseEntity {
  @attribute(true, () => 'default')
  private firstName: string;

  @attribute(true)
  private age: number;

  public getFirstName(): string {
    return this.firstName;
  }

  public getAge(): number {
    return this.age;
  }
}

describe('Test BaseEntity Class', async () => {
  let instance: TestEntity;

  instance = new TestEntity({
    firstName: 'Foo',
    age: 28
  });

  test('Set value to attribute correctly firstName', () => {
    expect(instance.getFirstName()).toBe('Foo');
    expect(instance.getAge()).toBe(28);
  });

  test('Change attribute firstName to Hello', () => {
    instance.fill({
      firstName: 'Hello'
    });
    expect(instance.getFirstName()).toBe('Hello');
    expect(instance.getAge()).toBe(28);
  });

  test('Set throw exception in required attribute', () => {
    expect(() => {
      instance.fill(
        {
          firstName: 'Foo'
        },
        true
      );
    }).toThrowError('Attribute age is required');
  });

  test('Set throw exception in required attribute when init', () => {
    expect(() => {
      new TestEntity({
        firstName: 'Foo'
      });
    }).toThrowError('Attribute age is required');
  });

  test('Test Serialize data from entity', () => {
    instance.fill({
      firstName: 'Foo',
      age: 28
    });
    expect(instance.serialize()).toEqual({
      firstName: 'Foo',
      age: 28
    });
    expect(
      instance.serialize({
        firstName: 'first_name',
        age: {
          name: 'age',
          setFn: (value) => String(value)
        }
      })
    ).toEqual({
      first_name: 'Foo',
      age: '28'
    });
  });

  test('Test set default value', () => {
    instance.fill(
      {
        age: 28
      },
      true
    );
    expect(instance.getFirstName()).toBe('default');
  });
});
