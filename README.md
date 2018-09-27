[![Build Status](https://travis-ci.org/und-tech/und-base-entity.svg?branch=master)](https://travis-ci.org/und-tech/und-base-entity)

# Base Entity

This module helps us reduce our code as it avoids the use of setters and getters. It also implements the concept of [introspection](https://en.wikipedia.org/wiki/Type_introspection).

## Installation

```sh
npm install und-base-entity --save
```

or

```sh
yarn add und-base-entity
```

## Usage

```typescript
import { BaseEntity } from "und-base-entity";
import { Attribute } from "und-base-entity";

class TestEntity extends BaseEntity {
  @Attribute(true, () => {
    return "default";
  })
  private firstName: string;

  @Attribute(true)
  private lastName: string;

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }
}
```

## Test

```sh
npm run test
```

or

```sh
yarn test
```

## Lint

```sh
npm run lint
```

or

```sh
yarn lint
```
