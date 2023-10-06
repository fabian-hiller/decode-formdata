# Decode FormData

When the values of your form are encoded to `FormData`, for example to send them to a server via HTTP, some information is lost. Using this library, you can decode `FormData` into a JavaScript object and supplement the information that was lost during encoding.

This library is especially useful in combination with progressively enhanced forms via actions in fullstack frameworks such as Next.js, Nuxt, Remix, SvelteKit, SolidStart, and Qwik. Furthermore, you can validate and type the decoded data afterwards with a schema library like [Valibot](https://valibot.dev/) or [Zod](https://zod.dev/).

## Installation

This library is available for Node, Bun and Deno.

### npm

```bash
npm install decode-formdata   # npm
yarn add decode-formdata      # yarn
pnpm add decode-formdata      # pnpm
bun add decode-formdata       # bun
```

```js
import { decode } from 'decode-formdata';
```

### Deno

```ts
import { decode } from 'https://deno.land/x/decode_formdata/mod.ts';
```

## How it works

`FormData` stores the names of your fields and their values. However, there is a problem. Only strings and files are accepted as values. However, complex forms can contain booleans, strings and dates. This leads to the fact that the boolean value `true` must be mapped with `"true"` and `false` values are simply ignored. Numbers and dates are also converted to strings.

Another problem are objects and arrays, which are usually mapped using dot notation. For example, the input field `<input name="todos.0.lable" />` should map to the object `{ todos: [{ lable: "" }] }`. By telling `decode` where arrays, booleans, dates, files, and numbers are located, the function can decode your `FormData` back into a complex JavaScript object.

Consider the following form:

```html
<form enctype="multipart/form-data" method="post">
  <!-- Array -->
  <input name="array.0" type="text" />
  <input name="array.1" type="text" />
  <input name="array.3" type="text" />

  <!-- Booleans -->
  <input name="boolean.true" type="checkbox" />
  <input name="boolean.false" type="checkbox" />

  <!-- Dates -->
  <input name="date.date" type="date" />
  <input name="date.time" type="date" />

  <!-- Files -->
  <input name="file.image" type="file" />
  <input name="file.audio" type="file" />

  <!-- Numbers -->
  <input name="number.number" type="number" />
  <input name="number.range" type="range" />
</form>
```

When it is is filled out and submitted to the server, the `FormData` object may contain the following entries:

```js
const formEntries = [
  ['array.0', 'Value 1'],
  ['array.1', 'Value 2'],
  ['array.2', 'Value 3'],
  ['boolean.true', 'true'],
  ['date.date', '2023-10-05'],
  ['date.time', '17:15'],
  ['file.image', Blob],
  ['file.audio', Blob],
  ['number.number', '123'],
  ['number.range', '50'],
];
```

Using `decode` of this library you can easily decode this data back to JavaScript:

```js
import { decode } from 'decode-formdata';

async function server(formData: FormData) {
  const formValues = decode(formData, {
    arrays: ['array'],
    booleans: ['boolean.true', 'boolean.false'],
    dates: ['date.date', 'date.time'],
    files: ['file.image', 'file.audio'],
    numbers: ['number.number', 'number.range'],
  });
}
```

> For deeply nested arrays, use the `$` symbol instead of the index when specifying the path to a specifiy data type: `nested.$.array.$.path`

After decoding, `formValues` now contains the following data:

```js
const formValues = {
  array: ['Value 1', 'Value 2', 'Value 3'],
  booleans: { true: true, false: false },
  dates: { date: Date, time: Date },
  files: { image: Blob, audio: Blob },
  numbers: { number: 123, range: 50 },
};
```

## Validation

Now, to validate and type your form's data, you can use a schema library like [Valibot](https://valibot.dev/) or [Zod](https://zod.dev/).

```ts
import { decode } from 'decode-formdata';
import {
  array,
  boolean,
  blob,
  date,
  object,
  number,
  parse,
  string,
} from './src/index.ts';

const FormSchema = object({
  array: array(string()),
  booleans: object({ true: boolean(), false: boolean() }),
  dates: object({ date: date(), time: date() }),
  files: object({ image: blob(), audio: blob() }),
  numbers: object({ number: number(), range: number() }),
});

async function server(formData: FormData) {
  try {
    // Decode form date
    const formValues = decode(formData, {
      arrays: ['array'],
      booleans: ['boolean.true', 'boolean.false'],
      dates: ['date.date', 'date.time'],
      files: ['file.image', 'file.audio'],
      numbers: ['number.number', 'number.range'],
    });

    // Parse form values
    const parsedValues = parse(FormSchema, formValues);

    // Handle errors
  } catch (error) {
    // ...
  }
}
```

## Feedback

Find a bug or have an idea how to improve the library? Please fill out an [issue](https://github.com/fabian-hiller/decode-formdata/issues/new). Together we can make the library even better!

## License

This project is available free of charge and licensed under the [MIT license](https://github.com/fabian-hiller/decode-formdata/blob/main/LICENSE.md).
