---
title: "TypeScript 高级类型系统"
date: "2024-03-10"
tags: ["TypeScript", "类型系统", "前端"]
description: "探索 TypeScript 的高级类型特性和实际应用"
author: "余贤俊"
draft: false
---

# TypeScript 高级类型系统

TypeScript 的类型系统是其最强大的特性之一。本文将介绍一些高级类型技巧。

## 泛型（Generics）

泛型让我们能够编写可重用的组件：

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// 使用
const num = identity<number>(42);
const str = identity<string>("hello");
```

## 条件类型

条件类型允许我们根据条件选择类型：

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
```

## 映射类型

映射类型可以基于旧类型创建新类型：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## 实用工具类型

TypeScript 提供了许多内置的工具类型：

### Pick

从类型中选择一组属性：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }
```

### Omit

从类型中排除一组属性：

```typescript
type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string; age: number; }
```

### Record

构造一个对象类型：

```typescript
type Roles = 'admin' | 'user' | 'guest';
type RolePermissions = Record<Roles, string[]>;
```

## 类型守卫

类型守卫帮助我们缩小类型范围：

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: string | number) {
  if (isString(value)) {
    // value 被缩小为 string 类型
    console.log(value.toUpperCase());
  } else {
    // value 被缩小为 number 类型
    console.log(value.toFixed(2));
  }
}
```

## infer 关键字

`infer` 允许我们在条件类型中推断类型：

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Result = ReturnType<() => string>; // string
```

## 模板字面量类型

TypeScript 4.1 引入了模板字面量类型：

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
```

## 总结

TypeScript 的高级类型系统提供了强大的工具来确保代码的类型安全。通过掌握这些高级特性，我们可以：

- 编写更安全的代码
- 提供更好的开发体验
- 减少运行时错误
- 提高代码的可维护性

继续探索和实践这些类型特性，将帮助你成为更优秀的 TypeScript 开发者。